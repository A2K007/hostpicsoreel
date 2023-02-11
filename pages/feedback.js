import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

export default function feedback() {

  const router = useRouter()
  const [isloggedin, setIsLoggedIn] = useState(false)

  const checkifuser = async () => {
    const loggedInUser = localStorage.getItem("user");
    const res = await fetch(`http://localhost:3000/api/checkadmin/${loggedInUser}`)
    const data = await res.json()
    if (data.name !== "notuser" && data.if_submitted === true) {
      setIsLoggedIn(true)
    }
    else {
      alert("You have not submitted your votes yet!")
      router.push('/wishlist')
    }
  }

  const logout = async name => {
    localStorage.removeItem('user');
  }

  useEffect(() => {
    checkifuser()
  }, []);

  return (
    <>
      <Head>
        <title>Feedback</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <h1><b>Thank you for voting!</b></h1>
        <br></br>
        <h3>Click the button below and leave us your valuable feedback!</h3>
        <br></br>
        <div>
          <Link href="https://docs.google.com/forms/d/e/1FAIpQLSc5bZBUMK98bxt_P92EHSularg0bo6Y1eWS4jniSZfgVxpRmg/viewform?usp=sf_link"><button>Submit Feedback</button></Link>
          <Link href="/myvotes"><button>Back to Wishlist</button></Link>
          <Link href='/login'><button onClick={() => logout()}>Logout</button></Link>
        </div>
      </div>
    </>
  )
}