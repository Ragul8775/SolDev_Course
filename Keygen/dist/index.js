"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const web3_js_1 = require("@solana/web3.js");
require("dotenv/config");
const helpers_1 = require("@solana-developers/helpers");
const keyPair = web3_js_1.Keypair.generate();
console.log("Generate Public Key:", keyPair.publicKey.toBase58());
console.log("Generated Secret", keyPair.secretKey);
const localKeySecret = (0, helpers_1.getKeypairFromEnvironment)("SECRET_KEY");
console.log("Local Secret:", localKeySecret);
