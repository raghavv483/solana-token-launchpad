"use client";

import type { ThemeProviderProps } from "next-themes";
import {
    ConnectionProvider,
    WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { UnsafeBurnerWalletAdapter } from "@solana/wallet-adapter-wallets";
import {
    WalletModalProvider,

    WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";

// Default styles that can be overridden by your app
import "@solana/wallet-adapter-react-ui/styles.css";

import * as React from "react";

import { useRouter } from "next/navigation";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export interface ProvidersProps {
    children: React.ReactNode;
    themeProps?: ThemeProviderProps;
}



export function Providers({ children, themeProps }: ProvidersProps) {
    //const router = useRouter();
    console.log(process.env.NEXT_PUBLIC_SOLANA_ENDPOINT_DEVNET );
    
    return (
        <ConnectionProvider endpoint={process.env.NEXT_PUBLIC_SOLANA_ENDPOINT_DEVNET as string}>
            <WalletProvider wallets={[]} autoConnect>
                <WalletModalProvider>
                  
                    <NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
}
