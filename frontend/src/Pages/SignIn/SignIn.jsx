import { useDebugValue, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import AccountImages from "../../Assets/images/png/AccountImages.png";
import EnterEmailIcon from "../../Assets/images/svg/EnterEmailIcon.svg";
import Password from "../../Assets/images/svg/Password.svg";
import { Link } from "react-router-dom";
import AuthUser from "../../Components/AuthUser";
import { useNavigate } from "react-router-dom";
function SignIn() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const { http, setToken } = AuthUser();
  const [error, setError] = useState();
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const login = (e) => {
    e.preventDefault();
    http
      .post("/user/login/", { email: email, password: password })
      .then((res) => {
        if (res.data.success) {
          setToken(res.data.user_roles, res.data.data.access);
        } else {
          // navigate('/signin')
          setError("Please enter the correct email and password");
        }
      });
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <>
      <section className="bg_darklight py-5">
        <Container>
          <Row className=" align-items-center justify-content-around">
            <Col xs={12} md={6} xl={5}>
              <img className="w-100" src={AccountImages} alt="Account Images" />
            </Col>
            <Col xs={12} md={6} xl={5}>
              <div className=" bg_secondary px-lg-5 px-3 py-4 rounded-2 box_shadowLogin mt-4 mt-md-0">
                <p className=" ff_primary fs_lg fw-normal text_darktertiary">
                  Welcome back! 👋
                </p>
                <h2 className=" ff_primary fw-bold fs_4xl text_dark">
                  Sign in to your account
                </h2>
                <form onSubmit={login}>
                  <label
                    htmlFor="Enter"
                    className=" ff_primary fs_lg fw-medium lowsecondary mt-3"
                  >
                    Email address
                  </label>
                  <br />
                  <div className="d-flex align-items-center border_gray px-3 rounded-3 mt-3">
                    <img src={EnterEmailIcon} alt="EnterEmailIcon" />{" "}
                    <input
                      required
                      className="w-100 ff_primary fw-normal fs_sm text_dark p-2 bg-transparent border-0 loginInput"
                      type="text"
                      placeholder="Enter you email"
                      id="Enter"
                      onChange={handleEmail}
                    />
                  </div>
                  <label
                    htmlFor="Password"
                    className=" ff_primary fs_lg fw-medium lowsecondary mt-3"
                  >
                    Password
                  </label>
                  <br />
                  <div className="d-flex align-items-center border_gray px-3 rounded-3 mt-3">
                    <img src={Password} alt="Password" />{" "}
                    <input
                      required
                      className="w-100 ff_primary fw-normal fs_sm text_dark p-2 bg-transparent border-0 loginInput"
                      type="text"
                      placeholder="Password"
                      id="Password"
                      onChange={handlePassword}
                    />
                  </div>
                  <button
                    type="submit"
                    className=" ff_primary fs_lg fw-medium text_secondary bg_semiprimary mt-5 border-0 rounded-2 py-3 w-100"
                  >
                    Continue
                  </button>
                  {error ? <span className="error">{error}</span> : null}
                </form>
                <p className=" ff_primary fw-normal fs_lg text_dark opacity-75 mb-0 mt-4 text-center">
                  Forget your password?
                </p>
              </div>
              <p className=" ff_primary fw-normal fs_lg text_dark text-center mt-4">
                Don’t have an account?
                <Link to="/LoginPage" className="text_orange">
                  Sign up
                </Link>
              </p>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}

export default SignIn;
