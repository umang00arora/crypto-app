import React, { useEffect, useState } from 'react'
import CoinChart from './CoinChart'
import { useParams } from 'react-router-dom'
import { LinearProgress, useMediaQuery} from '@mui/material';
import parse from 'html-react-parser';
import { numberWithCommas } from './CoinCard';

const CoinPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState();
  const isMobile = useMediaQuery('(max-width: 992px)')

  const fetchCoin = async () => {
    const data = await fetch( `https://api.coingecko.com/api/v3/coins/${id}`)
    const parsedData = await data.json()
    setCoin(parsedData);
  };

  useEffect(() => {
    fetchCoin();
    //eslint-disable-next-line
  }, []);

  if (!coin) return <LinearProgress style={{ backgroundColor: "gold" }} />;

    return (
    <div style={{display: "flex", flexDirection: isMobile?"column":"", alignItems: isMobile?"center":""}}>
      <div style={{width: isMobile?"100%":"30%",display:"flex", flexDirection:"column", alignItems: "center", marginTop: "25px", borderRight: isMobile?"":"2px solid grey"}}>
      <img src={coin?.image.large} alt={coin?.name} height="200" style={{marginBottom: 20}}/>
        <h1 style={{fontWeight: "bolder", marginBottom: 20}}>{coin?.name}</h1>
        <span style={{width: "100%", padding: 25, paddingBottom: 15, paddingTop: 0, textAlign: "justify", fontSize: 18}}>{parse(coin?.description.en.split(". ")[0])}.</span>
        <div style={{alignSelf: "start", padding: 25,paddingTop: 10,width: "100%", display: isMobile?"flex":"", justifyContent: isMobile?"space-around":"", flexDirection: isMobile?"column":"", alignItems: isMobile?"center":""}}>
          <span style={{display: "flex"}}>
            <h3 style={{fontWeight: "bolder"}}>Rank: &nbsp;</h3>
            <h3 style={{fontWeight: "lighter"}}>{numberWithCommas(coin?.market_cap_rank)}</h3>
          </span>
          <span style={{display: "flex"}}>
            <h3 style={{fontWeight: "bolder"}}>Current Price: &nbsp;</h3>
            <h3 style={{fontWeight: "lighter"}}>₹ {numberWithCommas(coin?.market_data.current_price["inr"])}</h3>
          </span>
          <span style={{display: "flex"}}>
            <h3 style={{fontWeight: "bolder"}}>Market Cap: &nbsp;</h3>
            <h3 style={{fontWeight: "lighter"}}>₹ {numberWithCommas(coin?.market_data.market_cap["inr"].toString().slice(0, -6))}</h3>
          </span>
        </div>
      </div>
      <CoinChart coin={coin}/>
    </div>
  )
}

export default CoinPage
