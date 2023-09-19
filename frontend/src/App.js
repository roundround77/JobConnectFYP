import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePages from "./Pages/Home/HomePages";
import NavbarFile from "./Components/NavbarFile";
import Footer from "./Components/Footer";
import BlogsPage from "./Pages/BlogsPage/BlogsPage";
import JobPage from "./Pages/JobPage/JobPage";
import LoginPage from "./Pages/Login/LoginPage";
import PostJob from "./Pages/JobPost/PostJob";
import SignIn from "./Pages/SignIn/SignIn";
import ApplicationTracking from "./Pages/Application/ApplicationTracking";
import DesignCreative from "./Pages/DesignCreative/DesignCreative";
import MessagePage from "./Pages/Message/MessagePage";
import ProfileSettings from "./Pages/ProfileSettings/ProfileSettings";
import Education from "./Components/Education";
import BasicInformation from "./Components/BasicInformation";
import Skills from "./Components/Skills";
import Experience from "./Components/Experience";
import AppliedJob from "./Components/AppliedJob";
import Recruiter from "./Components/Recruiter";
import Layout from "./Pages/Layout";
import ProtectedRoutes from "./Components/ProtectedRoutes";
import Applyjob from "./Pages/ApplyjobPage/Applyjob";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ViewCandidate from "./Pages/ViewCandidate/ViewCandidate";

function App() {
  return (
    <>
      {/* Configure application routes */}
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Define routes and associated components */}
          <Route index element={<ProtectedRoutes Component={HomePages} />} />
          <Route
            path="/Blogs"
            element={<ProtectedRoutes Component={BlogsPage} />}
          />
          <Route
            path="/JobPage"
            element={<ProtectedRoutes Component={JobPage} />}
          />
          <Route path="/LoginPage" element={<LoginPage />} />
          <Route path="/PostJob" element={<PostJob />} />
          <Route path="/Applyjob/:id" element={<Applyjob />} />
          <Route path="/SignIn" element={<SignIn />} />
          <Route
            path="/Message"
            element={<ProtectedRoutes Component={MessagePage} />}
          />
          <Route
            path="/DesignCreative/:iid"
            element={<ProtectedRoutes Component={DesignCreative} />}
          />
          <Route path="/Profile" Component={ProfileSettings} />

          <Route
            path="/ApplicationTracking/ViewCandidate/:cid"
            element={<ProtectedRoutes Component={ViewCandidate} />}
          />

          <Route path="/ApplicationTracking" element={<ApplicationTracking />}>
            <Route index element={<ProtectedRoutes Component={Recruiter} />} />
            <Route
              path="/ApplicationTracking/Application"
              element={<ProtectedRoutes Component={AppliedJob} />}
            />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
