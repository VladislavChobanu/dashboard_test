import React from 'react';
import { Card, Avatar, Typography, Space, Divider } from 'antd';
import { UserOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';
import { useSpring, animated } from '@react-spring/web';

const { Title, Text } = Typography;

const UserCard = ({ user }) => {

  const animationProps = useSpring({
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
    config: { tension: 150, friction: 12 },
  });

  return (
    <animated.div style={animationProps}>
      <Card
        style={{
          width: 300,
          margin: '16px',
          borderRadius: '8px',
          overflow: 'hidden',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        }}
        cover={<img alt="avatar" src={user.avatar} />}
      >
        <Card.Meta
          avatar={<Avatar src={user.avatar} size={64} icon={<UserOutlined />} />}
          title={<Title level={4}>{`${user.firstName} ${user.secondName}`}</Title>}
          description={<Text type="secondary">{user.job} at {user.jobName}</Text>}
        />
        
        <Divider style={{ margin: '12px 0' }} />
        
        <Space direction="vertical" size="small" style={{ width: '100%' }}>
          <Text><UserOutlined /> Gender: {user.gender}</Text>
          <Text><MailOutlined /> Email: {user.email}</Text>
          <Text><PhoneOutlined /> Phone: {user.tel}</Text>
          <Text>Age: {user.age}</Text>
          <Text>Friends: {user.friends}</Text>
          <Text>Account created: {new Date(user.createdAt).toLocaleDateString()}</Text>
        </Space>
      </Card>
    </animated.div>
  );
};

export default UserCard;
