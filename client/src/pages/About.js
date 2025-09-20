import React from 'react';
import Layout from '../components/Layout/Layout';

const About = () => {
  return (
    <Layout title={"About Us"}>
      <div className="container-fluid p-0">
        <div className="row align-items-center g-0 flex-column flex-md-row">
          <div className="col-12 col-md-6 text-center">
            <img 
              src="/image/Socsa.png" 
              alt="About Us" 
            style={{ maxWidth: '100%', height: 'auto', objectFit: 'contain' }}
            />
          </div>
          <div className="col-12 col-md-6 p-4">
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
