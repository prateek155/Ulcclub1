import React from 'react';
import Layout from '../components/Layout/Layout';

const About = () => {
  return (
    <Layout title={"About Us"}>
      <div className="container-fluid m-0 p-0">
        <div className="row g-0 min-vh-100 align-items-center">
          {/* Image Section */}
          <div className="col-12 col-lg-6 d-flex justify-content-center align-items-center p-3 p-md-4 p-lg-5">
            <div className="w-100 text-center">
              <img 
                src="/image/Socsa.png" 
                alt="About Us" 
                className="img-fluid"
                style={{ 
                  maxWidth: '100%', 
                  height: 'auto',
                  maxHeight: '400px',
                  objectFit: 'contain'
                }}
              />
            </div>
          </div>
          
          {/* Content Section */}
          <div className="col-12 col-lg-6 d-flex align-items-center p-3 p-md-4 p-lg-5">
            <div className="w-100">
              <h1 className="text-primary mb-3 mb-md-4 text-center text-lg-start display-4 display-md-3 display-lg-2">
                SOCSA
              </h1>
              <p className="fs-6 fs-md-5 fs-lg-4 lh-base" style={{ textAlign: "justify" }}>
                Welcome to our website! We are dedicated to providing always updated Information and services 
                tailored to meet your unique needs. With a commitment to excellence and a passion for 
                innovation, our team strives to deliver exceptional value and user satisfaction. 
                Explore our website and discover why we are the trusted choice for so many students.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Custom CSS for additional responsiveness */}
      <style jsx>{`
        @media (max-width: 575.98px) {
          .display-4 {
            font-size: 2rem !important;
          }
          .fs-6 {
            font-size: 0.9rem !important;
          }
        }
        
        @media (min-width: 576px) and (max-width: 767.98px) {
          .display-4 {
            font-size: 2.5rem !important;
          }
        }
        
        @media (min-width: 768px) and (max-width: 991.98px) {
          .display-3 {
            font-size: 3rem !important;
          }
        }
        
        @media (min-width: 992px) {
          .display-2 {
            font-size: 3.5rem !important;
          }
        }
        
        .min-vh-100 {
          min-height: 100vh;
        }
        
        .row {
          margin: 0 !important;
        }
        
        .container-fluid {
          padding: 0 !important;
        }
      `}</style>
    </Layout>
  );
};

export default About;
