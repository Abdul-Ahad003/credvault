"use client"
import React from 'react'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { FadeLoader } from "react-spinners";
import toast, { Toaster } from 'react-hot-toast';

const page = () => {

  const router = useRouter()

  const [name, setname] = useState('')
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const [confirmPass, setconfirmPass] = useState('')
  const [err, seterr] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setname('')
    setemail('')
    setpassword('')
    setconfirmPass('')

    setLoading(true)

    let a = await fetch('/api/signup', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
      }),
    })

    let data = await a.json()

    if (data.success) {
      router.push('/login')
    }

    else {
      setLoading(false)
      seterr(data.message)
      toast.error("Error")
    }
  }


  return (
    <>
      {loading == true && <div className=' absolute top-1/2 md:left-1/2 left-[43vw] '>
        <FadeLoader
          color="#200838"
          height={20}
          loading={loading}
          margin={2}
          radius={2}
          speedMultiplier={1}
          width={25}
        />
      </div>}

      <div><Toaster /></div>

      {loading == false && <div className="min-h-screen flex items-center justify-center">
        <div className="cont bg-white md:w-96  w-[85vw] md:h-auto h-[60vh] rounded-3xl shadow-md overflow-hidden">
          <div className="bg-gradient-to-b from-purple-600 to-pink-500 p-8 rounded-b-[50%] text-white text-center">
            <h2 className="text-2xl font-bold">Join</h2>
            <p className="text-sm mt-1">Create your account to get started!</p>
          </div>

          <div className="px-8 py-6 signup  ">
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => { setname(e.target.value) }}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                required={true}
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => { setemail(e.target.value) }}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                required={true}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => { setpassword(e.target.value) }}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                required={true}
              />
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPass}
                onChange={(e) => { setconfirmPass(e.target.value) }}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                required={true}
              />

              <div className="text-left text-sm text-red-500 ">
                {err}
              </div>

              <button
                type="submit"
                className="w-full disabled:bg-gradient-to-br  disabled:from-purple-500 disabled:to-pink-300 bg-gradient-to-br from-purple-600 to-pink-500  hover:bg-gradient-to-br  hover:from-purple-500 hover:to-pink-300 hover:cursor-pointer text-white font-bold py-2 rounded-full transition"
                disabled={confirmPass === password ? false : true}
              >
                Signup
              </button>

              <p className="text-center text-sm text-gray-400 mt-4">
                Already have an account?{' '}
                <span className="text-blue-500 cursor-pointer hover:underline">
                  <Link href="/login">Login</Link>
                </span>
              </p>
            </form>
          </div>
        </div>
      </div>}
    </>
  )
}

export default page