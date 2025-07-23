import React, { useState, useEffect } from 'react';
import { Table, Tag, Space, Button, Modal, Select, Input, message } from 'antd';
import axios from 'axios';

const { TextArea } = Input;
const { Option } = Select;

const FeedbackManagement = () => {
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [response, setResponse] = useState('');
  const [status, setStatus] = useState('');

  const fetchFeedback = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("https://ulcclub1.onrender.com/api/v1/feedback/all");
      if (data.success) {
        setFeedback(data.feedback);
      }
    } catch (error) {
      console.error(error);
      message.error('Error fetching feedback');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedback();
  }, []);

  const handleUpdateStatus = async () => {
    try {
      const { data } = await axios.put(`https://ulcclub1.onrender.com/api/v1/feedback/update-status/${selectedFeedback._id}`, {
        status,
        response
      });
      
      if (data.success) {
        message.success('Feedback updated successfully');
        setIsModalVisible(false);
        fetchFeedback();
      }
    } catch (error) {
      console.error(error);
      message.error('Error updating feedback');
    }
  };

  const columns = [
    {
      title: 'Subject',
      dataIndex: 'subject',
      key: 'subject',
    },
    {
      title: 'User',
      dataIndex: 'userName',
      key: 'userName',
    },
    {
      title: 'Priority',
      dataIndex: 'priority',
      key: 'priority',
      render: (priority) => (
        <Tag color={
          priority === 'high' ? 'red' :
          priority === 'medium' ? 'orange' : 'green'
        }>
          {priority.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={
          status === 'pending' ? 'orange' :
          status === 'in-progress' ? 'blue' : 'green'
        }>
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <Space>
          <Button 
            type="primary"
            onClick={() => {
              setSelectedFeedback(record);
              setStatus(record.status);
              setResponse(record.response || '');
              setIsModalVisible(true);
            }}
          >
            Update
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <h1>Feedback Management</h1>
      
      <Table
        columns={columns}
        dataSource={feedback}
        loading={loading}
        rowKey="_id"
      />

      <Modal
        title="Update Feedback"
        visible={isModalVisible}
        onOk={handleUpdateStatus}
        onCancel={() => setIsModalVisible(false)}
      >
        <div style={{ marginBottom: 16 }}>
          <p><strong>Subject:</strong> {selectedFeedback?.subject}</p>
          <p><strong>Message:</strong> {selectedFeedback?.message}</p>
        </div>

        <Select
          style={{ width: '100%', marginBottom: 16 }}
          value={status}
          onChange={(value) => setStatus(value)}
        >
          <Option value="pending">Pending</Option>
          <Option value="in-progress">In Progress</Option>
          <Option value="resolved">Resolved</Option>
        </Select>

        <TextArea
          rows={4}
          value={response}
          onChange={(e) => setResponse(e.target.value)}
          placeholder="Enter response to feedback"
        />
      </Modal>
    </div>
  );
};

export default FeedbackManagement;
