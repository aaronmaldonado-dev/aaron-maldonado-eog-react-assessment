import React from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Cards from '../Features/Cards/Cards';
import Graph from '../Features/Graph/GraphContainer';
import DataProvider from '../Features/DataProvider/DataProvider';
import MetricSelection from '../Features/MetricSelection/MetricSelection';

const useStyles = makeStyles({
  box: {
    marginTop: 20,
  },
  graphContainer: {
    height: 500
  }
});

export default () => {
  const classes = useStyles();
  return (
    <DataProvider>
      <Box className={classes.box}>
        <Container maxWidth={false}>
          <Grid container spacing={3} >
            <Grid item xs={12}>
              <MetricSelection />
            </Grid>
            <Grid item xs={12}>
              <Cards />
            </Grid>
            <Grid className={classes.graphContainer} item xs={12}>
              <Graph />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </DataProvider>
  );
};
