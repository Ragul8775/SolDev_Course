import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react'
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui'
import React, { FC, ReactNode, useMemo } from 'react'
import * as web3 from "@solana/web3.js"
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets'
require('@solana/wallet-adapter-react-ui/styles.css')
const WalletContextProvider:FC<{children:ReactNode}> = ({children}) => {
    const endpoint = web3.clusterApiUrl('devnet')
    const wallets = [new PhantomWalletAdapter()]
  return (
    <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets}>
            <WalletModalProvider>
                {children}
            </WalletModalProvider>
        </WalletProvider>
    </ConnectionProvider>
  )
}

export default WalletContextProvider