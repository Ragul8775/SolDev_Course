import Image from "next/image";
import { Inter } from "next/font/google";
import * as web3 from "@solana/web3.js"
import { useMemo } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const endpoint = web3.clusterApiUrl("devnet")
  const wallet = useMemo(()=>[],[])

  return (

   <h1>Hi</h1>
 
  );
}
