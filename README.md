# NFT marketplace bootstrap on Ethererum

![This repo provides you a NFT marketplace bootstrap on Ethereum.
](demo.png)

The technologies used in this project are [React](https://reactjs.org/), [Next.js](https://nextjs.org/), [Tailwind CSS](https://tailwindcss.com/), [HardHat](https://hardhat.org/), [Solidity](https://docs.soliditylang.org/en/v0.8.5/), and [Ethers.js](https://docs.ethers.io/v5/).

## The flow diagram of the project
![diagram
](diagram.png)

## Getting Started

First, clone the repo and install the dependencies:

```sh
git clone https://github.com/reddio-com/ethereum-nft-marketplace.git
```

```sh
cd ethereum-nft-marketplace
```

Update node to the version you have in package.json file.

```sh
yarn
```

Next, run a local Ethereum node:

```sh
npx hardhat node
```

Deploy the smart contract to the local node:

```sh
npx hardhat run scripts/deploy.js --network localhost
```

Running the above command should print out the addresses where the contract was deployed. Update `.evn.local` with those values:

```javascript
NEXT_PUBLIC_NFTMARKET_ADDRESS="your-nft-market-address"
NEXT_PUBLIC_NFT_ADDRESS="your-nft-address"
```

Create an account at [Infura](https://www.infura.io/), create a project and enable Dedicated Gateways, update the values below in '.evn.local' accordingly.

```javascript
NEXT_PUBLIC_IPFS_PROJECT_ID="your-infura-project-id"
NEXT_PUBLIC_API_KEY_SECRET="your-infura-project-secret"
```

Next, run the development server:

```bash
yarn dev
```

Notes: Make sure you choose the right network on your Metamask

## Deploy production to Vercel

1. Fork this repo
2. Add Sepolia network to your hardhat.config.js file with the following information,
```javascript
    sepolia: {
      url: `https://sepolia.infura.io/v3/${INFURA_API_KEY}`,
      accounts: [SEPOLIA_PRIVATE_KEY]
    }
```
3. Log in to [Vercel](https://vercel.com/)
4. Import from your repo
5. For 'Build and Output Settings', overide 'Build Command' with
```bash
yarn next build
```
6. Set environment variables under your project, include NEXT_PUBLIC_IPFS_PROJECT_ID, NEXT_PUBLIC_API_KEY_SECRET and NEXT_PUBLIC_SEPOLIA_API_KEY_SECRET
7. Deploy

