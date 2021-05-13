import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { IState } from '../../store';
import { ResponsiveLineCanvas } from '@nivo/line';

const getMeasurements = (state: IState) => state.measurements;
const getMetrics = (state: IState) => state.metrics;

export default () => {
  const measurements = useSelector(getMeasurements);
  const metrics = useSelector(getMetrics);

  const data: any = useMemo(() => {
    let arr: any = [];
    for (const key in measurements) {
      if (Object.prototype.hasOwnProperty.call(measurements, key)) {
        if (metrics.includes(key)) {
          arr.push({
            id: key,
            data: measurements[key].map(item => ({
              x: new Date(item.at),
              y: item.value,
            })),
          });
        }
      }
    }
    return arr;
  }, [measurements, metrics]);

  return (
    <ResponsiveLineCanvas
      data={data}
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
    />
  );
};
