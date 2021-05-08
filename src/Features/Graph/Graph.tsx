import React, { useEffect, useState } from 'react';
import { useQuery } from 'urql';
import { useSelector, useDispatch } from 'react-redux';
import { actions } from '../DataProvider/reducerMeasurements';
import { IState } from '../../store';

const query = `
  query($input: [MeasurementQuery]) {
    getMultipleMeasurements(input: $input) {
      metric
      measurements {
        at
        value
        metric
        unit
      }
    }
  }
`;

const getMetrics = (state: IState) => state.metrics;
const halfBefore = () => new Date().getTime() - 30 * 60 * 1000;

export default () => {
  const dispatch = useDispatch();
  const [time, setTime] = useState<number | undefined>(undefined);
  const metrics = useSelector(getMetrics);
  
  const [result] = useQuery({
    query,
    variables: {
      input: metrics.map(metric => ({
        metricName: metric,
        after: time
      }))
    }
  });
  const { fetching, data, error } = result;

  useEffect(() => {
    setTime(halfBefore());
  }, [metrics]);

  useEffect(() => {   
    if (!data) return;
    if (error) {
      dispatch(actions.measurementsApiErrorReceived({ error: error.message }));
      return;
    } else if (fetching) {
      return;
    }
    const { getMultipleMeasurements } = data;
    dispatch(actions.multipleMeasurementsReceived(getMultipleMeasurements));
  }, [fetching, data, error, dispatch]);

  return <div></div>;
};
