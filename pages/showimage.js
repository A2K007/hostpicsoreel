import Head from "next/head"
import { useState, useEffect } from 'react'
import { useRouter } from "next/router";
import Link from "next/link";
import NavigationBar from "../Components/NavigationBar"
import Container from 'react-bootstrap/Container'
import '../public/scannerVector.png'
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import style from '../styles/ShowImage.module.css'
import '../public/okLogo.png'
import '../public/cancelLogo.png'
import '../public/Trophy.png'


export default function Scanner() {
    const [images, setImages] = useState([])
    const [isloggedin, setIsLoggedIn] = useState(false)

    const checkifuser = async () => {
        const loggedInUser = localStorage.getItem("user");
        const resh = await fetch(`/api/checkadmin/${loggedInUser}`)
        const data = await resh.json()
        if (data.name !== "notuser") {
            setIsLoggedIn(true)
        }
    }
    const getimage = async locid => {
        const s = process.env.BASE_FETCH_URL
        const res = await fetch(`/api/getimage/${locid}`)
        const data = await res.json()
        setImages(data)
    }

    const voteit = async () => {
        var user = localStorage.getItem('user')
        const s = process.env.BASE_FETCH_URL
        try {
            const res = await fetch('/api/addvote', {
                method: 'POST',
                body: JSON.stringify({ image_id: images[0].image_id, category: images[0].category, voter_id: user }),
                headers: {
                    'Content-Type': 'application/JSON'
                }
            })
            router.reload()
            const data = await res.json();
            if (data.msg) {
                alert("2 votes already casted in given category")
            }
        } catch (e) {
            alert("You have already voted for this!")
        }
    }
    var router = useRouter();
    // console.log(id)
    // getimage(id)
    var id = "no"
    id = router.query["id"];

    useEffect(() => {
        checkifuser(), getimage(id)
    }, []);

    return (
        <>
            <Head>
                <title>Cast a vote!</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
                <link href="https://fonts.googleapis.com/css2?family=Oswald&display=swap" rel="stylesheet" />
                <link href="https://fonts.googleapis.com/earlyaccess/nicomoji.css" rel="stylesheet"/>
                <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700&display=swap" rel="stylesheet"/>
            </Head>
            <NavigationBar />
            {
                isloggedin ?
                    (
                        <Container fluid className={style.mainBody}>
                            <Container className={style.mainContainer}>
                                <Row className={style.titleContainer}>
                                    <Col>
                                        <h1 className={style.mainTitle}>Do you want to add this in wishlist?</h1>
                                    </Col>
                                </Row>
                                {
                                    images.map((image) => {
                                        return (
                                            <Row className={style.contentContainer}>
                                                <Col lg={5} md={6} sm={6} xs={9}>
                                                    <Container className={style.imageContainer}>
                                                        <img src="Trophy.png" className={style.image}></img>
                                                    </Container>
                                                </Col>
                                                <Col lg={5} md={6} sm={6} xs={10}>
                                                    <Container className={style.box}>
                                                        <Container key={image.image_id} className={style.boxImage}>
                                                            <img src={image.url} className={style.image}></img>
                                                        </Container>
                                                        <Container key={image.image_id} className={style.boxSmallTitle}>
                                                            {image.name} {image.class} 
                                                        </Container>
                                                        <Container key={image.image_id} className={style.boxBigTitle}>
                                                            {image.category}
                                                        </Container>
                                                        <Link href='/scanner'><button className={style.cancelButton}><img src="cancelLogo.png"/></button></Link>
                                                        <Link href="/wishlist"><button className={style.okButton} onClick={async () => await voteit(image.image_id)}><img src="okLogo.png"/></button></Link>
                                                    </Container>
                                                </Col>
                                            </Row>
                                        )
                                    })
                                }
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