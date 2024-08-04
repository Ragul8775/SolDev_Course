import { getKeypairFromEnvironment } from "@solana-developers/helpers";
import { Connection, Keypair, LAMPORTS_PER_SOL, PublicKey, sendAndConfirmRawTransaction, sendAndConfirmTransaction, SystemProgram, Transaction } from "@solana/web3.js";
import "dotenv/config"

const suppliedToPubKey = process.argv[2]||null

if(!suppliedToPubKey){
    console.log("Please provide a public key to send to");
    process.exit(1);
}
const keypair = Keypair.generate();
const senderKeyPair  = keypair.secretKey;
console.log("SECRET KEY",senderKeyPair)
console.log("Public Key",keypair.publicKey.toBase58())

console.log(`suppliedToPubKey: ${suppliedToPubKey}`);

const toPubKey = new PublicKey(suppliedToPubKey);

const connection = new Connection("https://api.devnet.solana.com","confirmed");

console.log(`✅ Loaded our own keypair, the destination publicKey, and Connected to Solana`);

const transaction = new Transaction();

const LAMPORTS_TO_SEND = 5000;
const sendSolInstruction = SystemProgram.transfer({
    fromPubkey:keypair.publicKey,
    toPubkey:toPubKey,
    lamports:LAMPORTS_TO_SEND
})

transaction.add(sendSolInstruction);
async function airDropSol (connection:Connection,keypair:Keypair,lamports:number){
    const sirDrop = await connection.requestAirdrop(keypair.publicKey,lamports);
    await connection.confirmTransaction(sirDrop);
    console.log(`Funded account with ${lamports} lamports`)
}

async function sendTransaction(){
    try {
        await airDropSol(connection,keypair,LAMPORTS_TO_SEND*2);

        const balance = await connection.getBalance(keypair.publicKey);
        console.log(`Account Balance: ${balance/LAMPORTS_PER_SOL}`);

        if(balance < LAMPORTS_TO_SEND){
            throw new Error (`Insufficient FUnds, Account Balance is ${balance}`);
        }

        const signature = await sendAndConfirmTransaction(connection,transaction,[keypair])
        console.log('Finished send',LAMPORTS_TO_SEND,'to the address',toPubKey);
console.log(`Transaction signature is ${signature}!`);
    } catch (error) {
        console.error("Transaction failed:", error);
    }
}

sendTransaction().catch((err)=>{
    console.error(err);
    process.exit(1)
})



