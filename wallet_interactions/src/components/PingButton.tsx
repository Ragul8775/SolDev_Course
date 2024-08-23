import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { PublicKey, Transaction, TransactionInstruction } from '@solana/web3.js'
import React, { FC } from 'react'

const PingButton:FC = () => {
    const PROGRAM_ID = "ChT1B39WKLS8qUrkLvFDXMhEJ4F1XZzwUNHUt4AU9aVa"
    const PROGRAM_DATA_ADD = "Ah9K7dQ8EHaZqcAsgBW8w37yN2eAy3koFmUn4x3CJtod"
    const {connection} = useConnection()
    const {publicKey,sendTransaction} = useWallet()
const HandleTrans = async ()=>{
   if(!connection || !publicKey){
    return
   }
        const programId = new PublicKey(PROGRAM_ID);
    const programDataAdd = new PublicKey(PROGRAM_DATA_ADD);
    const transaction = new Transaction();

    const instruction =  new TransactionInstruction({
        keys:[
            {
                pubkey:programDataAdd,
                isSigner:false,
                isWritable:false
            },
        ],
        programId
    })
    transaction.add(instruction)
   try {
    const signature = await sendTransaction(transaction, connection);
    console.log(signature)
   } catch (error) {
    console.log(error)
   }
    }
    
  return (
    <div className='flex flex-col text-center align-middle'>
        <button className='my-4 mx-2 p-5 text-lg border-2 rounded-lg font-inter ' onClick={HandleTrans}>
Ping Me
        </button>
    </div>
  )
}

export default PingButton