import { Avatar } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import React from 'react'

export default function Head() {
  return (
    <div className='flex pt-[15px] content-center justify-end'>
        <Avatar icon={<UserOutlined />} className='cursor-pointer hover:scale-125 transition-all hover:text-teal-500'/>
    </div> 
  )
}
