import { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Arrow from "../../Assets/images/svg/Arrow.svg";
import { Link, NavLink, Outlet } from "react-router-dom";
import Application from "../../DummyData/Application";
import LightIcon from "../../Assets/images/svg/LightIcon.png";
import link from "../../Assets/images/svg/Link.png";
import TickCircle from "../../Assets/images/svg/TickCircle.svg";
import closeIcon from "../../Assets/images/svg/closeIcon.svg";
import mdi_user from "../../Assets/images/svg/mdi_user.svg";
import avatar_uxper from "../../Assets/images/png/avatar_uxper.png";
import icon_featured from "../../Assets/images/png/icon_featured.png";
import Recruiter from "../../Components/Recruiter";
import AuthUser from "../../Components/AuthUser";

function ApplicationTracking() {
  const { user } = AuthUser();

  useEffect(() => {
    // Scroll to the top when the component is mounted
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {/* Application Tracking Section */}
      <section className="py-5">
        <Container>
          {/* Breadcrumbs */}
          <p className=" ff_primary fw-normal fs_lg text_darktertiary">
            <Link className="text_darktertiary" to="/">
              Home{" "}
            </Link>
            <img src={Arrow} alt="Arrow" /> Application Tracking
          </p>
          {/* Page Title */}
          <h2 className="ff_primary fw-bold fs_8xl text_dark">
            Job Application status
          </h2>
          {/* Conditional content based on user type */}
          {user.is_client ? (
            <>
              <p className=" ff_primary fw-normal fs_lg text_darktertiary">
                Not getting views on your CV?{" "}
                <span className=" fw-medium text_semiprimary">
                  Highlight your application
                </span>{" "}
                to get recruiter's attention
              </p>
              <div className=" d-flex align-items-center">
                <NavLink to=".">
                  {/* Button for recruiter actions */}
                  <button className=" py-2 px-3 rounded-pill ff_primary fw-normal fs_lg text_lowsecondary buttonBorder bg-transparent">
                    Recruiter Actions(0)
                  </button>
                </NavLink>
                <NavLink to="/ApplicationTracking/Application">
                  {/* Button for job applications */}
                  <button className=" py-2 px-3 rounded-pill ff_primary fw-normal fs_lg text_secondary ms-3 buttonBorder bg_semiprimary">
                    Applied on Job Connect(5)
                  </button>
                </NavLink>
              </div>
            </>
          ) : (
            <p className=" ff_primary fw-normal fs_lg text_darktertiary">
              Not getting respond on your Posted Job?{" "}
              <span className=" fw-medium text_semiprimary">
                Highlight your application
              </span>{" "}
              to get job seekers attention
            </p>
          )}
          {/* Nested routes */}
          <Outlet />
        </Container>
      </section>
    </>
  );
}

export default ApplicationTracking;
