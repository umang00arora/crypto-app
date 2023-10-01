import { useMediaQuery } from '@mui/material'
import React from 'react'



const SelectButton = ({children, selected, onClick}) => {
    const isMobile = useMediaQuery('(max-width: 992px)')
  return (
    <span onClick={onClick} className='selectbutton' style={{border: "1px solid gold",
    borderRadius: 5,
    padding: 10,
    paddingLeft: isMobile?10:20,
    paddingRight: isMobile?10:20,
    cursor: "pointer",
    backgroundColor: selected ? "gold" : "",
    color: selected ? "black" : "",
    fontWeight: selected ? 700 : 500,
    width: "22%",
    alignContent:'center',
    textAlign:'center'}}>
      {children}
    </span>
  )
}

export default SelectButton
