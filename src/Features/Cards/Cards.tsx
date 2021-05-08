import React, { useEffect, useState } from 'react';
import { useSubscription } from 'urql';
import { useSelector, useDispatch } from 'react-redux';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import { actions } from '../DataProvider/reducerMeasurements';
import { IState } from '../../store';

const query = `
  subscription {
    newMeasurement {metric, at, value, unit}
  }
`;

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  title: {
    fontSize: 14,
  },
});

const getMetrics = (state: IState) => state.metrics;

export default () => {
  const metrics = useSelector(getMetrics);
  return (
    <Grid container spacing={3}>
      {metrics.map((metric, index) => (
        <Grid item key={index} xs={12} sm={6} lg={3}>
          <CustomCard metric={metric} />
        </Grid>
      ))}
    </Grid>
  );
};

const CustomCard = ({ metric = '' }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [measurement, setMeasurement] = useState({ value: 0, unit: '' });
  const [response] = useSubscription({ query: query });
  const { data, error } = response;

  useEffect(() => {
    if (error) {
      dispatch(actions.measurementsApiErrorReceived({ error: error.message }));
    }
    if (data && data.newMeasurement.metric === metric) {
      setMeasurement({
        value: data.newMeasurement.value,
        unit: data.newMeasurement.unit,
      });
    }
  }, [data, error, metric, dispatch]);

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} gutterBottom>
          {metric}
        </Typography>
        <Typography variant="h5">
          {measurement.value} {measurement.unit}
        </Typography>
      </CardContent>
    </Card>
  );
};
