import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export const HistoricalChart = (id, days = 365, currency = "inr") =>
  `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`;

const CoinDetails = () => {
  const {id} = useParams()
  const [days, setDays] = useState(1)
  const [historicData, setHistoricData] = useState()
  const fetchHistoricData = async () => {
    const { data } = await fetch(HistoricalChart(id, days));
    setHistoricData(data.prices);
  };

  useEffect(() => {
    fetchHistoricData();
    //eslint-disable-next-line
  }, [days]);

    return (
    <div>
     {id}
    </div>
  )
}

export default CoinDetails
