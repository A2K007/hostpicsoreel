import Head from 'next/head'
import { useState } from 'react'
import { useRouter } from 'next/router'
import Instructions from '../Components/Instructions';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Admin({href}) {
  const router = useRouter()
  const [users, setUsers] = useState([])
  const [userid, setUserId] = useState('')
  const userlogin = async userid => {
    const s = process.env.BASE_FETCH_URL
    const res = await fetch(`http://localhost:3000/api/checkadmin/${userid}`)
    const data = await res.json()
    setUsers(data)
    localStorage.setItem('user', data.name)
    if(data.name === "notuser"){
      alert("Please enter a valid user id");
    } else if(data.if_submitted === true){
      router.push('/myvotes');
    } else{
      router.push('/wishlist');
    }
  }

  return (
    <>
      <Head>
        <title>User Login</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <div>
        <h1>This is the instruction page.</h1>
        <div>
          <h3>Enter User ID (eg:c2k....)</h3>
          <input type='text' value={userid} onChange={(e) => setUserId(e.target.value)}></input>
          <button onClick={() => userlogin(userid)}>User Login</button>
        </div>
      </div> */}
      <Instructions />
    </>
  )
}