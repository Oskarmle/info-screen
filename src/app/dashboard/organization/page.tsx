import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import React from 'react'

const Page = async () => {
  const session = await auth();
  if (!session) redirect("/sign-in");

  return (
    <div>page</div>
  )
}

export default Page