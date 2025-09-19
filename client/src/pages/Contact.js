import React from 'react';
import Layout from '../components/Layout/Layout';
import { Send, PhoneCall } from "lucide-react";
import { Link } from "react-router-dom";

const Contact = () => {
  return (
    <Layout title={"Contact Us"}>
      {/* The container class has been changed to container-fluid
         and the py-5 (padding-y) class has been removed to reduce vertical space */}
      <div className="container-fluid p-0">
        <div className="row justify-content-center m-0">
          {/* Left Section: Image */}
          <div className="col-md-6 p-0 mb-4">
            <img 
              src="/image/contactus.jpeg" 
              alt="Contact Us" 
              className="img-fluid rounded shadow-lg w-100"
              style={{ maxHeight: "350px", objectFit: "cover" }} 
            />
          </div>

          {/* Right Section: Contact Information */}
          <div className="col-md-6">
            <div className="card p-4 shadow-lg">
              <h2 className="text-center mb-4" style={{ color: "#007bff" }}>Contact Us</h2>
              <p className="lead text-justify mb-4">
                Have any queries or need information about this? Feel free to contact us anytime. We are available 24/7 to assist you.
              </p>
              <div className="contact-method mb-3">
                <p className="d-flex align-items-center">
                  <Send size={24} className="me-3" style={{ color: "#007bff" }} />
                  <span>Email: <a href="mailto:unsupervisedlearnersclub@mitwpu.edu.in" className="text-decoration-none">unsupervisedlearnersclub@mitwpu.edu.in</a></span>
                </p>
              </div>
              <div className="contact-method mb-3">
                <p className="d-flex align-items-center">
                  <PhoneCall size={24} className="me-3" style={{ color: "#007bff" }} />
                  <span>Phone: <a href="tel:+917627073230,9175185122" className="text-decoration-none">7627073230,9175185122</a></span>
                </p>
              </div>
              <div className="text-center">
                <Link to="https://chat.whatsapp.com/KJkyZRZCRr5LKIGlge6pOe"
                  className="btn btn-primary btn-lg" style={{ borderRadius: "50px" }}>
                  Get In Touch
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
