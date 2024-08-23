import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import React, { FC } from 'react'

const AppBar:FC = () => {
  return (
    <div className='w-full flex justify-between items-center bg-gray-950 px-8 flex-wrap'>
        <h1 className='text-2xl font-bold text-gray-200 '>Solana </h1>
        <span>Wallet-Adapter Example</span>
        <WalletMultiButton/>

    </div>
  )
}

export default AppBar