import React from 'react';
import { useSelector } from 'react-redux';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import { IState } from '../../store';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  title: {
    fontSize: 14,
  }
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

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} gutterBottom>
          {metric}
        </Typography>
        <Typography variant="h5">
          Value here
        </Typography>
      </CardContent>
    </Card>
  );
};
