import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Pagenotfound from "./pages/Pagenotfound";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import Dashboard from "./pages/user/Dashboard";
import PrivateRoute from "./components/Routes/Private";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import AdminRoute from "./components/Routes/AdminRoutes";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import CreateProduct from "./pages/Admin/CreateProduct";
import User from "./pages/Admin/Users";
import JoinCommunity from "./pages/user/JoinCommunity";
import Products from "./pages/Admin/Products";
import "./App.css";
import AboutMore from "./pages/Aboutmore";
import CommunityMember from "./pages/Admin/CommunityMember.js";
import Feedback from "./pages/user/Feedback.js";
import FeedbackManagement from "./pages/Admin/FeedManagement.js";
import AllRegistrations from "./pages/Admin/AllRegistratiions.js";
import Event from "./pages/Event.js";
import Registration from "./pages/Registration.js";
import Sponsers from "./pages/Admin/Sponsers.js";
import Response from "./pages/Admin/Response.js";
import Skills from "./pages/Admin/Skills.js";
import Eventparticipent from "./pages/Eventparticipent.js";
import Participent from "./pages/Admin/Participent.js";

function App() {
  return (
    <div className="App">
      <div className="main-content">
        <>
        <Routes>
            <Route path="/" element={<HomePage />} />

            <Route path="/dashboard" element={<PrivateRoute />}>
              <Route path="user" element={<Dashboard />} />
              <Route path="user/join-community" element={<JoinCommunity />} />
              <Route path="user/feedback" element={<Feedback />} />
            </Route>

            <Route path="/dashboard" element={<AdminRoute />}>
              <Route path="admin" element={<AdminDashboard />} />
              <Route path="admin/create-product" element={<CreateProduct />} />
              <Route path="admin/product" element={<Products />} />
              <Route path="admin/users" element={<User />} />
              <Route path="admin/community-member" element={<CommunityMember />} />
              <Route path="admin/feedback-management" element={<FeedbackManagement />} />
              <Route path="admin/sponser" element={<Sponsers /> } />
              <Route path="admin/all-registrations" element={<AllRegistrations />} />
              <Route path="admin/response" element={<Response />} />
              <Route path="admin/skills" element={<Skills />} />
              <Route path="admin/participent" element={<Participent />} />
            </Route>

            {/* Additional Routes */}
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/login" element={<Login />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about-more" element={<AboutMore />} />
            <Route path="/Event" element={<Event />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/eventparticipent" element={<Eventparticipent />} />
            <Route path="*" element={<Pagenotfound />} /> 

          </Routes>
          
        </>
      </div>
    </div>
  );
}

export default App;
