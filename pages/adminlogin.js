import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'


function Admin() {
    const [users, setUsers] = useState([])
    const [adminid, setAdminId] = useState('')

    const adminlogin = async adminid => {
        const s = process.env.BASE_FETCH_URL
        const res = await fetch(`/api/checkadmin/${adminid}`)
        const data = await res.json()
        setUsers(data)
        localStorage.setItem('user', data.name)
    }

    return (
        <>
            <Head>
                <title>Admin Login</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div>
                <h1>This is Adminpage</h1>
            </div>
            <div>
                <h3>Enter Admin ID</h3>
                <input type='text' value={adminid} onChange={(e) => setAdminId(e.target.value)}></input>
                <button onClick={() => adminlogin(adminid)}>Admin Login</button>
            </div>
            {users.is_admin ? (
                <>
                    <Link href="/admin"><button>Procced</button></Link><br></br>
                </>
            ) : (
                <div>
                    You are not admin
                </div>
            )}
        </>
    )
}

export default Admin