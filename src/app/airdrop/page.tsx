"use client";
import React, { useState } from 'react'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { LAMPORTS_PER_SOL } from '@solana/web3.js';

const Airdrop = () => {
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState(1);
  const { connection } = useConnection()
  const wallet = useWallet();

  const requestAirdrop = async () => {
    if (!wallet.publicKey) {
      alert('Please connect your wallet first!');
      return;
    }

    setLoading(true);
    try {
      console.log('Requesting airdrop...');
      const signature = await connection.requestAirdrop(wallet.publicKey, amount * LAMPORTS_PER_SOL);
      console.log('Airdrop signature:', signature);
      console.log(process.env.NEXT_PUBLIC_SOLANA_ENDPOINT_DEVNET);
      // Wait for confirmation
      const confirmation = await connection.confirmTransaction(signature, 'confirmed');
      console.log('Transaction confirmed:', confirmation);

      // Get updated balance
      const balance = await connection.getBalance(wallet.publicKey);
      console.log(`New balance: ${balance / LAMPORTS_PER_SOL} SOL`);

      alert(`Airdrop successful! New balance: ${balance / LAMPORTS_PER_SOL} SOL`);
    } catch (error) {
      console.error('Airdrop failed:', error);
      alert('Airdrop failed. Please try again.');
    } finally {
      setLoading(false);
    }
  }
  return (

    <div>
      <div className='flex flex-col gap-2'>
        <h1 className='flex justify-center text-3xl font-bold'>Get Test SOL</h1>
        <p className='flex justify-center text-sm text-neutral-500'>Request an airdrop of 1 SOL to test token creation on Solana Devnet.</p>
      </div>
      <div className='flex justify-center mt-8'>
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>Your Wallet</CardTitle>
            <CardAction>
              <div className=''>
                {wallet?.publicKey?.toBase58()}
              </div>
            </CardAction>
          </CardHeader>
          <CardContent>
            <form>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="airdrop">Amount to receive</Label>
                  <Input
                    id="airdrop"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    min={0.1}
                    max={5}
                    step={0.1}
                    required
                  />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button disabled={loading} onClick={requestAirdrop} type="submit" className="w-full cursor-pointer">
              Request Airdrop
            </Button>
            <AlertDialog open={loading}>
              <AlertDialogTrigger asChild>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle className='font-bold text-gray-500'>AirDrop is in Process</AlertDialogTitle>
                </AlertDialogHeader>
              </AlertDialogContent>
            </AlertDialog>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

export default Airdrop