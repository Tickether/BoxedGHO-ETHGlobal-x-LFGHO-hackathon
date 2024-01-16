import axios from 'axios'

export const getTokenUSD = async () => {
    try {
        const options = {
            method: 'GET',
            headers: {'X-API-KEY': process.env.NEXT_PUBLIC_COINGECKO_API}
        };
        const url = `https://api.coingecko.com/api/v3/simple/price?ids=gho&vs_currencies=usd`
        const tokenUSD = await axios.get(url, options)
        console.log(tokenUSD.data)
        const valueInUSD: number = tokenUSD.data['gho'].usd 
        console.log(valueInUSD)
        return valueInUSD
    } catch (error) {
        console.log(error)
    }
    
}