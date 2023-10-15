import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import web3 from 'web3'
import axios from 'axios'
import Web3Modal from "web3modal"

import NFT from '../artifacts/contracts/NFT.sol/NFT.json'
import Market from '../artifacts/contracts/NFTMarket.sol/NFTMarket.json'

const infuraSepoliaAPIKey = process.env.NEXT_PUBLIC_SEPOLIA_API_KEY_SECRET;
const nftaddress = process.env.NEXT_PUBLIC_NFT_ADDRESS;
const nftmarketaddress = process.env.NEXT_PUBLIC_NFTMARKET_ADDRESS;
const isLocal = process.env.NODE_ENV === 'development';

export default function Home() {
  const [nfts, setNfts] = useState([])
  const [loaded, setLoaded] = useState('not-loaded')
  useEffect(() => {
    loadNFTs()
  }, [])
  // fetch NFTs from the marketplace and render them to the UI
  async function loadNFTs() {
    let provider;

    if (isLocal) {
      // Use localhost provider
      provider = new ethers.providers.JsonRpcProvider();
      console.log('isLocal')
    } else {
      // Use remote testnet provider (e.g., Infura)
      provider = new ethers.providers.JsonRpcProvider(`https://sepolia.infura.io/v3/${infuraSepoliaAPIKey}`);
      console.log('remote: ', `https://sepolia.infura.io/v3/${infuraSepoliaAPIKey}`)
    }

    const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider)
    const marketContract = new ethers.Contract(nftmarketaddress, Market.abi, provider)
    // calls the fetchMarketItems function in smart contract and returns all unsold NFT
    const data = await marketContract.fetchMarketItems()
    
    const items = await Promise.all(data.map(async i => {
      const tokenUri = await tokenContract.tokenURI(i.tokenId)
      const meta = await axios.get(tokenUri)
      let price = web3.utils.fromWei(i.price.toString(), 'ether');
      let item = {
        price,
        tokenId: i.tokenId.toNumber(),
        seller: i.seller,
        owner: i.owner,
        image: meta.data.image,
      }
      return item
    }))
    console.log('items: ', items)
    setNfts(items)
    setLoaded('loaded') 
  }
  // allow a user to purchase an NFT
  async function buyNft(nft) {
    const web3Modal = new Web3Modal({
      network: "mainnet",
      cacheProvider: true,
    });
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(nftmarketaddress, Market.abi, signer)
    
    const price = web3.utils.toWei(nft.price.toString(), 'ether');

    console.log('price: ', price);
    
    // allow the user to transfer the amount from wallet to the seller's wallet
    const transaction = await contract.createMarketSale(nftaddress, nft.tokenId, {
      value: price
    })
    await transaction.wait()
    loadNFTs()
  }
  if (loaded === 'loaded' && !nfts.length) return (<h1 className="p-20 text-4xl">No NFTs!</h1>)
  return (
    <div className="flex justify-center">
      <div style={{ width: 900 }}>
        <div className="grid grid-cols-2 gap-4 pt-8">
          {
            nfts.map((nft, i) => (
              <div key={i} className="border p-4 shadow">
                <img src={nft.image} className="rounded" />
                <p className="text-2xl my-4 font-bold">Price: {nft.price}</p>
                <button className="bg-green-600 text-white py-2 px-12 rounded" onClick={() => buyNft(nft)}>Buy NFT</button>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}
