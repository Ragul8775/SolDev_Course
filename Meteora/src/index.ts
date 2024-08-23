import AmmImpl, { MAINNET_POOL } from '@mercurial-finance/dynamic-amm-sdk';
import { LIQUIDITY_STATE_LAYOUT_V4 } from '@raydium-io/raydium-sdk';
import { Connection, PublicKey } from '@solana/web3.js';

const connection = new Connection('https://mainnet.helius-rpc.com/?api-key=8e4f5e6e-24e3-4b85-ab12-9ccf973f00d7');

const token: string = "3dCCbYca3jSgRdDiMEeV5e3YKNzsZAp3ZVfzUsbb4be4";

const main = async () => {
  const lps = await AmmImpl.searchPoolsByToken(
    connection,
    new PublicKey(token)
  );

  let a = 1;
  
  for (const lp of lps) {
    const poolAddress = lp.publicKey;
    console.log("poolAddress:",poolAddress)
    const amm = await AmmImpl.create(connection, poolAddress);
   
    const lpMint = lp.account.lpMint.toBase58()
    console.log("lpMint",lpMint);
    console.log("number:", a)
    const parsedAccInfo = await connection.getParsedAccountInfo(
      new PublicKey(lpMint)
    );
    console.log("Parsed Account Info",parsedAccInfo)
    const mintInfo = (parsedAccInfo?.value?.data as any).parsed?.info;
    console.log("MintInfo",mintInfo)
    const lpSupply = await amm.getLpSupply()
    const totalLpSupply = lpSupply.toNumber()

    const totalLpSupplyinDecimals = totalLpSupply /Math.pow(10,mintInfo?.decimals)
    console.log("Lp Supply:",totalLpSupplyinDecimals)
    const ActualSupply = mintInfo?.supply /Math.pow(10,mintInfo?.decimals)
    console.log("Actual Supply:",ActualSupply)
    a++;
  }

  console.log("All pools processed");

 
};

main();
