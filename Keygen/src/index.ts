import { Keypair } from "@solana/web3.js";
import "dotenv/config"
import { getKeypairFromEnvironment } from "@solana-developers/helpers";
const keyPair = Keypair.generate();
console.log("Generate Public Key:",keyPair.publicKey.toBase58());
console.log("Generated Secret",keyPair.secretKey);

const localKeySecret = getKeypairFromEnvironment("SECRET_KEY")
console.log("Local Secret:",localKeySecret)

