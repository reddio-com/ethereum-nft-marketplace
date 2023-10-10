# NFT marketplace bootstrap on Ethererum

![This repo provides you a NFT marketplace bootstrap on Ethereum.
](header.png)

The technologies used in this project are [React](https://reactjs.org/), [Next.js](https://nextjs.org/), [Tailwind CSS](https://tailwindcss.com/), [HardHat](https://hardhat.org/), [Solidity](https://docs.soliditylang.org/en/v0.8.5/), and [Ethers.js](https://docs.ethers.io/v5/).

## The flow diagram of the project
![diagram
](diagram.png)

## Getting Started

First, clone the repo and install the dependencies:

```sh
git clone https://github.com/reddio-com/ethereum-nft-marketplace.git


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

Running the above command should print out the addresses where the contract was deployed. Update `config.js` with those values:

```javascript
export const nftmarketaddress="your-nft-market-address"
export const nftaddress="your-nft-address"
```

Create an account at [Infura](https://www.infura.io/), create a project and enable Dedicated Gateways, update the values below in 'config.js' accordingly.

```javascript
export const projectId="your-infura-project-id"
export const projectSecret="your-infura-project-secret"
```

Next, run the development server:

```bash
npm run dev
# or
yarn dev
```
