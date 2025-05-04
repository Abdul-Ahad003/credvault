"use client"
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Navbar from "./assests/components/Navbar";
import { FadeLoader } from "react-spinners";

export default function Home() {

  const router = useRouter()
  const [isLoggedIn, setisLoggedIn] = useState()

  const [loading, setLoading] = useState(true)

  const isUser = () => {
    if (localStorage.getItem('userId') != null) {
      setisLoggedIn(true)
      router.push(`/user/${localStorage.getItem('userId')}`)
    }
    else {
      setLoading(false)
      setisLoggedIn(false)
    }
  }

  useEffect(() => {
    isUser()
  }, [isLoggedIn])

  return (
    <>
      <Navbar />


      <div className="  text-gray-800">
        { loading == true && <div className=' relative  min-h-[85vh] '>
          <div className=' absolute top-1/2 md:left-1/2 left-[43vw] '>
            <FadeLoader
              color="#200838"
              height={20}
              loading={loading}
              margin={2}
              radius={2}
              speedMultiplier={1}
              width={25}
            />
          </div>
        </div> }

        {loading == false &&  <section className="flex flex-col items-center justify-center text-center px-4 py-12 ">
          <h2 className="text-2xl md:text-5xl font-extrabold mb-4 text-indigo-800">Securely Store & Manage Your Credentials</h2>
          <p className="max-w-xl md:text-lg text-[16px]  text-gray-800 mb-6">
            CredVault is your centralized vault for passwords, username and more. Access from anywhere with end-to-end encryption.
          </p>
          <div className="space-x-4">
            <Link href="/login"><button className="bg-gradient-to-br from-purple-700 to-pink-600  hover:bg-gradient-to-br  hover:from-purple-500 hover:to-pink-400 hover:cursor-pointer text-white md:px-6 md:py-3 px-4 py-2.5 rounded-xl text-lg shadow-md">Get Started</button></Link>
            <Link href="/signup"><button className="border border-indigo-600 text-indigo-600 hover:bg-indigo-50 md:px-6 md:py-3 px-4 py-2.5 rounded-xl text-lg">Learn More</button></Link>
          </div>
        </section> }

        {loading == false && <section id="features" className="px-6 py-10">
          <h3 className="text-3xl font-bold text-center text-indigo-800 mb-12">Features</h3>
          <div className="flex md:flex justify-around gap-8">
            <div className="bg-gradient-to-br from-purple-400 to-pink-200  hover:bg-gradient-to-br p-6 rounded-xl shadow">
              <h4 className="font-semibold text-xl mb-2">Password Vault</h4>
              <p className="text-gray-600">Store unlimited passwords with automatic encryption and categorization.</p>
            </div>
            <div className="bg-gradient-to-br from-purple-400 to-pink-200  hover:bg-gradient-to-br p-6 rounded-xl shadow">
              <h4 className="font-semibold text-xl mb-2">Multi-Device Sync</h4>
              <p className="text-gray-600">Access your vault from desktop, tablet, and mobile devices seamlessly.</p>
            </div>
          </div>
        </section> }

        <footer className="text-center text-sm text-black py-2 border-t">
          © {new Date().getFullYear()} CredVault. All rights reserved.
        </footer>
      </div>
    </>
  );
}
