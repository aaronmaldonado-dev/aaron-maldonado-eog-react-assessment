import React, { useEffect } from 'react';
import { useQuery } from 'urql';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import CardContent from '@material-ui/core/CardContent';
import { actions } from '../DataProvider/reducerMeasurements';
import { IState } from '../../store';
import Graph from './Graph';

const query = `
  query($input: [MeasurementQuery]) {
    getMultipleMeasurements(input: $input) {
      metric
      measurements {
        metric
        value
        unit
        at
      }
    }
  }
`;

const useStyles = makeStyles({
  box: {
    marginTop: 20,
  },
  graphContainer: {
    height: 500,
  },
});

const getMetrics = (state: IState) => state.metrics;

const halfBefore = () => new Date().getTime() - 10 * 60 * 1000;
const time = halfBefore();

export default () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const metrics = useSelector(getMetrics);

  const [result] = useQuery({
    query,
    variables: {
      input: metrics.map(metric => ({
        metricName: metric,
        after: time,
      })),
    },
  });
  const { data } = result;

  useEffect(() => {
    if (!data) return;
    dispatch(actions.multipleMeasurementsReceived(data.getMultipleMeasurements));
  }, [data, dispatch]);

  return (
    <div>
      <Card>
        <CardContent className={classes.graphContainer}>
          <Graph />
        </CardContent>
      </Card>
    </div>
  );
};
