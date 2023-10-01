import React, { useEffect, useState } from 'react'
import { Divider, Input, InputGroup} from 'rsuite';
import CoinCard from './CoinCard';
import Pagination from '@mui/material/Pagination';
import { LinearProgress, useMediaQuery } from '@mui/material';


const Home = () => {
  const [search, setSearch] = useState("")
  const [coins, setCoins] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const isMobile = useMediaQuery('(max-width: 992px)')
  const handleSearch = () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
    );
  };
  useEffect(()=>{
    const fetchData = async () => {
      setLoading(true)
      try {
          const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en`;
          const data = await fetch(url)
          const parsedData = await data.json()
          setCoins(parsedData)
          setLoading(false)
        } catch (error) {
          setLoading(false)
          console.log(error.message)
        }
      }
      fetchData();
      //console.log(coins)
  },[])
  return (
    <>
    <div className='container text-center'>
      <h1 style={{marginTop: '70px'}}>Crypto Application</h1>
      <p>Get info regarding your favourite Crypto Currency.</p>
      <InputGroup style={{marginBottom: "10px"}}>
      <Input placeholder='Search Currency...' style={{width: "70%", height: "40px", fontSize: "large", backgroundColor: "rgb(44, 43, 43)", border: "1px solid white", padding: "15px", borderRadius: "2px", color: "white"}} value={search} onChange={setSearch}>
      </Input>
      </InputGroup>
      <Divider/>
      {loading?(<LinearProgress style={{ backgroundColor: "gold", width: "100%"}} />):
        <div className="coinTable" style={{overflowX: "scroll"}}>
        <table width={isMobile?"800px":"1295px"}   style={{marginTop: "25px"}}>
          <thead style={{backgroundColor: "gold", height: "50px" , fontSize: "large", color: "black"}}> 
          <tr>
            <th>Symbol</th>
            <th>Name</th>
            <th>Current Price</th>
            <th>Change in 24 hours</th>
            <th>Market Cap</th>
          </tr>
          </thead>
          <tbody className='coin-row'>
        {handleSearch().slice((page - 1) * 10, (page - 1) * 10 + 10).map(i=>(
          <CoinCard
          key={i.id}
          id={i.id}
          name={i.name}
          image={i.image}
          price={i.current_price}
          marketcap={i.market_cap}
          change={i.price_change_percentage_24h}
          /> 
        ))}
        </tbody>
        </table>
        </div>
      }
      <Pagination
         count={(handleSearch()?.length / 10).toFixed(0)}
         style={{
           padding: 20,
           width: "100%",
           display: "flex",
           justifyContent: "center",
         }}
         color='primary' 
         onChange={(_, value) => {
           setPage(value);
           window.scrollTo(0, 0);
         }}
       />
    </div>
    </>
  )
}

export default Home
