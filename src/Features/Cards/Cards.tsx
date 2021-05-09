import React, { useEffect, useState } from 'react';
import { useSubscription } from 'urql';
import { useSelector, useDispatch } from 'react-redux';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import { actions, Measurement } from '../DataProvider/reducerMeasurements';
import { actions as graphActions } from '../DataProvider/reducerGraph';
import { IState } from '../../store';

type Props = {
  metric: string;
  measurement: Measurement;
};

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
const getLoading = (state: IState) => state.loading;

export default () => {
  const dispatch = useDispatch();
  const loading = useSelector(getLoading);
  const metrics = useSelector(getMetrics);
  const [response] = useSubscription({ query: query });
  const { data, error } = response;

  useEffect(() => {
    if (error) {
      dispatch(actions.measurementsApiErrorReceived({ error: error.message }));
    }
    if (data && data.newMeasurement && !loading) {
      // dispatch(actions.singleMeasurementReceived(data.newMeasurement));
      const index = metrics.findIndex(item => item === data.newMeasurement.metric);
      if (index > -1) {
        dispatch(graphActions.askForPushPoint({
          index,
          point: {
            x: new Date(data.newMeasurement.at),
            y: data.newMeasurement.value
          }
        }));
      }
    }    
  }, [data, metrics, loading, error, dispatch]);

  
  return (
    <Grid container spacing={3}>
      {metrics.map((metric, index) => (
        <Grid item key={index} xs={12} sm={6} lg={3}>
          <CustomCard metric={metric} measurement={data.newMeasurement} />
        </Grid>
      ))}
    </Grid>
  );
};

const CustomCard = ({ metric = '', measurement }: Props) => {
  const [data, setData] = useState({ value: 0, unit: '' });
  const classes = useStyles();
  
  useEffect(() => {
    if (measurement && measurement.metric === metric) {
      setData({
        value: measurement.value,
        unit: measurement.unit,
      });
    }
  }, [measurement, metric])

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} gutterBottom>
          {metric}
        </Typography>
        <Typography variant="h5">
          {data.value} {data.unit}
        </Typography>
      </CardContent>
    </Card>
  );
};

// const CustomCard = ({ metric = '' }) => {
//   const classes = useStyles();
//   const dispatch = useDispatch();
//   const measurements = useSelector(getMeasurements);
//   const loading = useSelector(getLoading);
//   const [measurement, setMeasurement] = useState({ value: 0, unit: '' });

//   useEffect(() => {
//     if (error) {
//       dispatch(actions.measurementsApiErrorReceived({ error: error.message }));
//     }
//     if (data && data.newMeasurement.metric === metric) {
//       setMeasurement({
//         value: data.newMeasurement.value,
//         unit: data.newMeasurement.unit,
//       });
//     }
//     if (data && data.newMeasurement && !loading) {
//       console.log(metrics);

//       dispatch(actions.singleMeasurementReceived(data.newMeasurement));
//     }
//   }, [data, error, metric, loading, dispatch]);

//   return (
//     <Card className={classes.root}>
//       <CardContent>
//         <Typography className={classes.title} gutterBottom>
//           {metric}
//         </Typography>
//         <Typography variant="h5">
//           {measurement.value} {measurement.unit}
//         </Typography>
//       </CardContent>
//     </Card>
//   );
// };
