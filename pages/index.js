import Head from 'next/head'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <Head>
        <title>Picsoreel Voting 2k23</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <h1>This is Homepage</h1>
        <Link href="/admin"><button>Admin</button></Link><br></br>
        <Link href="/login"><button>Voter Login</button></Link>
      </div>
    </>
  )
}


