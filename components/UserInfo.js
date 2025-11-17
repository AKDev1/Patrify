"use client"
import React, { useEffect, useState } from 'react'
import PaymentInfo from './PaymentInfo'
import { useSession } from 'next-auth/react'
import { fetchUser } from '@/actions/dbActions'

const UserInfo = ({ username }) => {
  const { data: session, status } = useSession();
  const [currProfileView, setCurrProfileView] = useState({})

  useEffect(() => {
    getUserData();
  }, [username]);

  const getUserData = async () => {
    const userData = await fetchUser(username);
    setCurrProfileView(userData);
  }

  if (status === "loading") {
    return <div>Loading...</div>
  }
  return (
    <>
      <div className=' flex justify-center'>
        <div className="cover-container w-full overflow-hidden  md:min-h-60 max-h-120">
          <img src={currProfileView.coverPic} alt="alt"
            className='w-full' />
        </div>
      </div>
      <div className="profile flex flex-col items-center relative mb-10">
        <div className="pfp-container mt-[-25] md:mt-[-75] overflow-hidden">
          <img src={currProfileView.profilePic} alt=""
            width={150} height={150}
            className='border border-neutral-700 rounded-full' />
        </div>
        {/* <div className="options flex absolute right-5 top-2.5">
          <h1>opt1</h1>
          <h1>opt2</h1>
        </div> */}
        <div className="info flex flex-col items-center my-5 gap-2">
          <h1 className='title text-4xl font-bold'>@{username}</h1>
          <h1 className='desc text-sm font-medium'>Support <b>{username}</b> by becoming their patron</h1>
          <div className="stats flex justify-around text-sm text-neutral-500 font-semibold">
            <div>8 payments&nbsp;</div>
            <div>• ₹17,680 raised</div>
          </div>
        </div>
        <PaymentInfo username={username} currProfileView={currProfileView} />
      </div>
    </>
  )
}

export default UserInfo
