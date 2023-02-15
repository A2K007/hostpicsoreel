import Head from 'next/head'
import { useState, useEffect } from 'react'
import Link from 'next/link';


function Admin() {
  const [user, setUser] = useState('')
  const [users, setUsers] = useState([])
  const [isloggedin, setIsLoggedIn] = useState(false)
  useEffect(() => {
    checkifadmin()
  }, []);

  const checkifadmin = async () => {
    const loggedInUser = localStorage.getItem("user");
    const resh = await fetch(`/api/checkadmin/${loggedInUser}`)
    const data = await resh.json()
    if (data.is_admin) {
      setIsLoggedIn(true)
    }
  }
  const getusers = async () => {
    const s = process.env.BASE_FETCH_URL
    const res = await fetch('/api/getuserlist')
    const data = await res.json()
    setUsers(data)
  }

  const adduser = async () => {
    const s = process.env.BASE_FETCH_URL
    const admin = localStorage.getItem('user')
    const res = await fetch('/api/insertuser', {
      method: 'POST',
      body: JSON.stringify({ user, admin }),
      headers: {
        'Content-Type': 'application/JSON'
      }
    })
    const data = await res.json()
    getusers()
  }

  const deleteuser = async name => {
    const s = process.env.BASE_FETCH_URL
    const admin = localStorage.getItem('user')
    const res = await fetch('/api/deleteuser', {
      method: 'POST',
      body: JSON.stringify({ name, admin }),
      headers: {
        'Content-Type': 'application/JSON'
      }
    })
    const data = await res.json()
    getusers()
  }

  const logout = async name => {
    const loggedInUser = localStorage.removeItem('user');

  }

  return (
    <>
      <Head>
        <title>Admin Dashboard</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <h1>This is Adminpage</h1>
      </div>
      {isloggedin ? (
        <>
          <div>
            <h1>Add User</h1>

            <Link href="/adminlogin"><button onClick={logout}>Logout</button></Link>
            <h2>Please Input User Details</h2>
            <input type='text' value={user} onChange={(e) => setUser(e.target.value.toLowerCase())}></input>
            <button onClick={adduser}>Add User</button>
            <h2>User List</h2>
            <button onClick={getusers}>Get User List</button>
            <h5>Name | if_submitted | If_Admin</h5>
            {
              users.map((user) => {
                return (
                  <div key={user._id}>
                    {user.name} | {user.if_submitted ? ("Yes") : ("No")} |
                    {user.is_admin ? (
                      <>It's Admin</>
                    ) : (
                      <button onClick={() => {
                        const confirmBox = window.confirm(
                          "Do you really want to delete this Crumb?"
                        )
                        if (confirmBox === true) {
                          deleteuser(user.name)
                        }
                      }}>
                        Delete User
                      </button>
                    )}
                  </div>
                )
              })
            }
          </div>
        </>
      ) : (
        <div>
          You are not admin
        </div>
      )
      }
    </>
  )
}

export default Admin