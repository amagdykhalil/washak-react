import React from 'react'

export default function PriceCurrency({cn , price , currency}) {
  return (
	<div className={` flex items-center !text-nowrap ${cn} `} > {price} {currency} </div>
  )
}
