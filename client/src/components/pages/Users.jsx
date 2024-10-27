import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import UserCard from '../ui/UserCard'
import { Spin } from 'antd'


async function fetchUsers() {
    const { data } = await axios.get('http://localhost:3000/api/users')
    return data
}

export default function Users() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers
  })

  if (isLoading) {
    return  <Spin tip="Loading" size="large" />
  }

  if (isError) {
    return <h1>Error...</h1>
  }

  if (!data) {
    return <h1>No data</h1>
  }

  return (
    <div className='flex flex-wrap gap-8'>
      {data.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  )
}
