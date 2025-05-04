import React from 'react'
import Logo from './Logo'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Avatar from 'react-avatar';


const Navbar = ( {setLoading} ) => {

  const router = useRouter()

  const [error, setError] = useState('')
  const [user, setuser] = useState()
  const [isLoggedIn, setisLoggedIn] = useState(null)

  const fetchUser = async () => {


    let a = await fetch("/api/fetchuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: localStorage.getItem('userId')
      }),
    })
    let data = await a.json()

    if (data.success) {
      setuser(data)
    }
    else {
      setError(data.message)
    }
  }


  const logout = async () => {
    
    setLoading(true)

    let a = await fetch("/api/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userId: localStorage.getItem('userId'),
      })
    })

    let b = await a.json()
    if (b.success) {
      localStorage.removeItem('userId')
      localStorage.removeItem('isLoggedIn')
      
      router.replace(`/`)
    }
    else {
      setError(b.message)
      console.log(b.message)
    }
  }

  const setUser = () => {
    if (localStorage.getItem('userId') != null) {
      setisLoggedIn(true)
    }
    else {
      setisLoggedIn(false)
    }
  }

  useEffect(() => {
    fetchUser()
    setUser()
  }, [isLoggedIn])

  return (
    <nav className=' bg-purple-950 text-white sticky top-0 z-20 '>
      <div className='md:flex flex justify-between items-center md:py-3 md:px-14 py-2 px-2.5 '>
        <div>
          <Logo />
        </div>

        {isLoggedIn ? <>
          <div className=' flex justify-between items-center gap-6'>

            <div className=' md:block hidden cursor-pointer'><Avatar name={user ? user.username : ''} size="40" round="50%" /></div>
            <div className=' md:hidden block cursor-pointe'><Avatar name={user ? user.username : ''} size="35" round="50%" /></div>

            <button onClick={logout} className=' md:block hidden  cursor-pointer py-1.5 px-3 bg-[#cf0909] text-white rounded-lg border-0 transition-all hover:bg-[#ff2222] font-abee'>Logout</button>
            <button onClick={logout} className=' md:hidden block p-1  bg-[#cf0909] text-white rounded-full border-0 transition-all hover:bg-red-600 font-abee'><img src='../logout.svg' alt='log' className=' w-6 h-6' /></button>

          </div> 
        </> : <Link href="/login"><button className="bg-gradient-to-br from-purple-700 to-pink-600  hover:bg-gradient-to-br  hover:from-purple-500 hover:to-pink-400 hover:cursor-pointer text-white md:px-5 md:py-2.5 px-3 py-1 md:rounded-xl rounded-lg font-semibold shadow-md">Login</button></Link> }
      </div>
    </nav>
  )
}

export default Navbar