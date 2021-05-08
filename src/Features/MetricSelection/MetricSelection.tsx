import React, { useEffect, useState } from 'react';
import { useQuery } from 'urql';
import { useDispatch } from 'react-redux';
import LinearProgress from '@material-ui/core/LinearProgress';
import { actions } from '../DataProvider/reducerMetrics';

const query = `
query {
  getMetrics
}
`;

export default () => {
  const dispatch = useDispatch();
  const [metrics, setMetrics] = useState([]);
  const [result] = useQuery({ query });
  const { fetching, data, error } = result;

  useEffect(() => {
    if (error) {      
      dispatch(actions.metricsApiErrorReceived({ error: error.message }));
      return;
    }
    if (!data) return;
    setMetrics(data.getMetrics);
  }, [data, error, dispatch]); 

  if (fetching) return <LinearProgress />;

  return (
    <div>
      Metric Selection
    </div>
  );
};