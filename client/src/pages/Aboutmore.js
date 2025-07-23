import React from 'react';
import Layout from '../components/Layout/Layout';

const AboutMore = () => {
  return (
    <Layout title={"About More"}>
      <div className="container my-5">
        {/* Centered heading */}
        <div className="text-center mb-5">
          <h1 className="text-primary">Core Member's</h1>
          <p className=" fs-5">
            Dive deeper into our journey and explore what makes us unique.
          </p>
        </div>
        {/* Alternate sections */}
        <div className="row align-items-center mb-5">
          <div className="col-md-6">
            <h3>Arpit Ingle</h3>
            <h4>President </h4>
            <p className="fs-5">
             student of TY-BCA with a strong grounding in math and ML. 
             He leads our club, organizes talks, and builds tools, experiments, and demos that bridge research and real-world impact. 
             His interests span reinforcement learning, generative models and HCI. Outside code, he obsesses over art, 
             architecture, and philosophy.
            </p>
          </div>
          <div className="col-md-6">
          <a href="https://x.com/arpitingle" target="_blank" rel="noopener noreferrer">
            <img
              src="/image/arpit.png"
              alt="Our Mission"
              className="img-fluid rounded shadow"
            />
            </a>
          </div>
        </div>
        <div className="row align-items-center mb-5">
          <div className="col-md-6 order-md-2">
            <h3>Sarthak Thakur</h3>
            <h4>Vice President</h4>
            <p className="fs-5">
              Co-founder of the Unsupervised Learners Club (ULC), where I actively contribute to building a strong AI community.
               Currently, I’m focused on learning, experimenting, and creating projects in AI and Machine Learning. I’m passionate
                about transforming ideas into real-world solutions through collaboration and innovation.
            </p>
          </div>
          <div className="col-md-6 order-md-1">
             <a href="http://www.linkedin.com/in/sarthak-thakur" target="_blank" rel="noopener noreferrer">
            <img
              src="/image/sarthak1.jpg"
              alt="Innovation"
              className="img-fluid rounded shadow"
              style={{ width: '400px', height: 'auto' }}
            />
            </a>
          </div>
        </div>
        <div className="row align-items-center mb-5">
          <div className="col-md-6">
            <h3>Prateek Agrawal</h3>
            <h4>Tressurer</h4>
            <p className="fs-5">
              student of TY-BCA student with a sharp eye for frontend and full-stack web development. 
              He builds fast, responsive, and clean web apps, and handles everything from UI to deployment with ease. 
              At the club, he ensures our projects and platforms run smoothly and look great. When not coding, he’s usually exploring
               new frameworks or perfecting pixel alignment.
            </p>
          </div>
          <div className="col-md-6">
            <a href="https://www.instagram.com/prateek1052a?igsh=MXd0aHY3YjhxbzR6Zg==" target="_blank" rel="noopener noreferrer">
            <img
              src="/image/prateek.jpg"
              alt="Collaboration"
              className="img-fluid rounded shadow"
              style={{ width: '400px', height: 'auto' }}
            />
            </a>
          </div>
        </div>
        <div className="row align-items-center mb-5">
          <div className="col-md-6 order-md-2">
            <h3>Sohan Bibave</h3>
            <h4>Secretory</h4>
            <p className="fs-5">
             student of TY-BCA the Secretary of the Unsupervised Learners Club at MIT WPU. In my role, I handle the administrative and 
             communication duties that keep our club running smoothly. I organize meetings, maintain records, share important updates, 
             and support the coordination of events and activities. My goal is to ensure clear communication and structured collaboration 
             among members, helping create an engaging space for students passionate about self-driven and curiosity-led learning.
            </p>
          </div>
          <div className="col-md-6 order-md-1">
            <a href="https://www.instagram.com/sohan_weird?igsh=MWtjbmdhdnMyeG5jMA==" target="_blank" rel="noopener noreferrer">
            <img
              src="/image/sohan.jpg"
              alt="Innovation"
              className="img-fluid rounded shadow"
              style={{ width: '400px', height: 'auto' }}
            />
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AboutMore;
