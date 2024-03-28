import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';

const Donut = ({ data }) => {
  const [options, setOptions] = useState({
    labels: ['Feels Like', 'Min Temperature', 'Max Temperature', 'Current Temperature']
  });
  const [series, setSeries] = useState([]);
  const [dataAvailable, setDataAvailable] = useState(false);

  useEffect(() => {
    if (data && data.main) {
  
      const { feels_like, temp_min, temp_max, temp } = data.main;
      
      const seriesData = [feels_like, temp_min, temp_max, temp];
      
   
      setSeries(seriesData);
      setDataAvailable(true);
    } else {
      setDataAvailable(false);
    }
  }, [data]);

  return (
    <div className="donut">
      {dataAvailable && (
        <Chart options={options} series={series} type="donut" width="450"  />
      )}
      {!dataAvailable && <p>Data not available</p>}
    </div>
  );
};

export default Donut;
