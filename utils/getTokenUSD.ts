import axios from 'axios'

export const getTokenUSD = async ( newtwork: string, address: string ) => {
    try {
        const options = {
            method: 'GET',
            headers: {'X-API-KEY': process.env.NEXT_PUBLIC_COINGECKO_API}
        };
        const url = `https://api.coingecko.com/api/v3/simple/token_price/${newtwork}?contract_addresses=${address.toLowerCase()}&vs_currencies=usd`
        const tokenUSD = await axios.get(url, options)
        console.log(tokenUSD.data)
        const valueInUSD: number = tokenUSD.data[address.toLowerCase()].usd 
        console.log(valueInUSD)
        return valueInUSD
    } catch (error) {
        console.log(error)
    }
    
}