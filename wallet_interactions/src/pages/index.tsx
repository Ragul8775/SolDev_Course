import { Inter } from "next/font/google";
import WalletContextProvider from "@/components/WalletContextProvider";
import AppBar from "@/components/AppBar";
import PingButton from "@/components/PingButton";
import { BalanceDisplay } from "@/components/DisplayBalance";

import Head from 'next/head';
import SendSol from "@/components/SendSol";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {


  return (
<div>
<Head>
      <title>Wallet-adapter Example</title>
      <meta name="description" content="wallet-adapter" />
    </Head>
    
  <WalletContextProvider>
      <AppBar/>
    <div className="h-full flex flex-col items-center justify-start pt-[50px]">
      <BalanceDisplay/>
      
      <SendSol/>
    </div>
  </WalletContextProvider>
</div>
 
  );
}
