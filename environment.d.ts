declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NEXT_PUBLIC_INFURA_API_KEY: string
            NEXT_PUBLIC_W3M_PROJECT_ID: string
            NEXT_PUBLIC_DECENT_API_KEY: string
            NEXT_PUBLIC_ZERO_DEV_PROJECT_ID: string
            NEXT_PUBLIC_ZERO_DEV_PROJECT_ID_SEPOLIA: string
            NEXT_PUBLIC_PRIVATE_KEY: `0x${string}`
            NEXT_PUBLIC_FLUTTERWAVE_TEST_KEY: string
            NEXT_PUBLIC_COINGECKO_API: string
            MONGO:string
        }
    }
}
  
// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {}