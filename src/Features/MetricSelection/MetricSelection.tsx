import React, { useEffect, useState } from 'react';
import { useQuery } from 'urql';
import { useDispatch, useSelector } from 'react-redux';
import LinearProgress from '@material-ui/core/LinearProgress';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import { IState } from '../../store';
import { actions } from '../DataProvider/reducerMetrics';

const query = `
query {
  getMetrics
}
`;

const getMetrics = (state: IState) => state.metrics;

const useStyles = makeStyles({
  control: {
    minWidth: 300
  }
});

export default () => {
  const classes = useStyles();
  const dispatch = useDispatch();  
  const selectedMetrics = useSelector(getMetrics);
  const [metricsList, setMetricsList] = useState([]);
  const [result] = useQuery({ query });
  const { fetching, data, error } = result;

  const onChange = (e: any): void => {
    dispatch(actions.metricsSelected(e.target.value));
  }

  useEffect(() => {
    if (error) {
      dispatch(actions.metricsApiErrorReceived({ error: error.message }));
      return;
    }
    if (!data) return;
    setMetricsList(data.getMetrics);
  }, [data, error, dispatch]);

  if (fetching) return <LinearProgress />;

  return (
    <FormControl className={classes.control}>
      <InputLabel id="label">Select metrics</InputLabel>
      <Select 
        value={selectedMetrics} 
        onChange={onChange} 
        labelId="label" 
        input={<Input />} 
        id="select" 
        multiple
      >
        {metricsList.map(metric => <MenuItem key={metric} value={metric}>{metric}</MenuItem>)}
      </Select>
    </FormControl>
  );
};
