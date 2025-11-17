import React from 'react'

const Footer = () => {
  return (
    <footer className='bg-black/25 text-white flex justify-center p-5'>
      <p className='font-bold'>Copyright &copy; {new Date().getFullYear()} Patrify - Fund your projects</p>
    </footer>
  )
}

export default Footer
