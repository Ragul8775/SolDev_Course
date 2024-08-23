import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from '@solana/web3.js';
import React, { FC, useState } from 'react';

const SendSol: FC = () => {
    const [txSig, setTxSig] = useState('');
    const { connection } = useConnection();
    const { publicKey, sendTransaction } = useWallet();

    type FormData = {
        to: string;
        amount: any;
    };
    
    const [formData, setFormData] = useState<FormData>({
        to: "",
        amount: 0,
    });

    const updateField = (field: keyof FormData, value: string) => {
        const numValue = parseFloat(value);
        setFormData(prev => ({
            ...prev,
            [field]: field === 'amount' ? (isNaN(numValue) ? 0 : numValue) : value, // Fall back to 0 if NaN
        }));
    };

    const sendSol = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!publicKey || !connection) return;
           const transaction = new Transaction();
           const resipentPubKey = new PublicKey(formData.to);

           const sendSolTransaction  = SystemProgram.transfer({
            fromPubkey:publicKey,
            toPubkey:resipentPubKey,
            lamports:LAMPORTS_PER_SOL*formData.amount
           })

           try {
            transaction.add(sendSolTransaction)
            sendTransaction(transaction,connection).then(sign =>{
                setTxSig(sign)
            })
           } catch (error) {
            console.log(error)
            console.error(error)
           }
    };

    const link = () => txSig ? `https://explorer.solana.com/tx/${txSig}?cluster=devnet` : '';

    return (
        <div>
            {publicKey ? (
                <div>
                    <form onSubmit={sendSol} className="flex flex-col items-center justify-center">
                        <label htmlFor="amount">Amount (in SOL) to send:</label>
                        <input id="amount" type="text" value={formData.amount.toString()}
                               onChange={(e) => updateField('amount', e.target.value)}
                               className="mx-6 min-w-[450px] p-4 text-lg border-0 text-black" placeholder="e.g. 0.1" required />
                        <br />
                        <label htmlFor="recipient">Send SOL to:</label>
                        <input id="recipient" type="text" value={formData.to}
                               onChange={(e) => updateField('to', e.target.value)}
                               className="mx-6 min-w-[450px] p-4 text-lg border-0 text-black" placeholder="e.g. 4Zw1fXuYuJhWhu9KLEYMhiPEiqcpKd6akw3WRZCv84HA" required />
                        <button type="submit" className="my-4 p-6 text-lg border-0">Send</button>
                    </form>
                </div>
            ) : <span>Connect Your Wallet</span>}
            {txSig && (
                <div>
                    <p>View your transaction on </p>
                    <a href={link()} target="_blank" rel="noopener noreferrer">Solana Explorer</a>
                </div>
            )}
        </div>
    );
};

export default SendSol;
