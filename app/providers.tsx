'use client'

import { supportedSocialConnectors } from '@zerodev/wagmi/connectkit'
import { supportedConnectors, getDefaultConfig, ConnectKitProvider } from 'connectkit'
supportedConnectors.push(...supportedSocialConnectors)
import { 
    GoogleSocialWalletConnector, 
    FacebookSocialWalletConnector, 
    GithubSocialWalletConnector,
    DiscordSocialWalletConnector,
    TwitchSocialWalletConnector,
    TwitterSocialWalletConnector,
} from '@zerodev/wagmi'
import { sepolia, mainnet } from 'wagmi/chains'
import { infuraProvider } from 'wagmi/providers/infura'
import { WagmiConfig, configureChains, createConfig } from 'wagmi'
import { ReactNode, useEffect, useState } from 'react'


export const { chains, publicClient, webSocketPublicClient } = configureChains(
    [mainnet, sepolia],
    [infuraProvider({ apiKey: process.env.NEXT_PUBLIC_INFURA_API_KEY })],
)


export default function Providers({ children }: { children: ReactNode }) {

    const [config] = useState(()=>{
        if (typeof window !== 'undefined') {
            const options = { chains, options: { projectIds:[ process.env.NEXT_PUBLIC_ZERO_DEV_PROJECT_ID, process.env.NEXT_PUBLIC_ZERO_DEV_PROJECT_ID_SEPOLIA], shimDisconnect: true } }
            return (
                createConfig(
                    getDefaultConfig({
                        // Required API Keys
                        infuraId: process.env.NEXT_PUBLIC_INFURA_API_KEY, // or infuraId
                        walletConnectProjectId: process.env.NEXT_PUBLIC_W3M_PROJECT_ID,
                    
                        // Required
                        appName: 'BoxedGHO',

                        // Optional
                        appDescription: 'Box GHO to any recipient chain/token',
                        appUrl: '', // your app's url
                        appIcon: '', // your app's icon, no bigger than 1024x1024px (max. 1MB)

                        autoConnect: true,
                        
                        connectors: [
                            new GoogleSocialWalletConnector(options),
                            new FacebookSocialWalletConnector(options),
                            new GithubSocialWalletConnector(options),
                            new DiscordSocialWalletConnector(options),
                            new TwitchSocialWalletConnector(options),
                            new TwitterSocialWalletConnector(options),
                        ],
                        publicClient,
                        webSocketPublicClient,
                    })
                )
            )
        }
    })
    

    const [mounted, setMounted] = useState(false)
    useEffect(() => setMounted(true), [])
    if (typeof window === 'undefined') return null

    return (
        <>
            <WagmiConfig config={config!}>
                <ConnectKitProvider theme="midnight">
                    {mounted && children}
                </ConnectKitProvider>
            </WagmiConfig>
        </>
    )
}