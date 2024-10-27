import {  Menu } from 'antd'
import SubMenu from 'antd/es/menu/SubMenu'
import React from 'react'
import {  NavLink } from 'react-router-dom'

export default function Side() {
  return (
    <>
    <NavLink to='/dashboard'><h1 className='hover:scale-125 cursor-pointer text-white transition-all pt-[15px] flex justify-center hover:text-teal-500 text-xl font-bold'>Dashboard</h1></NavLink>
            <Menu style={{color:"white"}} theme='dark'>
              <Menu.Item><NavLink to='/dashboard'>Charts</NavLink></Menu.Item>
              <SubMenu title="Card Library">
              <Menu.ItemGroup title="Card Library">
                  <Menu.Item key="cards"><NavLink to='/'>Cards</NavLink></Menu.Item>
                  <Menu.Item key="list"><NavLink to='/list'>List</NavLink></Menu.Item>
                  <Menu.Item key="form"><NavLink to='/form'>Upload</NavLink></Menu.Item>
              </Menu.ItemGroup>
              </SubMenu>
            </Menu>
            </>
  )
}
