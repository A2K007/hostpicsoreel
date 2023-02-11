import Link from "next/link";
import Head from "next/head";
import React, { useState, useEffect } from "react";
import { QrReader } from "react-qr-reader";
import {useRouter} from 'next/router'

export default function Scanner() {
  const router = useRouter()

  const [data, setData] = useState("No result");
  const [isloggedin, setIsLoggedIn] = useState(false)
  
  const checkifuser = async () => {
    const loggedInUser = localStorage.getItem("user");
    const resh = await fetch(`/api/checkadmin/${loggedInUser}`)
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
    const res = await fetch(`/api/getimage/${data}`)
    const image = await res.json()
    if (image.length > 0) {
      router.push(`/showimage/?id=${data}`)
    } else{
      setData(null);
    }
  }

  const logout = async name => {
    const loggedInUser = localStorage.removeItem('user');
  }

  return (
    <>
      <Head>
        <title>Scan Vote</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {
        isloggedin ?
          (
            <div style={{ width: "40%", height: "40%", margin: "auto", background: "pink"}}>
              <Link href = '/'><button onClick={logout}>Logout</button></Link>
              <QrReader
                onResult={(result, error) => {
                  if (!!result) {
                    setData(result?.text);
                    autoRedirect(result?.text);
                  }
                  if (!!error) {
                    console.info(error);
                  }
                }
                }
                //this is facing mode : "environment " it will open backcamera of the smartphone and if not found will 
                // open the front camera
                constraints={{ facingMode: "environment" }}
                style={{ width: "20%", height: "20%" }}
              />
              <div style={{ margin: "auto" }}>
                {/* <p>{data}</p> */}
                {/* <Link href={`/showimage/?id=${data}`}><button>Next</button></Link> */}
              </div>
            </div>
          )
          :
          (
            <h1>Not logged in</h1>
          )
      }
    </>
  )
}
