import React, { useEffect, useState } from 'react';
import { useQuery } from 'urql';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import LinearProgress from '@material-ui/core/LinearProgress';
import { IState } from '../../store';
import { actions } from '../DataProvider/reducerMetrics';

const query = `
query {
  getMetrics
}
`;

type metricValue = {
  label: string;
  value: string;
}

const getMetrics = (state: IState) => state.metrics;

export default () => {
  const dispatch = useDispatch();  
  const selectedMetrics = useSelector(getMetrics);
  const [metricsList, setMetricsList] = useState([]);
  const [result] = useQuery({ query });
  const { fetching, data, error } = result;

  const onChange = (e: any): void => {
    dispatch(actions.metricsSelected(e.map((m: metricValue) => m.value)));
  }

  useEffect(() => {
    if (error) {
      dispatch(actions.metricsApiErrorReceived({ error: error.message }));
      return;
    }
    if (!data) return;
    setMetricsList(data.getMetrics.map((item: string) => ({
      value: item,
      label: item,
    })));
  }, [data, error, dispatch]);

  if (fetching) return <LinearProgress />;

  return (
    <Select
      defaultOptions={selectedMetrics}
      options={metricsList}
      onChange={onChange}
      isMulti
    >
    </Select>
  );
};
