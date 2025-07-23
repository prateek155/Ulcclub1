import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import axios from "axios";
import { toast , ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const JoinCommunity = () => {
  const [formData, setFormData] = useState({
    Name: "",
    email: "",
    phone: "",
    bio: "",
  });

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "https://ulcclub1.onrender.com/api/v1/community/create-member",
        formData
      );
      if (data?.success) {
        toast.success("You get confirmation mail after accepting you");
        setFormData({
          Name: "",
          email: "",
          phone: "",
          bio: "",
        });
      }
    } catch (error) {
      console.error("Error adding community member:", error);
      toast.error("Error adding community member");
    }
  };

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Layout title={"Join Our Club"}>
      <div className="container-fluid">
        <ToastContainer />
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            {/* Header Section */}
            <div className="text-center mb-5">
              <h1 className="display-4 fw-bold text-dark mb-3">
                Join Our Club
              </h1>
              <div className="border-bottom border-primary border-3 w-25 mx-auto mb-4"></div>
              <p className="text-muted fs-5">
                Become part of our growing network and your information always encripted 
              </p>
            </div>

            {/* Main Form Card */}
            <div className="card shadow-lg rounded-4 mb-5">
              <div className="card-header bg-light py-4 border-bottom">
                <h2 className="card-title h4 fw-semibold text-dark mb-1">
                  Request Detail's
                </h2>
                <p className="text-muted mb-0">
                  Please fill in your details below
                </p>
              </div>

              <div className="card-body p-4">
                <form onSubmit={handleSubmit} className="row g-4">
                  {/* Name and Email Section */}
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="form-label fw-medium mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="Name"
                        value={formData.Name}
                        onChange={handleChange}
                        className="form-control form-control-lg rounded-3"
                        placeholder="John Doe"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="form-label fw-medium mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="form-control form-control-lg rounded-3"
                        placeholder="john@example.com"
                        required
                      />
                    </div>
                  </div>

                  {/* Phone and Experience Section */}
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="form-label fw-medium mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="form-control form-control-lg rounded-3"
                        placeholder="+1 (555) 000-0000"
                        required
                      />
                    </div>
                  </div>
                  {/* Bio Section */}
                  <div className="col-12">
                    <div className="form-group">
                      <label className="form-label fw-medium mb-2">
                        Tell Us Why to create your own library in some words.
                      </label>
                      <textarea
                        name="bio"
                        value={formData.bio}
                        onChange={handleChange}
                        className="form-control form-control-lg rounded-3"
                        rows="4"
                        placeholder="Share your interests, goals, and what brings you to our community..."
                        required
                      ></textarea>
                    </div>
                  </div>
                  {/* Submit Button Section */}
                  <div className="col-12 mt-4">
                    <button
                      type="submit"
                      className="btn btn-primary btn-lg w-100 rounded-3 py-3"
                    >
                      Submit Application
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default JoinCommunity;
