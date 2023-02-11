import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

export default function MyVotes() {
  const router = useRouter()
  const [isloggedin, setIsLoggedIn] = useState(false)

  const checkifuser = async () => {
    
    const loggedInUser  = localStorage.getItem("user");
    const res = await fetch(`http://localhost:3000/api/checkadmin/${loggedInUser}`)
    const data = await res.json()
    if (data.name !== "notuser" && data.if_submitted === true) {
      setIsLoggedIn(true)
    }
    else{
      alert("You have not submitted your votes yet!")
      router.push('/wishlist')
    }
  }

  const logout = async name => {
    localStorage.removeItem('user');
  }

  //displaying all the images with category painting from atlas
  const [paintings, setPainting] = useState([])
  const [photographys, setPhotography] = useState([])
  const [digitalarts, setDigitalart] = useState([])
  const [themes, setTheme] = useState([])

  const getcat = async cate => {
    const loggedInUser = localStorage.getItem('user')
    const res = await fetch('http://localhost:3000/api/getWishlist', {
      method: 'POST',
      body: JSON.stringify({ category: cate, username: loggedInUser }),
      headers: {
        'Content-Type': 'application/JSON'
      }
    })
    const data = await res.json()
    return data;
  }

  const loadallimages = async () => {
    setPainting(await getcat("painting"));
    setPhotography(await getcat("photo"));
    setTheme(await getcat("theme"));
    setDigitalart(await getcat("digital"));
  }

  useEffect(() => {
    loadallimages(), checkifuser()
  }, []);

  return (
    <>
      <Head>
        <title>My Votes</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {
        isloggedin ?
          (
            <div>
              <h1>This is My Votes Page</h1>
              <Link href="/login"><button onClick={() => logout()}>Logout</button></Link><br></br>
              <div>
                <div>
                  <p>Painting/Sketches</p>
                  {
                    paintings.map((painting) => {
                      return (
                        <>
                          <div key={painting.image_id}>
                            {painting.name} | {painting.category} | {painting.class}
                          </div>
                          <img src={painting.url}></img>
                        </>
                      )
                    })
                  }
                </div>
                <div>
                  <p>Photography</p>
                  {
                    photographys.map((photograph) => {
                      return (
                        <>
                          <div key={photograph.image_id}>
                            {photograph.name} | {photograph.category} | {photograph.class}
                          </div>
                          <img src={photograph.url}></img>
                        </>
                      )
                    })
                  }
                </div>
                <div>
                  <p>Digital Art</p>
                  {
                    digitalarts.map((dart) => {
                      return (
                        <>
                          <div key={dart.image_id}>
                            {dart.name} | {dart.category} | {dart.class}
                          </div>
                          <img src={dart.url}></img>
                          
                        </>
                      )
                    })
                  }
                </div>
                <div>
                  <p>Theme</p>
                  {
                    themes.map((theme) => {
                      return (
                        <>
                          <div key={theme.image_id}>
                            {theme.name} | {theme.category} | {theme.class}
                          </div>
                          <img src={theme.url}></img>
                          
                        </>
                      )
                    })
                  }
                </div>
              </div>
            </div>
          )
          :
          (
            <div>
              <h2>Not logged in</h2>
            </div>
          )
      }
    </>
  )
}