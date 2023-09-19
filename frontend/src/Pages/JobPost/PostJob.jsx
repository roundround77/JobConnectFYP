// Import necessary libraries and assets
import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import arrow1 from "../../Assets/images/svg/arrow1.png";
import rightangle from "../../Assets/images/png/rightangle.png";
import AuthUser from "../../Components/AuthUser";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function PostJob() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [skills, setSkills] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [description, setDescription] = useState("");

  const { http, getToken, user } = AuthUser();
  const [company, setCompany] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  // Function to handle form submission
  const postHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("requirements", skills);
    formData.append("title", title);
    formData.append("user", user.id);
    formData.append("hiring_location", location);
    formData.append("offered_salary", salary);
    formData.append("skills", "UIUX");
    formData.append("company", company);
    formData.append("description", description);

    axios.defaults.headers.common["Authorization"] = `Bearer ${getToken()}`;
    axios
      .post("http://localhost:8000/addjob/createjob/", formData)
      .then(function (response) {
        navigate("/JobPage");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // Function to handle image change (not currently used)
  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  // Functions to handle input changes
  const handleSkills = (e) => {
    setSkills(e.target.value);
  };
  const handleTitle = (e) => {
    setTitle(e.target.value);
  };
  const handleSalary = (e) => {
    setSalary(e.target.value);
  };
  const handleLocation = (e) => {
    setLocation(e.target.value);
  };

  // Check if the user is a client and redirect if not
  useEffect(() => {
    if (user.is_client) {
      navigate("/");
    }
  }, []);

  // Scroll to the top of the page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {/* Post job section */}
      <section className="py-5">
        <Container>
          <div className="d-flex align-items-center">
            <p className="mb-0 me-2 text_darktertiary fs_lg fw-normal ff_primary">
              Home
            </p>
            <img src={rightangle} alt="rightangle" />
            <p className="mb-0 ms-2 fs_lg fw-normal ff_primary text_darktertiary">
              Employer's Profile
            </p>
          </div>
          <div className="d-flex align-items-center justify-content-between">
            <div>
              <p className="mb-0 text_dark fw-bold ff_primary fs_8xl">
                Create a job post
              </p>
            </div>
            <div>
              <a
                href="#"
                className="fs_2xl fw-medium ff_secondary text_dark btn_save_draft px-4 py-2 rounded-5 me-3 transition"
              >
                Save as draft
              </a>
              <a
                href="#"
                onClick={postHandler}
                className="fs_2xl fw-medium ff_secondary text_dark btn_publish px-4 py-2 rounded-5 transition"
              >
                Publish
              </a>
            </div>
          </div>
          <p className="fs_xl ff_primary fw-medium text-dark mt-4">
            Basic Info <span className="text_red">*</span>
          </p>
          <Row>
            <Col xs={8}>
              <div className="box_shadow px-4 py-4 rounded-3">
                <form action="">
                  <Row className="d-flex justify-content-between">
                    <Col xs={6}>
                      <label
                        className="fs_lg ff_primary fw-medium opacity-75"
                        htmlFor="text"
                      >
                        Job Title <span className="text_red">*</span>
                      </label>{" "}
                      <br />
                      <div className="border rounded-1">
                        <input
                          className="fs_lg ff_primary fw-medium ps-2 mt-1"
                          type="text"
                          name="title"
                          value={title}
                          onChange={handleTitle}
                          placeholder="Web Designer"
                        />
                      </div>
                    </Col>
                    <Col xs={6}>
                      <label
                        className="fs_lg ff_primary fw-medium opacity-75"
                        htmlFor="text"
                      >
                        Job Location <span className="text_red">*</span>
                      </label>{" "}
                      <br />
                      <div className="border rounded-1 d-flex justify-content-between align-items-center">
                        <input
                          className="fs_lg ff_primary fw-medium ps-2 mt-1"
                          type="text"
                          placeholder="Select an option"
                          name="Location"
                          value={location}
                          onChange={handleLocation}
                        />
                        <img
                          className="me-2"
                          src={rightangle}
                          alt="rightangle"
                        />
                      </div>
                    </Col>
                    <Col xs={6}>
                      <label
                        className="fs_lg ff_primary fw-medium opacity-75 mt-4"
                        htmlFor="text"
                      >
                        Salary <span className="text_red">*</span>
                      </label>{" "}
                      <br />
                      <div className="border rounded-1 d-flex justify-content-between align-items-center">
                        <input
                          className="fs_lg ff_primary fw-medium ps-2 mt-1"
                          type="text"
                          placeholder="Select an option"
                          value={salary}
                          onChange={handleSalary}
                        />
                        <img
                          className="me-2"
                          src={rightangle}
                          alt="rightangle"
                        />
                      </div>
                    </Col>
                    <Col xs={6}>
                      <label
                        className="fs_lg ff_primary fw-medium opacity-75 mt-4"
                        htmlFor="text"
                      >
                        Company <span className="text_red">*</span>
                      </label>{" "}
                      <br />
                      <div className="border rounded-1 d-flex justify-content-between align-items-center">
                        <input
                          className="fs_lg ff_primary fw-medium ps-2 mt-1"
                          type="text"
                          placeholder="Enter your company name"
                          value={company}
                          onChange={(e) => {
                            setCompany(e.target.value);
                          }}
                        />
                      </div>
                    </Col>
                    <Col xs={6}>
                      <label
                        className="fs_lg ff_primary fw-medium opacity-75 mt-4"
                        htmlFor="text"
                      >
                        Skills <span className="text_red">*</span>
                      </label>{" "}
                      <br />
                      <div className="border rounded-1 d-flex justify-content-between align-items-center">
                        <input
                          className="fs_lg ff_primary fw-medium ps-2 mt-1"
                          type="text"
                          placeholder="Select skills"
                          name="skills"
                          value={skills}
                          onChange={handleSkills}
                        />
                        <img
                          className="me-2"
                          src={rightangle}
                          alt="rightangle"
                        />
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <label
                        className="fs_lg ff_primary fw-medium opacity-75 mt-4"
                        htmlFor="text"
                      >
                        Description <span className="text_red">*</span>
                      </label>
                      <br />
                      <br />
                      <input
                        type="text"
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </Col>
                  </Row>
                </form>
              </div>
            </Col>
          </Row>
          <Row></Row>
        </Container>
      </section>
    </>
  );
}

export default PostJob;
