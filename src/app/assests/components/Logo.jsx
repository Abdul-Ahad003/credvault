import React from 'react'

const Logo = () => {

  return (
    <div className="logo font-bold md:text-3xl text-[20.5px] flex items-center md:gap-3 gap-1.5">
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 15 15"><path fill="currentColor" d="M11 11h-1v-1h1zm-3 0h1v-1H8zm5 0h-1v-1h1z"/><path fill="currentColor" fillRule="evenodd" d="M3 6V3.5a3.5 3.5 0 1 1 7 0V6h1.5A1.5 1.5 0 0 1 13 7.5v.55a2.5 2.5 0 0 1 0 4.9v.55a1.5 1.5 0 0 1-1.5 1.5h-10A1.5 1.5 0 0 1 0 13.5v-6A1.5 1.5 0 0 1 1.5 6zm1-2.5a2.5 2.5 0 0 1 5 0V6H4zM8.5 9a1.5 1.5 0 1 0 0 3h4a1.5 1.5 0 0 0 0-3z" clipRule="evenodd"/></svg>
        <div className='flex items-center'><span className=' font-extrabold flex items-center'> &lt;</span> <span className=' flex items-center'>CredVault</span> <span className=' font-extrabold flex items-center'> &gt;</span> </div></div>
        
  )
}

export default Logo