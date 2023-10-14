import '../styles/globals.css'
import Link from 'next/link'
import Image from "next/image"
import Head from 'next/head'
import LogoImage from '../logo.png'

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Head>
        <title>Reddio NFT Marketplace</title>
        <meta property="og:title" content="Reddio NFT Marketplace" key="title" />
      </Head>
      <nav className="w-full bg-gray-800 shadow">
        <div className="flex items-center p-4 border-b text-center gap-x-4">
          
          <Image src={LogoImage} alt="Logo" width="90" height="20" />
          <p className={`text-white origin-left font-medium text-xl`}>NFT Marketplace</p>
  
          <ul className="hidden md:flex flex-grow justify-end">
            
            <li className="nav-links px-4 cursor-pointer capitalize font-medium text-gray-500 hover:scale-105 hover:text-white duration-200 link-underline">
              <Link href="/">Home</Link>
            </li>
            
            <li className="nav-links px-4 cursor-pointer capitalize font-medium text-gray-500 hover:scale-105 hover:text-white duration-200 link-underline">
            <Link href="/create-item">Create NFT</Link>
            </li>
            
            
            <li className="nav-links px-4 cursor-pointer capitalize font-medium text-gray-500 hover:scale-105 hover:text-white duration-200 link-underline">
              <Link href="/my-nfts">My NFTs</Link>
            </li>
            
          </ul>
        </div>
      </nav>
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
