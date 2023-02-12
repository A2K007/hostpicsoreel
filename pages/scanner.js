import Link from "next/link";
import Head from "next/head";
import React, { useState, useEffect } from "react";
import { QrReader } from "react-qr-reader";
import {useRouter} from 'next/router'
import NavigationBar from "../Components/NavigationBar"
import Container from 'react-bootstrap/Container';
import style from "../styles/Scanner.module.css"
import Image from 'react-bootstrap/Image'
import '../public/scannerVector.png'
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Scanner() {
  const router = useRouter()

  const [data, setData] = useState("No result");
  const [isloggedin, setIsLoggedIn] = useState(false)
  
  const checkifuser = async () => {
    const loggedInUser = localStorage.getItem("user");
    const resh = await fetch(`http://localhost:3000/api/checkadmin/${loggedInUser}`)
    const data = await resh.json()
    if (data.name !== "notuser") {
      setIsLoggedIn(true);
      setData(null);
    } else{
      router.push('/login')
    }
  }

  useEffect(() => {
    checkifuser();
  }, []);
    
  const autoRedirect = async data => {
    const s = process.env.BASE_FETCH_URL
    const res = await fetch(`http://localhost:3000/api/getimage/${data}`)
    const image = await res.json()
    if (image.length > 0) {
      router.push(`/showimage/?id=${data}`)
    } else{
      setData(null);
    }
  }

  return (
    <>
      <Head>
        <title>Scan Vote</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Oswald&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/earlyaccess/nicomoji.css" rel="stylesheet"/>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700&display=swap" rel="stylesheet"/>
      </Head>
      <NavigationBar />
      {console.log(isloggedin)}
      {
        isloggedin ?
        (
          <Container fluid className={style.mainBody}>
              <Container className={style.mainContainer}>
                <Image src="scannerVector.png" rounded className={style.imageContainer}>
                </Image>
                <Container className={style.scannerContainer}>
                  <QrReader
                    onResult={(result, error) => {
                      if (!!result) {
                        setData(result?.text);
                        autoRedirect(result?.text);
                      }
                      if (!!error) {
                        console.info(error);
                      }
                    }}
                    //this is facing mode : "environment " it will open backcamera of the smartphone and if not found will 
                    // open the front camera
                    constraints={{ facingMode: "environment" }}
                  />
                </Container>
              </Container>
          </Container>
        )
          :
        (
          <h1>Not logged in</h1>
        )
      }
    </>
  )
}