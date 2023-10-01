import { CircularProgress, useMediaQuery } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2';
import { useParams } from 'react-router-dom'
import SelectButton from './SelectButton';
import { Chart,CategoryScale, LinearScale, PointElement,LineElement } from 'chart.js';

Chart.register(CategoryScale, LinearScale,PointElement,LineElement)
const chartDays = [
  {
    label: "24 Hours",
    value: 1,
  },
  {
    label: "30 Days",
    value: 30,
  },
  {
    label: "3 Months",
    value: 90,
  },
  {
    label: "1 Year",
    value: 365,
  },
];

const CoinChart = ({coin}) => {
  const {id} = useParams()
  const [days, setDays] = useState(1)
  const [historicData, setHistoricData] = useState([])
  const isMobile = useMediaQuery('(max-width: 992px)')
  const fetchHistoricData = async () => {
    const data = await fetch(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=inr&days=${days}`);
    const parsedData = await data.json()
    setHistoricData(parsedData.prices);
  };

  useEffect(() => {
    fetchHistoricData();
    //eslint-disable-next-line
  }, [days]);

    return (
    <div style={{width: isMobile?"100%":"75%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", marginTop: isMobile?0:25, padding: isMobile?20:40}}>
      {!historicData ? (
          <CircularProgress
            style={{ color: "gold" }}
            size={250}
            thickness={1}
          />
        ) : (<>
        <Line
        data={{
          labels: historicData.map((coin) => {
            let date = new Date(coin[0]); //Date at 0th pos
            let time =
                    date.getHours() > 12
                      ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                      : `${date.getHours()}:${date.getMinutes()} AM`;
            return days === 1 ? time : date.toLocaleDateString();
          }),

          datasets: [
            {
              data: historicData.map((coin) => coin[1]),
              label: `Price (Past ${days} days) in INR`,
              borderColor: "#EEBC1D",
            }
          ]
        }}
        options={{
          elements: {
            point: {
              radius: 1,
            },
          },
        }}
        />
        <div
              style={{
                display: "flex",
                marginTop: 20,
                justifyContent: "space-around",
                width: "100%",
              }}
            >
              {chartDays.map((day) => (
                <SelectButton
                  key={day.value}
                  onClick={() => setDays(day.value)}
                  selected={day.value === days}
                >
                  {day.label}
                </SelectButton>
              ))}
            </div>
        </>)}
    </div>
  )
}

export default CoinChart
