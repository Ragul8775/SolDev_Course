import { airdropIfRequired } from "@solana-developers/helpers";
import * as web3 from "@solana/web3.js";
import "dotenv/config";

const secretKeyString = process.env.SECRET_KEY;
if (!secretKeyString) {
    throw new Error("SECRET_KEY environment variable is not set.");
}
const secretKeyArray = JSON.parse(secretKeyString);
const secretKeyUint8Array = Uint8Array.from(secretKeyArray);

const payer = web3.Keypair.fromSecretKey(secretKeyUint8Array);

const connection = new web3.Connection(web3.clusterApiUrl("devnet"));

const newBalance = async () => {
    const balance = await connection.getBalance(payer.publicKey);
    console.log(`Balance before airdrop: ${balance / web3.LAMPORTS_PER_SOL} SOL`);

    await airdropIfRequired(
        connection,
        payer.publicKey,
        1 * web3.LAMPORTS_PER_SOL,
        0.5 * web3.LAMPORTS_PER_SOL
    );

    const newBalance = await connection.getBalance(payer.publicKey);
    console.log(`Balance after airdrop: ${newBalance / web3.LAMPORTS_PER_SOL} SOL`);
};

const PING_PROGRAM_ADDRESS = new web3.PublicKey("ChT1B39WKLS8qUrkLvFDXMhEJ4F1XZzwUNHUt4AU9aVa");
const PING_PROGRAM_ADDRESS_DATA = new web3.PublicKey("Ah9K7dQ8EHaZqcAsgBW8w37yN2eAy3koFmUn4x3CJtod");

const transaction = new web3.Transaction();

const instructions = new web3.TransactionInstruction({
    keys: [
        {
            pubkey: PING_PROGRAM_ADDRESS_DATA,
            isSigner: false,
            isWritable: true,
        },
    ],
    programId: PING_PROGRAM_ADDRESS,
});

transaction.add(instructions);

const sendTransaction = async () => {
    try {
        const sig = await web3.sendAndConfirmTransaction(
            connection,
            transaction,
            [payer]
        );
        console.log(`✅ Transaction completed! Signature is ${sig}`);
    } catch (error) {
        console.error('Transaction failed!', error);
        if (error instanceof web3.SendTransactionError) {
            console.error('Transaction logs:', await error.getLogs(connection));
        }
    }
};

// Execute the asynchronous functions
(async () => {
    await newBalance();
    await sendTransaction();
})();
