"use client"
import Logo from '@/app/assests/components/Logo'
import { useRef, useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import Navbar from '@/app/assests/components/Navbar'
import { FadeLoader } from "react-spinners";
import toast, { Toaster } from 'react-hot-toast';

const page = () => {

    const params = useParams()
    const router = useRouter()

    const ref = useRef()
    const passref = useRef()
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordarray, setpasswordarray] = useState([])

    const [isLoggedIn, setisLoggedIn] = useState()
    const [loading, setLoading] = useState(false)

    const getPassword = async () => {
        let a = await fetch('/api/allcredentials', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId: params.userId })
        })

        const data = await a.json()
        setpasswordarray(data.allCredential)
    }

    const showPassword = () => {
        if (passref.current.type === 'password') {
            passref.current.type = 'text'
            ref.current.src = '../eye.svg'
        }
        else {
            passref.current.type = 'password'
            ref.current.src = '../eye-slash.svg'
        }
    }


    const handleSubmit = async () => {

        form.site = form.site.startsWith('https://') ? form.site : 'https://' + form.site
        
        setpasswordarray([...passwordarray, { ...form }])
        let a = await fetch('/api/savecredentials', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                form: form,
                userId: params.userId,
            }),
        })

        let data = await a.json()

        if (data.success) {
            setform({ site: "", username: "", password: "" })
            toast.success('Success')
        }
        else {
            console.log(data.message)
            toast.error("Error")
        }
    }

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    const copyText = (data) => {
        navigator.clipboard.writeText(data)
    }


    const deletePassword = async (Id) => {

        let a = await fetch("/api/deletecredential", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userId: params.userId,
                Id: Id
            })
        })

        let b = await a.json()
        if (b.success) {
            setpasswordarray(passwordarray.filter(item => { return item._id !== Id }))
            toast.success('Success')
        }
        else {
            console.log('err');
            toast.error("Error")
        }
    }

    const editPassword = async (Id) => {


        let a = await fetch("/api/deletecredential", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userId: params.userId,
                Id: Id
            })
        })

        let b = await a.json()
        if (b.success) {
            setform({ ...passwordarray.filter(item => { return item._id === Id })[0] })

            setpasswordarray(passwordarray.filter(item => { return item._id !== Id }))
        }
        else {
            console.log('err')
            toast.error("Error")
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
        getPassword()
        setUser()
    }, [])



    return (
        <>
            <Navbar setLoading={setLoading} />
            <div><Toaster /></div>
            {loading == true && <div className=' relative  min-h-[85vh] '>
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
            </div>}
            {isLoggedIn && <div className='' >
                <div className="md:flex min-h-[89.25vh] md:py-8 md:px-20 text-black ">
                    <div className='bg-purple-100 py-6 md:w-[80vw] mx-auto'>
                        <div className='flex justify-center text-black mb-2'> <Logo /> </div>
                        <p className='text-center'>manage your credentials with ease</p>
                        <div className='flex flex-col justify-center p-4 font-sans '>
                            <input onChange={handleChange} name='site' value={form.site} className='rounded-full my-3 py-1 md:px-5 px-3.5 border-purple-700 border-[2px] outline-none' placeholder='Enter Website URL' type='url' required={true}></input>
                            <div className='flex md:gap-6 gap-2' >
                                <div className=' w-full'><input name='username' value={form.username} onChange={handleChange} className='rounded-full my-3 py-1 md:px-5 px-3.5 w-full border-purple-700 border-[2px] outline-none' placeholder='Enter Username' type='text' required={true}></input></div>
                                <div className=' relative w-full'><input name='password' ref={passref} value={form.password} onChange={handleChange} className='rounded-full my-3 py-1 md:pl-5 md:pr-9 pl-3.5 pr-9  w-full border-purple-700 border-[2px] outline-none' placeholder='Enter Password' type='password' required={true}></input>
                                    <span className=' cursor-pointer absolute z-10 right-3  top-5'> <img ref={ref} onClick={showPassword} src='../eye.svg' alt='' name='show' className=' md:w-[24px] md:h-[24px] w-[20px] h-[20px]'></img></span></div>
                            </div>
                        </div>
                        <div className='flex justify-center font-semibold'>
                            <button onClick={handleSubmit} className='flex items-center gap-1.5 w-fit cursor-pointer bg-purple-600 hover:bg-purple-500 rounded-3xl px-4 py-1.5'>
                                <lord-icon
                                    src="https://cdn.lordicon.com/jgnvfzqg.json"
                                    trigger="hover">
                                </lord-icon>
                                <span>Save</span>
                            </button>
                        </div>
                        <div className=' md:px-8 px-2.5 py-3'>
                            <h1 className='text-2xl font-semibold py-3 my-2'>Your Credentials </h1>
                            <div >
                                {passwordarray.length == 0 && <div>No Credentials to show ! </div>}
                                {passwordarray.length != 0 && <table className="table-auto bg-purple-200 w-full rounded-lg overflow-hidden">
                                    <thead className=' bg-purple-700'>
                                        <tr>
                                            <th className=' text-[14px] max-w-[31%]  py-2.5'>Site</th>
                                            <th className=' text-[14px] max-w-[26%]  py-2.5'>Username</th>
                                            <th className=' text-[14px] max-w-[26%]  py-2.5'>Password</th>
                                            <th className=' text-[14px] max-w-[17%]  py-2.5'>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            passwordarray.length != 0 ? passwordarray.map(item =>

                                                <tr key={item._id}>
                                                    <td className='py-2  px-1 md:text-[16px] text-[14px]  max-w-[35%]'>
                                                        <div className='flex items-center justify-center break-all   '>
                                                            <div className='flex items-center gap-2 cursor-pointer' onClick={() => { copyText(item.site) }}>
                                                                <span><a className='hover:text-blue-600 underline hover:decoration-blue-600 ' href={item.site} target='_blank'>{item.site}</a></span>

                                                                <span className='mt-1'><lord-icon
                                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                                    trigger="hover"
                                                                    style={{ width: "20px", height: "20px", marginTop: "6px" }}>
                                                                </lord-icon></span>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className='py-2 px-1 md:text-[16px] text-[14px]  max-w-[24%] '>
                                                        <div className='flex items-center justify-center break-all '>
                                                            <div className='flex items-center gap-2 cursor-pointer' onClick={() => { copyText(item.username) }}>
                                                                <span>{item.username}</span>
                                                                <span className=' mt-1'><lord-icon
                                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                                    trigger="hover"
                                                                    style={{ width: "20px", height: "20px", marginTop: "6px" }}>
                                                                </lord-icon></span>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className='py-2 px-1  md:text-[16px] text-[14px] max-w-[24%]'>
                                                        <div className='flex items-center justify-center break-all '>
                                                            <div className='flex items-center gap-2 cursor-pointer' onClick={() => { copyText(item.password) }}>
                                                                <span>{"*".repeat(item.password.length)}</span>
                                                                <span className=' mt-2'><lord-icon
                                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                                    trigger="hover"
                                                                    style={{ width: "20px", height: "20px", marginTop: "6px" }}>
                                                                </lord-icon></span>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className='py-2 px-1  md:text-[16px] text-[14px] max-w-[17%]' >
                                                        <div className='flex items-center justify-center '>
                                                            <span className='cursor-pointer mx-1' onClick={() => { editPassword(item._id) }}>
                                                                <lord-icon
                                                                    src="https://cdn.lordicon.com/gwlusjdu.json"
                                                                    trigger="hover"
                                                                    style={{ "width": "25px", "height": "25px" }}>
                                                                </lord-icon>
                                                            </span>
                                                            <span className='cursor-pointer mx-1' onClick={() => { deletePassword(item._id) }}>
                                                                <lord-icon
                                                                    src="https://cdn.lordicon.com/skkahier.json"
                                                                    trigger="hover"
                                                                    style={{ "width": "25px", "height": "25px" }}>
                                                                </lord-icon>
                                                            </span>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ) : <div>no</div>
                                        }
                                    </tbody>
                                </table>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>}
        </>
    )
}

export default page