// pages/user/Feedback.js
import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout/Layout';
import UserMenu from '../../components/Layout/UserMenu';
import { useAuth } from '../../context/auth';
import axios from 'axios';
import { toast , ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from 'moment';
import { Modal } from 'antd';
import { AlertCircle, CheckCircle, Clock } from 'lucide-react';

const Feedback = () => {
  // States
  const [auth] = useAuth();
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [userFeedback, setUserFeedback] = useState([]);
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  // Get user's feedback history
  const getUserFeedback = async () => {
    try {
      const { data } = await axios.get("http://localhost:8080/api/v1/feedback/user-feedback");
      if (data?.success) {
        setUserFeedback(data.feedback);
      }
    } catch (error) {
      console.error(error);
      toast.error('Error fetching feedback history');
    }
  };

  useEffect(() => {
    getUserFeedback();
  }, []);

  // Handle feedback submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post("http://localhost:8080/api/v1/feedback/create", {
        subject,
        message,
      });

      if (data?.success) {
        toast.success('Feedback submitted successfully');
        setSubject('');
        setMessage('');
        getUserFeedback(); // Refresh feedback list
      }
    } catch (error) {
      console.error(error);
      toast.error('Error submitting feedback');
    } finally {
      setLoading(false);
    }
  };

  // Get status badge icon
  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <Clock style={{ color: 'orange' }} size={20} />;
      case 'resolved':
        return <CheckCircle style={{ color: 'green' }} size={20} />;
      case 'in-progress':
        return <AlertCircle style={{ color: 'red' }} size={20} />;
      default:
        return <CheckCircle style={{ color: 'gray' }} size={20} />;
    }
  };

  return (
    <Layout title="User Feedback - Dashboard">
      <div className="container-fluid p-3">
        <ToastContainer />
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            {/* Submit Feedback Section */}
            <div className="card mb-4">
              <div className="card-header bg-primary text-white">
                <h4>Submit New Feedback</h4>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Subject</label>
                    <input
                      type="text"
                      className="form-control"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      required
                      placeholder="Enter feedback subject"
                      minLength="5"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Message</label>
                    <textarea
                      className="form-control"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                      rows="4"
                      placeholder="Enter your feedback message"
                      minLength="10"
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? 'Submitting...' : 'Submit Feedback'}
                  </button>
                </form>
              </div>
            </div>

            {/* Feedback History Section */}
            <div className="card">
              <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
                <h4>Your Feedback History</h4>
                <span className="badge bg-light text-dark">
                  Total: {userFeedback.length}
                </span>
              </div>
              <div className="card-body">
                {userFeedback.length > 0 ? (
                  userFeedback.map((feedback) => (
                    <div
                      key={feedback._id}
                      className="border rounded p-3 mb-3 feedback-item"
                      style={{ cursor: 'pointer' }}
                      onClick={() => {
                        setSelectedFeedback(feedback);
                        setModalVisible(true);
                      }}
                    >
                      <div className="d-flex justify-content-between align-items-start">
                        <div>
                          <h5 className="mb-1">{feedback.subject}</h5>
                          <p className="text-muted mb-2">
                            {feedback.message.substring(0, 100)}
                            {feedback.message.length > 100 ? '...' : ''}
                          </p>
                        </div>
                        <div>{getStatusIcon(feedback.status)}</div>
                      </div>
                      <div className="text-muted">
                        Submitted: {moment(feedback.createdAt).format('MMMM Do YYYY, h:mm a')}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-4">
                    <p className="text-muted mb-0">No feedback submitted yet</p>
                  </div>
                )}
              </div>
            </div>

            {/* Feedback Detail Modal */}
            <Modal
              title="Feedback Details"
              visible={modalVisible}
              onCancel={() => setModalVisible(false)}
              footer={null}
            >
              {selectedFeedback && (
                <div>
                  <h5>{selectedFeedback.subject}</h5>
                  <div className="text-muted mb-3">
                    Status: {getStatusIcon(selectedFeedback.status)}
                    <span className="ms-2">{selectedFeedback.status.toUpperCase()}</span>
                  </div>
                  <div className="mb-3">
                    <strong>Your Message:</strong>
                    <p className="mt-2">{selectedFeedback.message}</p>
                  </div>
                  {selectedFeedback.response && (
                    <div className="mb-3">
                      <strong>Admin Response:</strong>
                      <p className="mt-2">{selectedFeedback.response}</p>
                    </div>
                  )}
                  <div className="text-muted">
                    <small>
                      Submitted: {moment(selectedFeedback.createdAt).format('MMMM Do YYYY, h:mm a')}
                    </small>
                    <br />
                    <small>
                      Last Updated: {moment(selectedFeedback.updatedAt).format('MMMM Do YYYY, h:mm a')}
                    </small>
                  </div>
                </div>
              )}
            </Modal>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Feedback;
