// Import necessary libraries and assets
import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Create_account from "../../Assets/images/png/Create_account.png";
import Candidate from "../../Assets/images/svg/Candidate.svg";
import Employer from "../../Assets/images/svg/Employer.svg";
import carbon_user from "../../Assets/images/svg/carbon_user.svg";
import EnterEmailIcon from "../../Assets/images/svg/EnterEmailIcon.svg";
import Password from "../../Assets/images/svg/Password.svg";
import GoogleIcon from "../../Assets/images/svg/GoogleIcon.svg";
import { Link } from "react-router-dom";
import AuthUser from "../../Components/AuthUser";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  // State variables for form inputs and errors
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [confirm_password, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");
  const [isClient, setIsClient] = useState(true); // Boolean to track user type
  const [error, setError] = useState({
    email: "",
    password: "",
    username: "",
  });

  // AuthUser hook for authentication
  const { http, setToken } = AuthUser();
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  // Function to handle form submission
  const login = (e) => {
    e.preventDefault();
    http
      .post("/user/registration/", {
        email: email,
        password: password,
        username: username,
        confirm_password: password,
        is_creator: !isClient, // Setting is_creator based on isClient
        is_client: isClient,
      })
      .then((res) => {
        if (res.data.success) {
          setToken(res.data.user, res.data.token.access);
        }
      })
      .catch((err) => {
        setError({
          email: "",
          password: "",
          username: "",
        });
        if (err.response.data.errors.email) {
          setError((prevState) => ({
            ...prevState,
            email: err.response.data.errors.email[0],
          }));
        }
        if (err.response.data.errors.password) {
          setError((prevState) => ({
            ...prevState,
            password: err.response.data.errors.password[0],
          }));
        }
        if (err.response.data.errors.username) {
          setError((prevState) => ({
            ...prevState,
            username: err.response.data.errors.username[0],
          }));
        }
      });
  };

  // Functions to handle input changes
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleUsername = (e) => {
    setUsername(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <>
      {/* Login form section */}
      <section className="bg_darklight py-5">
        <Container>
          <Row className="align-items-center justify-content-between">
            <Col xs={12} md={6}>
              <img
                className="w-100"
                src={Create_account}
                alt="Create account"
              />
            </Col>
            <Col xs={12} md={6} xl={5}>
              <div className="bg_secondary px-lg-5 px-3 py-4 rounded-2 box_shadowLogin mt-4 mt-md-0">
                <p className="ff_primary fs_lg fw-normal text_darktertiary">
                  Welcome! 👋
                </p>
                <h2 className="ff_primary fw-bold fs_4xl text_dark">
                  Create your account
                </h2>
                <div className="d-lg-flex mt-3">
                  {/* Toggle between "Candidate" and "Employer" */}
                  <button
                    style={{
                      backgroundColor: isClient ? "blue" : "lightgray",
                      color: isClient ? "white" : "black",
                    }}
                    onClick={() => setIsClient(true)}
                    className="d-flex border-0 ff_primary fs_lg fw-medium py-2 px-4 rounded-2 d-inline-block"
                  >
                    <img className="pe-2" src={Candidate} alt="Candidate" />
                    Candidate
                  </button>
                  <button
                    style={{
                      backgroundColor: isClient ? "lightgray" : "blue",
                      color: isClient ? "black" : "white",
                    }}
                    onClick={() => setIsClient(false)}
                    className="d-flex border-0 ff_primary fs_lg fw-medium py-2 px-4 rounded-2 ms-lg-3 mt-4 mt-lg-0 d-inline-block"
                  >
                    <img className="pe-2" src={Employer} alt="Employer" />
                    Employer
                  </button>
                </div>

                {/* Registration form */}
                <form className="pt-4" onSubmit={login}>
                  <label
                    htmlFor="FullName"
                    className="ff_primary fs_lg fw-medium lowsecondary"
                  >
                    Full name
                  </label>
                  <br />
                  <div className="d-flex align-items-center border_gray px-3 rounded-3 mt-3">
                    <img className="mb-1" src={carbon_user} alt="carbon_user" />{" "}
                    <input
                      className="w-100 ff_primary fw-normal fs_sm text_dark p-2 bg-transparent border-0 loginInput"
                      type="text"
                      placeholder="Full Name"
                      id="FullName"
                      value={username}
                      onChange={handleUsername}
                    />
                  </div>
                  {error.username !== "" && (
                    <p style={{ fontSize: "12px", color: "red" }}>
                      {error.username}
                    </p>
                  )}
                  <label
                    htmlFor="FullName"
                    className="ff_primary fs_lg fw-medium lowsecondary mt-3"
                  >
                    Email address
                  </label>
                  <br />
                  <div className="d-flex align-items-center border_gray px-3 rounded-3 mt-3">
                    <img src={EnterEmailIcon} alt="EnterEmailIcon" />{" "}
                    <input
                      className="w-100 ff_primary fw-normal fs_sm text_dark p-2 bg-transparent border-0 loginInput"
                      type="text"
                      placeholder="Enter you email"
                      id="FullName"
                      value={email}
                      onChange={handleEmail}
                    />
                  </div>
                  {error.email !== "" && (
                    <p style={{ fontSize: "12px", color: "red" }}>
                      {error.email}
                    </p>
                  )}
                  <label
                    htmlFor="FullName"
                    className="ff_primary fs_lg fw-medium lowsecondary mt-3"
                  >
                    Password
                  </label>
                  <br />
                  <div className="d-flex align-items-center border_gray px-3 rounded-3 mt-3">
                    <img src={Password} alt="Password" />{" "}
                    <input
                      className="w-100 ff_primary fw-normal fs_sm text_dark p-2 bg-transparent border-0 loginInput"
                      type="text"
                      placeholder="Password"
                      id="FullName"
                      value={password}
                      onChange={handlePassword}
                    />
                  </div>
                  {error.password !== "" && (
                    <p style={{ fontSize: "12px", color: "red" }}>
                      {error.password}
                    </p>
                  )}
                  <div className="d-flex align-items-center mt-4">
                    <input type="checkbox" />
                    <p className="ff_primary fw-normal fs_lg text_dark opacity-50 mb-0 ms-3">
                      I have read and agree to the Terms of Service
                    </p>
                  </div>
                  <button className="ff_primary fs_lg fw-medium text_secondary bg_semiprimary mt-5 border-0 rounded-2 py-3 w-100">
                    Sign Up
                  </button>
                  <p className="ff_primary fw-medium fs_md text_semiprimary text-center mt-4">
                    or
                  </p>
                </form>
              </div>
              <div className="d-flex align-items-center justify-content-center pt-4">
                <img src={GoogleIcon} alt="GoogleIcon" />
                <p className="ff_primary fw-medium text-dark fs_lg mb-0 ms-3">
                  Connect with Google
                </p>
              </div>
              <p className="ff_primary fw-normal fs_lg text_dark text-center mt-4">
                Already have an account?
                <Link to="/SignIn" className="text_orange">
                  Sign In
                </Link>
              </p>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}

export default LoginPage;
