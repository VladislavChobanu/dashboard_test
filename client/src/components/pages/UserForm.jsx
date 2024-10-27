import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { Form, Input, Button, Radio, InputNumber, Typography, message } from 'antd';

const { Title } = Typography;

async function createUser(userData) {
  const { data } = await axios.post('http://localhost:3000/api/users/add', userData);
  return data;
}

export default function UserForm() {
  const queryClient = useQueryClient();
  const [form] = Form.useForm();

  const mutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries(['users']);
    },
    onError: () => {
      message.error('Failed to create user');
    },
  });

  const validateFormValues = (values) => {
    if (!values.firstName || values.firstName.trim() === "") {
      message.warning("First Name is required");
      return false;
    }
    if (!values.secondName || values.secondName.trim() === "") {
      message.warning("Second Name is required");
      return false;
    }
    if (typeof values.age !== "number" || values.age <= 0 || values.age > 120) {
      message.warning("Age must be a number between 1 and 120");
      return false;
    }
    if (!["male", "female"].includes(values.gender)) {
      message.warning("Gender is required");
      return false;
    }
    if (!values.email || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(values.email)) {
      message.warning("Valid email is required");
      return false;
    }
    if (!values.tel || !/^\+?\d{10,15}$/.test(values.tel)) {
      message.warning("Valid phone number is required");
      return false;
    }
    if (!values.job || values.job.trim() === "") {
      message.warning("Job is required");
      return false;
    }
    if (!values.jobName || values.jobName.trim() === "") {
      message.warning("Job Title is required");
      return false;
    }
    if (typeof values.friends !== "number" || values.friends < 0) {
      message.warning("Friends Count must be a non-negative number");
      return false;
    }
    if (!values.avatar || !/^https?:\/\/\S+\.\S+$/.test(values.avatar)) {
      message.warning("Valid Avatar URL is required");
      return false;
    }
    return true;
  };

  const onFinish = (values) => {
    if (validateFormValues(values)) {
      mutation.mutate(values);
      form.resetFields();
      message.success('User successfylly created');
    }
    else {
        message.error('Failed to create user');
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: '20px' }}>
      <Title level={3}>Add New User</Title>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          gender: 'male',
        }}
      >
        <Form.Item label="First Name" name="firstName" rules={[{ required: true, message: 'Please input the first name!' }]}>
          <Input placeholder="First Name" />
        </Form.Item>

        <Form.Item label="Second Name" name="secondName" rules={[{ required: true, message: 'Please input the second name!' }]}>
          <Input placeholder="Second Name" />
        </Form.Item>

        <Form.Item label="Age" name="age" rules={[{ required: true, message: 'Please input the age!' }]}>
          <InputNumber min={1} max={120} placeholder="Age" style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item label="Gender" name="gender" rules={[{ required: true, message: 'Please select the gender!' }]}>
          <Radio.Group>
            <Radio value="male">Male</Radio>
            <Radio value="female">Female</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email', message: 'Please input a valid email!' }]}>
          <Input placeholder="Email" />
        </Form.Item>

        <Form.Item label="Phone Number" name="tel" rules={[{ required: true, message: 'Please input the phone number!' }]}>
          <Input placeholder="Phone Number" />
        </Form.Item>

        <Form.Item label="Job" name="job" rules={[{ required: true, message: 'Please input the job!' }]}>
          <Input placeholder="Job" />
        </Form.Item>

        <Form.Item label="Job Title" name="jobName" rules={[{ required: true, message: 'Please input the job title!' }]}>
          <Input placeholder="Job Title" />
        </Form.Item>

        <Form.Item label="Friends Count" name="friends" rules={[{ required: true, message: 'Please input friends count!' }]}>
          <InputNumber min={0} placeholder="Friends Count" style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item label="Avatar URL" name="avatar" rules={[{ required: true, message: 'Please input the avatar URL!' }]}>
          <Input placeholder="Avatar URL" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={mutation.isLoading}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
