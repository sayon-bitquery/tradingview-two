export const endpoint = 'https://graphql.bitquery.io';    

export const GET_COIN_INFO =`
query ($tokenAddress: String) {
  ethereum(network: bsc) {
    dexTrades(
      options: {desc: ["block.height", "transaction.index"], limit: 1}
      exchangeAddress: {is: "0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73"}
      baseCurrency: {is: $tokenAddress}
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
query ($from: ISO8601DateTime!, $to: ISO8601DateTime!, $interval: Int!, $tokenAddress: String) {
  ethereum(network: bsc) {
    dexTrades(
      options: {asc: "timeInterval.minute"}
      date: {since: $from, till: $to}
      exchangeAddress: {is: "0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73"}
      baseCurrency: {is: $tokenAddress},
      quoteCurrency: {is: "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c"},
      tradeAmountUsd: {gt: 10}
    ) 
    {
      timeInterval {
        minute(count: $interval, format: "%Y-%m-%dT%H:%M:%SZ")  
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