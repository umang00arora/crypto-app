import React, { useEffect, useState } from 'react'
import { Divider, Input, InputGroup} from 'rsuite';
import CoinCard from './CoinCard';
import Pagination from '@mui/material/Pagination';

const Home = () => {
  const [search, setSearch] = useState("")
  const [coins, setCoins] = useState([])
  const [page, setPage] = useState(1)
  const handleSearch = () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
    );
  };
  useEffect(()=>{
    const fetchData = async () => {
      try {
          const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en`;
          const data = await fetch(url)
          const parsedData = await data.json()
          setCoins(parsedData)
          
        } catch (error) {
          console.log(error.message)
        }
      }
      fetchData();
      //console.log(coins)
  },[])
  return (
    <>
    <div className='container text-center' >
      <h1 style={{marginTop: '70px'}}>Crypto Application</h1>
      <p>Get info regarding your favourite Crypto Currency.</p>
      <InputGroup style={{marginBottom: "10px"}}>
      <Input placeholder='Search Currency...' style={{width: "70%", height: "40px", fontSize: "large"}} value={search} onChange={setSearch}>
      </Input>
      </InputGroup>
      <Divider/>
      {
        <div style={{overflowX: "scroll"}}>
        <table border="2px solid black" className='coin-row' style={{marginTop: "25px", width: "84.3vw" }}>
          <thead style={{backgroundColor: "gold", height: "50px" , fontSize: "large"}}> 
          <tr>
            <th>Symbol</th>
            <th>Name</th>
            <th>Current Price</th>
            <th>Change in 24 hours</th>
            <th>Market Cap</th>
          </tr>
          </thead>
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
        </table>
        <Pagination
           count={(handleSearch()?.length / 10).toFixed(0)}
           style={{
             padding: 20,
             width: "100%",
             display: "flex",
             justifyContent: "center",
           }}
           onChange={(_, value) => {
             setPage(value);
             window.scrollTo(0, 0);
           }}
         />
        </div>
      }
      <Divider/>

    </div>
    </>
  )
}

export default Home
