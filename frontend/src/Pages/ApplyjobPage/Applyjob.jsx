import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import arrow1 from "../../Assets/images/svg/arrow1.png";
import rightangle from "../../Assets/images/png/rightangle.png";
import { useEffect } from "react";
import AuthUser from "../../Components/AuthUser";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const Applyjob = () => {
  const navigate = useNavigate();
  const [qualification, setQualification] = useState();
  const [skills, setSkills] = useState();
  const [experience, setExperience] = useState();
  const [salary, setSalary] = useState();
  const [selectedImage, setSelectedImage] = useState(null);

  const { http, getToken, user } = AuthUser();
  const { id } = useParams();
  const [selectedVideo, setSelectedVideo] = useState(null);

  const handleFileChange = (event) => {
    setSelectedVideo(event.target.files[0]);
  };
  const postHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("video", selectedVideo);
    formData.append("qualification", qualification);
    formData.append("job", id);
    formData.append("user", user.id);
    formData.append("experience", experience);
    formData.append("required_salary", salary);
    formData.append("skills", skills);
    formData.append("description","-");
    formData.append("image",selectedImage);
    axios.defaults.headers.common["Authorization"] = `Bearer ${getToken()}`;
    axios
      .post("http://localhost:8000/jobapply/applyjob/", formData)
      .then((response) => {
        // Handle the data returned from the API
        navigate("/ApplicationTracking");
        this.setState({ responseData: response.data });
      })
      .catch((error) => {
        // Handle errors
        console.error("Error:", error);
      });
  };

  const handleSkills = (e) => {
    setSkills(e.target.value);
  };
  const handleQualification = (e) => {
    setQualification(e.target.value);
  };
  const handleSalary = (e) => {
    setSalary(e.target.value);
  };
  const handleExperience = (e) => {
    setExperience(e.target.value);
  };

  useEffect(() => {
    if (!user.is_client) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <>
      <section className="py-5">
        <Container>
          <div className="d-flex align-items-center">
            <p className="mb-0 me-2 text_darktertiary  fs_lg fw-normal ff_primary">
              Home
            </p>
            <img src={rightangle} alt="rightangle" />
            <p className="mb-0 ms-2 fs_lg fw-normal ff_primary text_darktertiary">
              Employer's Profile
            </p>
          </div>
          <div className=" d-flex align-items-center justify-content-between">
            <div>
              <p className="mb-0 text_dark fw-bold  ff_primary fs_8xl">
                Apply a job post
              </p>
            </div>
            <div>
              <a
                href="#"
                onClick={postHandler}
                className="fs_2xl fw-medium ff_secondary text_dark btn_publish px-4 py-2 rounded-5 transition"
              >
                Apply
              </a>
            </div>
          </div>
          <p className=" fs_xl ff_primary fw-medium text-dark mt-4">
            Basic Info <span className="text_red">*</span>
          </p>
          <Row>
            <Col xs={8}>
              <div className="box_shadow px-4 py-4 rounded-3">
                <form action="">
                  <Row className=" d-flex justify-content-between">
                    <Col xs={6}>
                      <label
                        className=" fs_lg ff_primary fw-medium opacity-75"
                        htmlFor="text"
                      >
                        Qualification <span className="text_red">*</span>
                      </label>{" "}
                      <br />
                      <div className=" border rounded-1">
                        <input
                          className="fs_lg ff_primary fw-medium ps-2 mt-1"
                          type="text"
                          name="title"
                          value={qualification}
                          onChange={handleQualification}
                          placeholder="Web Designer"
                        />
                      </div>
                    </Col>
                    <Col xs={6}>
                      <label
                        className=" fs_lg ff_primary fw-medium opacity-75"
                        htmlFor="text"
                      >
                        Job Experience <span className="text_red">*</span>
                      </label>{" "}
                      <br />
                      <div className="border rounded-1 d-flex justify-content-between align-items-center">
                        <input
                          className="fs_lg ff_primary fw-medium ps-2 mt-1"
                          type="text"
                          placeholder="Select an option"
                          name="Location"
                          value={experience}
                          onChange={handleExperience}
                        />
                        <img
                          className=" me-2"
                          src={rightangle}
                          alt="rightangle"
                        />
                      </div>
                    </Col>
                    <Col xs={6}>
                      <label
                        className=" fs_lg ff_primary fw-medium opacity-75 mt-4"
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
                          className=" me-2"
                          src={rightangle}
                          alt="rightangle"
                        />
                      </div>
                    </Col>
                    <Col xs={6}>
                      <label
                        className=" fs_lg ff_primary fw-medium opacity-75 mt-4"
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
                          className=" me-2"
                          src={rightangle}
                          alt="rightangle"
                        />
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    {/* upload video code */}
                    <Col>
                      <label
                        className=" fs_lg ff_primary fw-medium opacity-75 mt-4"
                        htmlFor="text"
                      >
                        Upload Video <span className="text_red">*</span>
                      </label>
                      <br />
                      <br />
                      <input
                        type="file"
                        accept="video/*"
                        onChange={handleFileChange}
                      />
                    </Col>
                  </Row>
          
                </form>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Applyjob;
