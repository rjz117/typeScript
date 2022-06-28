import './Chart.css';
import ChartBar from './ChartBar';

const Chart = (props) => {
  const valuesPoint = props.dataPoints.map(dataPoint => dataPoint.value);
  const maximum = Math.max(...valuesPoint);
  return (
    <div className='chart'>
      {props.dataPoints.map((dataPoint) => (
        <ChartBar
          key={dataPoint.label}
          value={dataPoint.value}
          maxValue={maximum}
          label={dataPoint.label}
        />
      ))}
    </div>
  );
};

export default Chart;