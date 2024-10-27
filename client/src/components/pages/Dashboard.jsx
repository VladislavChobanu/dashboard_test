import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend
} from 'recharts';
import { PieChart, Pie, Cell } from 'recharts';
import { Spin, Card, Typography, Row, Col } from 'antd';

const { Title } = Typography;

async function fetchUsers() {
  const { data } = await axios.get('http://localhost:3000/api/users');
  return data;
}

export default function Dashboard() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });

  if (isLoading) {
    return <Spin tip="Loading" size="large" />;
  }

  if (isError) {
    return <h1>Error...</h1>;
  }

  if (!data) {
    return <h1>No data...</h1>;
  }

  const friendsData = data.map(user => ({
    age: user.age,
    friends: user.friends,
  }));

  const genderCount = data.reduce((acc, user) => {
    acc[user.gender] = (acc[user.gender] || 0) + 1;
    return acc;
  }, {});

  const genderData = Object.keys(genderCount).map(key => ({
    name: key,
    value: genderCount[key],
  }));

  return (
    <div style={{ padding: '20px' }}>
      <Row gutter={16}>
        <Col span={12}>
          <Card title={<Title level={3}>Friends by age</Title>} bordered>
            <LineChart width={600} height={300} data={friendsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="age" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="friends" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
          </Card>
        </Col>
        <Col span={12}>
          <Card title={<Title level={3}>Stats by gender</Title>} bordered>
            <PieChart width={600} height={300}>
              <Pie
                data={genderData}
                cx={300}
                cy={150}
                labelLine={false}
                label={entry => entry.name}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {genderData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#82ca9d' : '#8884d8'} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
