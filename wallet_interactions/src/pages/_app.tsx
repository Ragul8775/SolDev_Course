import "@/styles/globals.css";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletModalProvider, WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import * as web3 from "@solana/web3.js"
import type { AppProps } from "next/app";
import { useMemo } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const endpoint = web3.clusterApiUrl("devnet")
  const wallet = useMemo(()=>[],[])

  return(
  <ConnectionProvider endpoint={endpoint}>
 <WalletProvider wallets={wallet}>

<WalletModalProvider>
  <WalletMultiButton/>

    <Component {...pageProps} />;
</WalletModalProvider>
 </WalletProvider>
  </ConnectionProvider>
  )
}
