import { fetchUser } from '@/actions/dbActions';
import UserInfo from '@/components/UserInfo';
import { useSession } from 'next-auth/react';
import { notFound } from 'next/navigation';
import React from 'react'

const Username = async ({ params }) => {
  const { username } = await params;

  const user = await fetchUser(username);
  if(!user){
    return notFound();
  }
  // const {data: session, status} = useSession();
  return (
    <>
      <UserInfo username={username} />
    </>
  )
}

export default Username

export async function generateMetadata({params}){
  const { username } = await params;
  return {
    title: `${username} - Patrify`,
  }
}

