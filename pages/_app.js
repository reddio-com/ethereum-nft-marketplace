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
          <Image src={LogoImage} alt="Logo" width="90"
          height="20" />
          <p className={`text-white origin-left font-medium text-xl`}>NFT Marketplace</p>
        </div>
        
      </nav>
      <nav className="border-b px-12 py-2">
        <div className="flex mt-4">
          <Link href="/">
            <a className="mr-4 text-blue-500">
              Home
            </a>
          </Link>
          <Link href="/create-item">
            <a className="mr-4 text-blue-500">
              Create NFT
            </a>
          </Link>
          <Link href="/my-nfts">
            <a className="mr-4 text-blue-500">
              My NFTSs
            </a>
          </Link>
        </div>
      </nav>
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
