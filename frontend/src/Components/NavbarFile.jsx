import React, { useState, useEffect } from "react";
import { Container, Nav } from "react-bootstrap";
import Pagelogo from "../Assets/images/svg/Pagelogo.svg";
import profile_img from "../Assets/images/png/man_images.jpg";
import Close_icon from "../Assets/images/png/Close_icon.png";
import { NavLink } from "react-router-dom";
import AuthUser from "../Components/AuthUser";

function NavbarFile() {
  const [open, setOpen] = useState(true);
  const { getToken, token, logout, getUser } = AuthUser();
  const logoutUser = () => {
    // if (token != undefined) {
    logout();
    // }
  };

  let img = JSON.parse(localStorage.getItem('profilePic'));
  var finalpic;
  if (img != undefined) {
    finalpic = `http://localhost:8000/${img}`;
  } else {
    finalpic = profile_img;
  }

  const userToken = getToken();
  const userData = getUser();

  if (open) {
    document.body.classList.remove("overflow-hidden");
  } else {
    document.body.classList.add("overflow-hidden");
  }

  return (
    <>
      <nav className="py-4 position-relative z-3">
        <Container>
          <div className="d-flex justify-content-between align-items-center">
            <NavLink to="/">
              <img src={Pagelogo} alt="Pagelogo" />
            </NavLink>
            <div
              className={
                open
                  ? "navopen d-flex align-items-center justify-content-center"
                  : "navopen d-flex align-items-center justify-content-center start-0"
              }
            >
              <ul className="ps-0 mb-0 d-lg-flex align-items-center text-center position-relative">
                <img
                  className="position-absolute Close_icon d-lg-none"
                  onClick={() => setOpen(true)}
                  src={Close_icon}
                  alt=""
                />
                <li>
                  <NavLink
                    to="/"
                    className="fs_primary fw-normal fs_lg text_primary mt-4 mt-lg-0 d-inline-block ms-lg-4"
                    onClick={() => setOpen(true)}
                  >
                    Home
                  </NavLink>
                </li>
                {!userToken ? (
                  <li>
                    <NavLink
                      to="/JobPage"
                      onClick={() => setOpen(true)}
                      className="fs_primary fw-normal fs_lg text_primary mt-4 mt-lg-0 d-inline-block ms-lg-4"
                    >
                      Browse jobs
                    </NavLink>
                  </li>
                ) : (
                  userData.is_client && (
                    <li>
                      <NavLink
                        to="/JobPage"
                        onClick={() => setOpen(true)}
                        className="fs_primary fw-normal fs_lg text_primary mt-4 mt-lg-0 d-inline-block ms-lg-4"
                      >
                        Browse jobs
                      </NavLink>
                    </li>
                  )
                )}
                <li>
                  <NavLink
                    to="/Blogs"
                    onClick={() => setOpen(true)}
                    className="fs_primary fw-normal fs_lg text_primary mt-4 mt-lg-0 d-inline-block ms-lg-4"
                  >
                    Blogs
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/Message"
                    onClick={() => setOpen(true)}
                    className="fs_primary fw-normal fs_lg text_primary mt-4 mt-lg-0 d-inline-block ms-lg-4"
                  >
                    Message
                  </NavLink>
                </li>
                {!userToken ? (
                  <div>
                    <li className="d-block d-md-none mt-4">
                      <NavLink
                        onClick={() => setOpen(true)}
                        to="/SignIn"
                        className="ff_primary fs_lg fw-medium text_secondary bg_semiprimary px-3 border-0 rounded-2 py-2"
                      >
                        Login
                      </NavLink>
                    </li>
                  </div>
                ) : (
                  <div className="d-md-none">
                    <NavLink
                      to="/ApplicationTracking"
                      onClick={() => setOpen(true)}
                    >
                      <button className="mt-4 fs_primary fw-normal fs_lg text_primary border-0 bg-transparent">
                        Job Tracking
                      </button>
                    </NavLink>

                    <NavLink
                      onClick={() => setOpen(true)}
                      to="Profile"
                      className="d-flex align-items-center position-absolute man_images"
                    >
                      <img
                        width={36}
                        className="rounded-circle"
                        src={finalpic}
                        alt=""
                      />
                      <p className="fs_primary fw-normal fs_lg text_dark mb-0 ms-2">
                        {userData.username}
                      </p>
                    </NavLink>
                    <li>
                      <button
                        onClick={logoutUser}
                        className="ff_primary fw-medium fs_xl text_primary mt-3 mb-0 bg-transparent border-0"
                      >
                        Logout
                      </button>
                    </li>
                    {!userData.is_client && (
                      <li className="d-block d-md-none mt-4">
                        <button
                          className="ff_primary fw-medium fs_xl text_secondary bg_semiprimary py-3 px-4 rounded-3 border-0"
                          onClick={() => setOpen(true)}
                        >
                          Post a Job
                        </button>
                      </li>
                    )}
                  </div>
                )}
              </ul>
            </div>
            {!userToken ? (
              <div className="d-md-flex align-items-center d-none">
                <NavLink
                  to="/SignIn"
                  className="ff_primary fs_lg fw-medium text_secondary bg_semiprimary px-3 border-0 rounded-2 py-2"
                >
                  Login
                </NavLink>
              </div>
            ) : (
              <div className="d-md-flex align-items-center d-none">
                <NavLink to="/ApplicationTracking">
                  <button className="fs_primary fw-normal fs_lg text_primary border-0 bg-transparent me-4">
                    Job Tracking
                  </button>
                </NavLink>

                <NavLink to="Profile" className="d-flex align-items-center">
                  <img
                    width={36}
                    className="rounded-circle"
                    src={finalpic}
                    alt=""
                  />
                  <p className="fs_primary fw-normal fs_lg text_dark mb-0 ms-2">
                    {userData.username}
                  </p>
                </NavLink>
                <button
                  onClick={logoutUser}
                  className="ff_primary fw-medium fs_xl text_primary ms-3 mb-0 bg-transparent border-0"
                >
                  Logout
                </button>
                {!userData.is_client && (
                  <NavLink
                    to="/PostJob"
                    className="ff_primary fw-medium fs_xl text_primary"
                  >
                    <button className="ff_primary fw-medium fs_xl text_secondary bg_semiprimary py-3 px-4 rounded-3 border-0 ms-3">
                      Post a Job
                    </button>
                  </NavLink>
                )}
              </div>
            )}

            <span
              className="d-flex flex-column menu_icon d-lg-none"
              onClick={() => setOpen(false)}
            >
              <span></span>
              <span className="my-2"></span>
              <span></span>
            </span>
          </div>
        </Container>
      </nav>
    </>
  );
}

export default NavbarFile;
