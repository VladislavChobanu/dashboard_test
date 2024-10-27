import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react';
import { Table, Avatar, Tag, Space, Modal, Typography } from 'antd';
import { animated, useSpring } from '@react-spring/web';


const { Title, Text } = Typography;

async function fetchUsers() {
  const { data } = await axios.get('http://localhost:3000/api/users');
  return data;
}



export default function UsersTable() {
const animationProps = useSpring({
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
    config: { tension: 150, friction: 12 },
  });

  const { data, isLoading, isError } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const showModal = (user) => {
    setSelectedUser(user);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedUser(null);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <h1>Error...</h1>;
  }

  const columns = [
    {
      title: '#',
      key: 'index',
      render: (text, record, index) => index + 1,
      width: '5%',
    },
    {
      title: 'User Profile',
      key: 'avatar',
      render: (_, record) => (
        <Space>
          <Avatar src={record.avatar} size={40} />
          <div>
            <strong>{record.firstName} {record.secondName}</strong>
            <br />
            <a href={`mailto:${record.email}`}>{record.email}</a>
          </div>
        </Space>
      ),
      width: '25%',
    },
    {
      title: 'Job',
      dataIndex: 'jobName',
      key: 'jobName',
      width: '20%',
    },
    {
      title: 'Friends',
      dataIndex: 'friends',
      key: 'friends',
      width: '10%',
    },
    {
      title: 'Status',
      key: 'status',
      render: (record) => {
        const status = record.friends > 200 ? 'Active' : 'Pending';
        const color = status === 'Active' ? 'green' : 'orange';
        return <Tag color={color}>{status}</Tag>;
      },
      width: '10%',
    },
  ];

  return (
    <>
    <animated.div style={animationProps}>
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        bordered
        rowKey="email"
        onRow={(record) => ({
          onClick: () => showModal(record),
        })}
        rowClassName="user-table-row"
      />
    </animated.div>
      <Modal
        title="User Information"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        centered
      >
        {selectedUser && (
          <div style={{ textAlign: 'center' }}>
            <Avatar src={selectedUser.avatar} size={64} style={{ marginBottom: '16px' }} />
            <Title level={4}>{selectedUser.firstName} {selectedUser.secondName}</Title> <br />
            <Text ><strong>Gender:</strong> <Text code className={selectedUser.gender === "male" ? 'text-cyan-500' : 'text-pink-600'}>{selectedUser.gender}</Text></Text><br />
            <Text><strong>Email:</strong> {selectedUser.email}</Text>
            <br />
            <Text><strong>Job:</strong> {selectedUser.jobName}</Text>
            <br />
            <Text><strong>Friends:</strong> {selectedUser.friends}</Text>
            <br />
            <Text>
              <strong>Status:</strong> 
              <Tag color={selectedUser.friends > 200 ? 'green' : 'orange'} style={{ marginLeft: '8px' }}>
                {selectedUser.friends > 200 ? 'Active' : 'Pending'}
              </Tag>
            </Text>
          </div>
        )}
      </Modal>
    </>
  );
}
