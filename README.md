# Token Launchpad
    ├── app/               # Route Pages
    │   ├── airdrop/       # Airdrop page
    │   ├── create/        # Create token page
    │   ├── mint/          # Mint tokens page
    │   └── api/           # backend code
    ├── components/        # React components for pages
    ├── config/            # siteconfig and backend func
    │   ├── solana.ts      # Solana integration
    │   └── site.ts        # Site config
    ├── models/            # Mongodb data model
    ├── types/             # Typescript types
    └── utils/             # util files for connections


# MVP Plan
    Here’s an MVP plan for your Solana Token Launchpad based on your folder structure.

    Core Idea
    A minimal dApp that lets a user:

    Connect their Solana wallet

    Create a new SPL token

    Mint more tokens

    Airdrop tokens to multiple addresses

    Store basic token metadata in MongoDB

    MVP Features
    Frontend
    Wallet connect UI (Phantom, Solflare)

    Create Token Page (/create)

    Inputs: token name, symbol, decimals, initial supply

    Calls backend → creates SPL token mint

    Mint Tokens Page (/mint)

    Inputs: token mint address, amount to mint

    Calls backend → mints more tokens to user’s wallet

    Airdrop Page (/airdrop)

    Inputs: mint address, list of recipient addresses, amount each

    Executes spl-token transfer for all recipients

    Backend (/app/api/)
    Token creation API

    Uses @solana/web3.js + @solana/spl-token

    Returns new mint address & transaction signature

    Mint tokens API

    Validates mint authority & executes minting

    Airdrop API

    Batch transfer tokens to recipients

    Database (MongoDB)
    models/Token.ts

    ts
    Copy
    Edit
    interface Token {
    name: string;
    symbol: string;
    mintAddress: string;
    decimals: number;
    owner: string; // wallet address
    createdAt: Date;
    }
    Stores created tokens for quick lookup.

    Config
    config/solana.ts → handles connection to Solana (e.g., devnet/testnet)

    config/site.ts → site settings (RPC URL, cluster info, etc.)

    Utils
    Helper functions: createMint(), mintTokens(), airdropTokens(), wallet connection management.

    Tech Stack
    Frontend: Next.js + Tailwind CSS + Wallet Adapter

    Blockchain: Solana devnet, @solana/web3.js, @solana/spl-token

    Backend: Next.js API routes

    Database: MongoDB (for storing token metadata)


