import { Connection, LAMPORTS_PER_SOL, PublicKey, clusterApiUrl } from "@solana/web3.js";

const connection = new Connection(clusterApiUrl("devnet"));

const con = async()=>{
    const address = new PublicKey('CenYq6bDRB7p73EjsPEpiYN7uveyPUTdXkDkgUduboaN');
    const balance = await connection.getBalance(address);
    const balanceSol = balance / LAMPORTS_PER_SOL
    console.log(`Balance Of the ${address} is `, balance,"lamports");
    console.log(`Balance Of the ${address} is `, balanceSol,"$SOL");
    console.log("✅ Finished")
}
con();
