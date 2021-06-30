export const endpoint = 'https://graphql.bitquery.io';    

export const GET_COIN_INFO =`
{
  ethereum(network: bsc) {
    dexTrades(
      options: {desc: ["block.height", "transaction.index"], limit: 1}
      exchangeAddress: {is: "0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73"}
      baseCurrency: {is: "0x2170ed0880ac9a755fd29b2688956bd959f933f8"}
      quoteCurrency: {is: "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c"}
    ) 
    {
      block {
        height
        timestamp {
          time(format: "%Y-%m-%d %H:%M:%S") 
        }
      }
      transaction {
        index
      }
      baseCurrency {
        name
        symbol
        decimals
      }
      quotePrice
    }
  }
}
`; 

export const GET_COIN_BARS = `
{
  ethereum(network: bsc) {
    dexTrades(
      options: {asc: "timeInterval.minute"}
      date: {since: "2021-06-20T07:23:21.000Z", till: "2021-06-23T15:23:21.000Z"}
      exchangeAddress: {is: "0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73"}
      baseCurrency: {is: "0x2170ed0880ac9a755fd29b2688956bd959f933f8"},
      quoteCurrency: {is: "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c"},
      tradeAmountUsd: {gt: 10}
    ) 
    {
      timeInterval {
        minute(count: 15, format: "%Y-%m-%dT%H:%M:%SZ")  
      }
      volume: quoteAmount
      high: quotePrice(calculate: maximum)
      low: quotePrice(calculate: minimum)
      open: minimum(of: block, get: quote_price)
      close: maximum(of: block, get: quote_price) 
    }
  }
}
`; 