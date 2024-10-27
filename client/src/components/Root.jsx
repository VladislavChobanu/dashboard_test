import {  Layout } from 'antd';
import Sider from 'antd/es/layout/Sider';
import {  Outlet } from 'react-router-dom';
import { Content, Header } from 'antd/es/layout/layout';
import Side from './ui/Side';
import Head from './ui/Head';

export default function Root() {
  return (
    <Layout> 
      
        <Sider >
            <Side />
        </Sider>
      <Layout>
      <Header><Head/></Header>
      <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: "100vh",
            background: "white",
          }}
        >
          <Outlet />
        </Content>
        </Layout>
    </Layout>
  )
}
