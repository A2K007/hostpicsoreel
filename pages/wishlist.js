import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import NavigationBar from "../Components/NavigationBar"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../public/addLogo.png'
import '../public/deleteLogo.png'
import style from '../styles/wishlist.module.css'

export default function Wishlist() {
  const router = useRouter()
  const [isloggedin, setIsLoggedIn] = useState(false)

  const checkifuser = async () => {
    const loggedInUser = localStorage.getItem("user");
    const res = await fetch(`http://localhost:3000/api/checkadmin/${loggedInUser}`)
    const data = await res.json()
    if (data.name !== "notuser") {
      setIsLoggedIn(true)
    }
    else{
      alert("Please login to view your wishlist")
      router.push('/login')
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

  const deletevote = async imgid => {
    const loggedInUser = localStorage.getItem('user')
    const res = await fetch('http://localhost:3000/api/deletevote', {
      method: 'POST',
      body: JSON.stringify({ username: loggedInUser, image_id: imgid }),
      headers: {
        'Content-Type': 'application/JSON'
      }
    })
    loadallimages();
  }

  function getCount() {
    var votecount = paintings.length + photographys.length + digitalarts.length + themes.length;
    return votecount;
  }


  const submitvotes = async () => {
    const loggedInUser = localStorage.getItem('user')
    const res = await fetch('http://localhost:3000/api/submitvotes', {
      method: 'POST',
      body: JSON.stringify({ username: loggedInUser }),
      headers: {
        'Content-Type': 'application/JSON'
      }
    })
    const data = await res.json()
  }

  const loadallimages = async () => {
    setPainting(await getcat("painting"));
    setPhotography(await getcat("photo"));
    setTheme(await getcat("theme"));
    setDigitalart(await getcat("digital"));
  }

  //starting state of the page
  useEffect(() => {
    loadallimages(), checkifuser()
  }, []);
  
  let paintingsArray = [];
  for (let i = 0; i < (2-paintings.length); i++){
    paintingsArray[i] = i;
  }

  let photographysArray = [];
  for (let i = 0; i < (2-photographys.length); i++){
    photographysArray[i] = i;
  }

  let digitalartsArray = [];
  for (let i = 0; i < (2-digitalarts.length); i++){
    digitalartsArray[i] = i;
  }

  let themesArray = [];
  for (let i = 0; i < (2-themes.length); i++){
    themesArray[i] = i;
  }
  
  return (
    <>
      <Head>
        <title>My Wishlist</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Oswald&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/earlyaccess/nicomoji.css" rel="stylesheet"/>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700&display=swap" rel="stylesheet"/>
        <link href="https://fonts.googleapis.com/css2?family=Niconne&display=swap" rel="stylesheet" />
      </Head>
      <NavigationBar />
      {
        isloggedin ?
          (
            <Container fluid className={style.mainBody}>
              <Container className={style.mainContainer}>
                <Row>
                  <Col>
                    <h1 className={style.mainTitle}>Wishlist</h1>
                  </Col>
                </Row>
                <Row>
                  <Col md={6} sm={12}>
                    <h3 className={style.title}>Paintings/Sketches</h3>
                    <Container>
                      {
                        paintings.map((painting) => {
                          return (
                            <Container className={style.box}>
                              <Container key={painting.image_id} className={style.boxTitle}>
                                {painting.name} | {painting.class}
                              </Container>
                              <Container>
                                <img src={painting.url} className={style.image}/>
                              </Container>
                              <Container>
                                <button onClick={() => deletevote(painting.image_id)} className={style.deleteButton}><img src="deleteLogo.png"/></button>
                              </Container>
                            </Container>
                          )
                        })
                      }
                      {
                        paintingsArray.map((count) => {
                          return (
                            <Link href="/scanner"><button className={style.addButton}><img src="addLogo.png"/></button></Link>
                          )
                        })
                      }
                    </Container>
                  </Col>
                  <Col md={6} sm={12}>
                    <h3 className={style.title}>Photography</h3>
                    <Container>
                      {
                        photographys.map((photograph) => {
                          return (
                            <Container className={style.box}>
                              <Container key={photograph.image_id} className={style.boxTitle}>
                                {photograph.name} | {photograph.class}
                              </Container>
                              <Container>
                                <img src={photograph.url} className={style.image}/>
                              </Container>
                              <Container>
                                <button onClick={() => deletevote(photograph.image_id)} className={style.deleteButton}><img src="deleteLogo.png"/></button>
                              </Container>
                            </Container>
                          )
                        })
                      }
                      {
                        photographysArray.map((count) => {
                          return (
                            <Link href="/scanner"><button className={style.addButton}><img src="addLogo.png"/></button></Link>
                          )
                        })
                      }
                    </Container>
                  </Col>
                </Row>
                <Row>
                  <Col md={6} sm={12}>
                    <h3 className={style.title}>Digital Art</h3>
                    <Container>
                      {
                        digitalarts.map((darts) => {
                          return (
                            <Container className={style.box}>
                              <Container key={darts.image_id} className={style.boxTitle}>
                                {darts.name} | {darts.class}
                              </Container>
                              <Container>
                                <img src={darts.url} className={style.image}/>
                              </Container>
                              <Container>
                                <button onClick={() => deletevote(darts.image_id)} className={style.deleteButton}><img src="deleteLogo.png"/></button>
                              </Container>
                            </Container>
                          )
                        })
                      }
                      {
                        digitalartsArray.map((count) => {
                          return (
                            <Link href="/scanner" className='scanContainer'><button className={style.addButton}><img src="addLogo.png"/></button></Link>
                          )
                        })
                      }
                    </Container>
                  </Col>
                  <Col md={6} sm={12}>
                    <h3 className={style.title}>Theme Based (Slice of Life)</h3>
                    <Container>
                      {
                        themes.map((theme) => {
                          return (
                            <Container className={style.box}>
                              <Container key={theme.image_id} className={style.boxTitle}>
                                {theme.name} | {theme.class}
                              </Container>
                              <Container>
                                <img src={theme.url} className={style.image}/>
                              </Container>
                              <Container>
                                <button onClick={() => deletevote(theme.image_id)} className={style.deleteButton}><img src="deleteLogo.png"/></button>
                              </Container>
                            </Container>
                          )
                        })
                      }
                      {
                        themesArray.map((count) => {
                          return (
                            <Link href="/scanner"><button className={style.addButton}><img src="addLogo.png"/></button></Link>
                          )
                        })
                      }
                    </Container>
                  </Col>
                </Row>
                <Row>
                  <Col className={style.submitContainer}>
                    {getCount() === 8 ?
                      (
                        <Link href="/feedback"><button className={style.submitButton} onClick={() => submitvotes()}>Final Submit</button></Link>
                      ) 
                        :
                      (
                        <button className={style.submitButton} onClick={() => alert("Please enter 2 votes for each category")}>Final Submit</button>
                      )
                    }
                  </Col>
                </Row>
              </Container>
            </Container>
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