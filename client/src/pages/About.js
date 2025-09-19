import React from 'react';
import Layout from '../components/Layout/Layout';
import { NavLink } from "react-router-dom";

const About = () => {
  return (
    <Layout title={"About Us"}>
      <div className="container ">
        <div className="row align-items-center">
          <div className="col-md-6">
            <img 
              src="/image/Socsa.png" 
              alt="About Us" 
            style={{ width: '500px', height: '400px', objectFit: 'contain' }}
            />
          </div>
          <div className="col-md-6">
            <h1 className="text-primary mb-4 text-center">SOCSA</h1>
            <p className="fs-5" style={{ textAlign: "justify" }}>
              Welcome to our website! We are dedicated to providing always updated Information and services 
              tailored to meet your unique needs. With a commitment to excellence and a passion for 
              innovation, our team strives to deliver exceptional value and user satisfaction. 
              Explore our website and discover why we are the trusted choice for so many students.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
