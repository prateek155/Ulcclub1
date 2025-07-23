import React from 'react';
import Layout from '../components/Layout/Layout';
import { NavLink } from "react-router-dom";

const About = () => {
  return (
    <Layout title={"About Us"}>
      <div className="container my-5">
        <div className="row align-items-center">
          <div className="col-md-6">
            <img 
              src="/image/poster.jpg" 
              alt="About Us" 
            style={{ width: '700px', height: '400px', objectFit: 'contain' }}
            />
          </div>
          <div className="col-md-6">
            <h1 className="text-primary mb-4 text-center">ULC Club</h1>
            <p className="fs-5 ">
              Welcome to our website! We are dedicated to providing always updated Information and services 
              tailored to meet your unique needs. With a commitment to excellence and a passion for 
              innovation, our team strives to deliver exceptional value and user satisfaction. 
              Explore our website and discover why we are the trusted choice for so many students.
            </p>
            <div className="d-flex justify-content-center mt-4">
               <NavLink to="/About-more"
               className="btn btn-outline-primary btn-lg me-3">Learn More
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
