"use client"

import * as React from "react"
import Link from "next/link"
import { CircleCheckIcon, CircleHelpIcon, CircleIcon } from "lucide-react"
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

const components: { title: string; href: string; description: string }[] = [

  {
    title: "Airdrop",
    href: "/airdrop",
    description:
      "Request an airdrop of 1 SOL to test token creation on Solana Devnet.",
  },
]

export function Navbar() {
  return (
    <div className="flex w-full items-center justify-between px-4 py-2 bg-gray-900">
      <NavigationMenu viewport={false}>
        <NavigationMenuList>
             
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/">Home</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

         
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/create-token">Create Token</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

         
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/mint">My Token</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
         
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/airdrop">Airdrop</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        </NavigationMenuList>
      </NavigationMenu>

      {/* Wallet button on the right */}
      <div className="ml-4">
        <WalletMultiButton />
      </div>
    </div>
  )
}

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link href={href}>
          <div className="text-sm leading-none font-medium">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  )
}
