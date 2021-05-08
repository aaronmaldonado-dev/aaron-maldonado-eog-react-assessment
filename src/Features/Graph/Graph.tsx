import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import { ResponsiveLine } from '@nivo/line';
import Card from '@material-ui/core/Card';
import { useQuery } from 'urql';
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

const useStyles = makeStyles({
  box: {
    marginTop: 20,
  },
  graphContainer: {
    height: 500,
  },
});

const getMetrics = (state: IState) => state.metrics;
const getGraphData = (state: IState) => state.graph;
const halfBefore = () => new Date().getTime() - 30 * 60 * 1000;

export default () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [time, setTime] = useState<number | undefined>(undefined);
  const metrics = useSelector(getMetrics);
  const graphData = useSelector(getGraphData);

  const [result] = useQuery({
    query,
    variables: {
      input: metrics.map(metric => ({
        metricName: metric,
        after: time,
      })),
    },
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

  return (
    <div>
      {graphData.length > 0 && (
        <Card>
          <CardContent className={classes.graphContainer}>
            <ResponsiveLine
              data={graphData}
              margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
              xScale={{ type: 'time', format: 'native' }}
              yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
              yFormat=" >-.2f"
              axisTop={null}
              axisRight={null}
              axisBottom={{
                format: '%H:%M',
                tickValues: 'every 15 minutes',
                legendPosition: 'middle',
                legendOffset: 46,
              }}
              axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Values',
                legendOffset: -40,
                legendPosition: 'middle',
              }}
              enableGridY={false}
              enablePoints={false}
              pointSize={10}
              enableSlices="x"
              pointColor={{ theme: 'background' }}
              pointBorderWidth={2}
              pointBorderColor={{ from: 'serieColor' }}
              pointLabelYOffset={-12}
              useMesh={false}
              legends={[
                {
                  anchor: 'bottom-right',
                  direction: 'column',
                  justify: false,
                  translateX: 100,
                  translateY: 0,
                  itemsSpacing: 0,
                  itemDirection: 'left-to-right',
                  itemWidth: 80,
                  itemHeight: 20,
                  itemOpacity: 0.75,
                  symbolSize: 12,
                  symbolShape: 'circle',
                  symbolBorderColor: 'rgba(0, 0, 0, .5)',
                  effects: [
                    {
                      on: 'hover',
                      style: {
                        itemBackground: 'rgba(0, 0, 0, .03)',
                        itemOpacity: 1,
                      },
                    },
                  ],
                },
              ]}
              sliceTooltip={({ slice }) => {                
                return (
                  <div
                    style={{
                      border: '1px solid #ccc',
                      background: 'white',
                      padding: '9px 12px',
                    }}
                  >
                    <div>{slice.points[0].data.xFormatted}</div>
                    {slice.points.map(point => (
                      <div
                        key={point.id}
                        style={{
                          color: point.serieColor,
                          padding: '3px 0',
                        }}
                      >
                        <strong>{point.serieId}</strong> [{point.data.yFormatted}]
                      </div>
                    ))}
                  </div>
                );
              }}
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
};
