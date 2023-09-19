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
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <section className="py-5">
        <Container>
          <p className=" ff_primary fw-normal fs_lg text_darktertiary">
            <Link className="text_darktertiary" to="/">
              Home{" "}
            </Link>
            <img src={Arrow} alt="Arrow" /> Application Tracking
          </p>
          <h2 className="ff_primary fw-bold fs_8xl text_dark">
            Job Application status{" "}
          </h2>
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
                  <button className=" py-2 px-3 rounded-pill ff_primary fw-normal fs_lg text_lowsecondary buttonBorder bg-transparent">
                    Recruiter Actions(0)
                  </button>
                </NavLink>
                <NavLink to="/ApplicationTracking/Application">
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
          <Outlet />
        </Container>
      </section>
    </>
  );
}

export default ApplicationTracking;
