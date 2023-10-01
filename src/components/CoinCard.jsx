import React from 'react'
import {useNavigate} from 'react-router-dom'

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const CoinCard = ({image, name, price, change, marketcap, id}) => {

  const profit = change > 0;
  const history = useNavigate()
  return (
    <>
    <tr style={{height: "70px" , fontSize: "large", borderBottom: "2px solid grey"}} onClick={()=>history(`/coins/${id}`)}>
      <td>
      <img src={image} alt="" height={40} width={40}/>
      </td>
      <td>
      {name}
      </td>
      <td>
      ₹ {numberWithCommas(price.toFixed(2))}

      </td>
      <td>
      <span style={{color: profit > 0 ? "rgb(14, 203, 129)" : "red", fontWeight: 500,}}>{profit && "+"}{change.toFixed(2)} %</span>
      </td>
      <td>
      ₹ {numberWithCommas(marketcap.toString().slice(0, -6))} M
      </td>
    </tr>
    </>
  )
}

export default CoinCard
