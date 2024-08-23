import { Connection, PublicKey } from '@solana/web3.js';
import { LIQUIDITY_STATE_LAYOUT_V4 } from '@raydium-io/raydium-sdk';// Replace with the actual path to the layout

const connection = new Connection('https://mainnet.helius-rpc.com/?api-key=8e4f5e6e-24e3-4b85-ab12-9ccf973f00d7')

const getLpMintInfo = async (lpPool: string) => {
  const info = await connection.getAccountInfo(new PublicKey(lpPool));
  if (!info) throw new Error('Failed to fetch account info');

  const poolState = LIQUIDITY_STATE_LAYOUT_V4.decode(info.data);
  const lpMint = poolState.lpMint.toBase58();

  const parsedAccInfo = await connection.getParsedAccountInfo(new PublicKey(lpMint));
  const mintInfo = (parsedAccInfo?.value?.data as any)?.parsed?.info;

  if (!mintInfo) throw new Error('Failed to parse account info');

  return { poolState, mintInfo };
};

const calculateLpSupply = (poolState: any, mintInfo: any) => {
  const lpReserve = poolState.lpReserve.toNumber() / Math.pow(10, mintInfo?.decimals);
  const actualSupply = mintInfo?.supply / Math.pow(10, mintInfo?.decimals);

  const maxLpSupply = Math.max(actualSupply, lpReserve - 1);
  const burnAmt = maxLpSupply - actualSupply;

  return { burnAmt, maxLpSupply };
};

const lpPromises = async (lpPool: string) => {
  try {
    const { poolState, mintInfo } = await getLpMintInfo(lpPool);
    return calculateLpSupply(poolState, mintInfo);
  } catch (error) {
    console.error(`Failed to process liquidity pool: ${lpPool}`, error);
    return { burnAmt: 0, maxLpSupply: 0 };
  }
};

// Test the function
lpPromises('FRhB8L7Y9Qq41qZXYLtC2nw8An1RJfLLxRF2x9RwLLMo').then(result => console.log(result));
