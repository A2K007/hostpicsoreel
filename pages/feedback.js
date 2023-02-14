import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Container } from 'react-bootstrap'
import Image from 'react-bootstrap/Image'
import style from '../styles/Thankyou.module.css'

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
    // checkifuser()
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
        <h1 className={style.titleh1}><b>Thank You</b></h1>
        
        {/* <div>
          <Link href="/myvotes"><button>Back to Vote List</button></Link>
          <Link href='/login'><button onClick={() => logout()}>Logout</button></Link>
        </div> */}
        <Container fluid className={style.mainbody}>
          <Container className={style.content}>
            <Image src='Heart.png' className={style.image}></Image>
          </Container>
          <Container className={style.form}>
        <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSe7NgtEQHT4jecCVjH_dpMu0OH5SgA_bUA55RGQ8Um5x6aRgw/viewform?embedded=true" className={style.form} width="340px" 
    height="1400px" frameborder="0" marginheight="0" marginwidth="0" align-items="center">Loading…</iframe>
        </Container>
        </Container>
      </div>
    </>
  )
}