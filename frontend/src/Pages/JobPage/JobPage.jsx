import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import SearchIcon from "../../Assets/images/png/SearchIcon.png";
import RightIcon from "../../Assets/images/png/RightIcon.png";
import LocationIcon from "../../Assets/images/png/LocationIcon.png";
import FileIcon from "../../Assets/images/png/FileIcon.png";
import BoxesIcon from "../../Assets/images/png/BoxesIcon.png";
import ThreelineIcon from "../../Assets/images/png/ThreelineIcon.png";
import avatar_uxper from "../../Assets/images/png/avatar_uxper.png";
import icon_featured from "../../Assets/images/png/icon_featured.png";
import LightIcon from "../../Assets/images/svg/LightIcon.png";
import Link from "../../Assets/images/svg/Link.png";
import Icon from "../../Assets/images/png/Icon.png";
import ux_ui_designer from "../../Assets/images/png/ux_ui_designer.png";
import discript_logo from "../../Assets/images/png/descript_logo.png";
import mercury_logo from "../../Assets/images/png/mercury_logo.png";
import yoko_co from "../../Assets/images/png/yoko_co.png";
import netomi_logo from "../../Assets/images/png/netomi_logo.png";
import cleo_logo from "../../Assets/images/png/cleo_logo.png";
import superside_logo from "../../Assets/images/png/superside_logo.png";
import multipleicon from "../../Assets/images/png/multipleicon.png";
import rightangle from "../../Assets/images/png/rightangle.png";
import DreamJobsData from "../../DummyData/DreamJobsData";
import DownArrow from "../../Assets/images/svg/DownArrow.svg";
import Filter from "../../DummyData/Filter";
import JobsExperience from "../../DummyData/JobsExperience";
import JobsCareer from "../../DummyData/JobsCareer";
import { NavLink, useNavigate } from "react-router-dom";
import RightArrow from "../../Assets/images/svg/RightArrow.svg";
import Close_icon from "../../Assets/images/png/Close_icon.png";
import { useEffect } from "react";
import AuthUser from "../../Components/AuthUser";
import axios from "axios";
import image_job from "../../Assets/images/png/avatar_uxper.png";

function JobPage() {
  const [filter, setFilter] = useState(true);
  const [dreamJobsData, setDreamJobsData] = useState([]);
  const { http, getToken, user } = AuthUser();
  const navigate = useNavigate();

  if (filter) {
    document.body.classList.remove("overflow_hidden");
  } else {
    document.body.classList.add("overflow_hidden");
  }

  const postHandler = () => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${getToken()}`;
    axios
      .get("http://localhost:8000/addjob/createjob/")
      .then((response) => {
        setDreamJobsData(response.data.data);
        console.log("res", response);
      })
      .catch((error) => {
        // Handle errors
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    if (!user.is_client) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    postHandler();
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <section className="bg_image py-5">
        <Container>
          <p className="text-center fs_7xl text_secondary fw-medium ff_primary">
            Find Your Dream <span className="d-block">Jobs</span>
          </p>
          <Row className="bg_secondary  rounded-2 ">
            <Col
              xs={12}
              sm={6}
              lg={3}
              className="border_right py-2 d-flex align-items-center"
            >
              <span>
                <img src={SearchIcon} alt="" />
              </span>
              <input
                className="fs_lg fw-regular ff_primary text_darktertiary ms-2 w-100"
                type="text"
                placeholder="Jobs title or keywords"
              />
            </Col>
            <Col
              xs={12}
              sm={6}
              lg={3}
              className="border_right py-2 d-flex align-items-center"
            >
              <div className=" d-flex align-items-center justify-content-between w-100">
                <img src={LocationIcon} alt="" />
                <input
                  className="fs_lg fw-regular ff_primary text_darktertiary ms-2 w-100"
                  type="text"
                  placeholder="All Locations"
                />
              </div>
              <img src={RightIcon} alt="" />
            </Col>
            <Col
              xs={12}
              sm={6}
              lg={3}
              className="border_right py-2 d-flex align-items-center"
            >
              <div className=" d-flex align-items-center justify-content-between w-100">
                <img src={FileIcon} alt="" />
                <input
                  className="fs_lg fw-regular ff_primary text_darktertiary ms-2 w-100"
                  type="text"
                  placeholder="All Categories"
                />
              </div>
              <img src={RightIcon} alt="" />
            </Col>
            <Col xs={12} sm={6} lg={3} className=" py-2">
              <div className="d-flex align-items-center justify-content-center">
                <p className="fs_lg fw-regular ff_primary text_darktertiary mb-0  d-none d-md-block">
                  Clear
                </p>
                <a
                  href="#"
                  className="w-100 ms-md-4 ff_primary fs_lg fw-medium bg_semiprimary py-2 px-4 rounded-2 text_secondary w_auto text-center"
                >
                  Search
                </a>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section>
        <Container>
          <Row className="mt-5">
            <Col xs={4}>
              <p
                className="fs_xl fw-medium ff_primary text_semidark border_bottomFilter pb-4"
                onClick={() => setFilter(false)}
              >
                Filter
              </p>
              <div
                className={
                  filter
                    ? " Job_filter overflow-scroll"
                    : "start-0 Job_filter overflow-scroll"
                }
              >
                <div className="vh-100 p-4 p-lg-0">
                  <img
                    className=" position-absolute Close_icon d-lg-none"
                    onClick={() => setFilter(true)}
                    src={Close_icon}
                    alt=""
                  />
                  <p className="fs_lg ff_primary fw-semibold text_darktertiary mt-4">
                    JOBS TYPE
                  </p>
                  {Filter.map((value) => {
                    return (
                      <div
                        className="d-flex align-items-center mt-3"
                        key={value.id}
                      >
                        <input type="checkbox" />
                        <label className=" ff_primary fw-normal fs_lg text_dark mb-0 ms-2">
                          {value.time}
                        </label>
                      </div>
                    );
                  })}
                  <p className="fs_lg ff_primary fw-semibold text_darktertiary mt-4">
                    Salary
                  </p>
                  <div>
                    <div className=" d-flex align-items-center">
                      <input
                        type="text"
                        placeholder="Min"
                        className="salary_input Total_application"
                      />
                      <input
                        type="text"
                        placeholder="Max"
                        className="salary_input Total_application mx-2"
                      />
                      <p className=" ff_primary fw-normal fs_lg  text_lowsecondary d-flex  align-items-center mb-0">
                        Rate{" "}
                        <img className="ps-3" src={DownArrow} alt="DownArrow" />
                      </p>
                    </div>
                  </div>
                  <p className="fs_lg ff_primary fw-semibold text_darktertiary mt-4">
                    Jobs Career
                  </p>
                  {JobsCareer.map((value) => {
                    return (
                      <div
                        className="d-flex align-items-center mt-3"
                        key={value.id}
                      >
                        <input type="checkbox" />
                        <p className=" ff_primary fw-normal fs_lg text_dark mb-0 ms-2">
                          {value.time}
                        </p>
                      </div>
                    );
                  })}
                  <p className="fs_lg ff_primary fw-semibold text_darktertiary mt-4">
                    Jobs Experience
                  </p>
                  {JobsExperience.map((value) => {
                    return (
                      <div
                        className="d-flex align-items-center mt-3"
                        key={value.id}
                      >
                        <input type="checkbox" />
                        <p className=" ff_primary fw-normal fs_lg text_dark mb-0 ms-2">
                          {value.time}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Col>
            <Col xs={12} lg={8}>
              <div className="d-flex justify-content-between">
                <p className="fs_xl fw-medium ff_primary text_semidark mb-0">
                  jobs
                </p>
                <div className="d-flex align-items-center">
                  <img src={BoxesIcon} alt="" />
                  <img className="ms-2" src={ThreelineIcon} alt="" />
                  <p className="mb-0 fs_lg ff_primary text_darktertiary fw-medium ms-3">
                    Sort by
                  </p>
                  <p className="mb-0 fs_lg ff_primary text_lowsecondary fw-medium ms-2">
                    Newest
                  </p>
                  <img className="ms-2" src={RightIcon} alt="" />
                </div>
              </div>

              {dreamJobsData.map((value) => {
                const {
                  id,
                  title,
                  company,
                  carrer_level,
                  stack,
                  hiring_location,
                  applyDay,
                  offered_salary,
                } = value;
                return (
                  <div key={id}>
                    <NavLink to={`/DesignCreative/${id}`}>
                      <div className="border_clr jobCart rounded-3 py-3 px-sm-3 px-2 bg_secondary mt-4 mb-3">
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="d-flex align-items-center">
                            <img src={image_job} alt="" />
                            <div className="ms-3  d-none d-sm-block">
                              <p className="mb-0 fs_xl fw-medium ff_primary text_semidark">
                                {title}
                              </p>
                              <p className="fs_xl ff_primary text_darktertiary fw-medium">
                                by
                                <span className=" text_semidark">
                                  {" "}
                                  {company}{" "}
                                </span>
                                in{" "}
                                <span className="text_semiprimary">
                                  {hiring_location}
                                </span>
                                <span className="fs_xl fw-medium ff_primary text_semiprimary">
                                  {stack}
                                </span>
                              </p>
                            </div>
                          </div>
                          <div>
                            <img src={icon_featured} alt="" />
                            <img className="ms-3" src={LightIcon} alt="" />
                            <img className="ms-3" src={Link} alt="" />
                          </div>
                        </div>
                        <div className=" d-sm-none mt-4">
                          <p className="mb-0 fs_xl fw-medium ff_primary text_semidark">
                            {title}
                          </p>
                          <p className="fs_xl ff_primary text_darktertiary fw-medium">
                            by
                            <span className=" text_semidark">
                              {carrer_level}
                            </span>
                            in
                            <span className="fs_xl fw-medium ff_primary text_semiprimary">
                              {stack}
                            </span>
                          </p>
                        </div>
                        <div className="d-sm-flex align-items-center justify-content-between pt-4">
                          <div className="d-flex">
                            <div className="d-flex align-items-center bg_light_blue rounded-5 px-3 py-2">
                              <img src={Icon} alt="" />
                              <p className="mb-0 ms-2 fw-medium ff_primary text_semiprimary fs_md">
                                {hiring_location}
                              </p>
                            </div>
                            <div className="d-flex align-items-center bg_light_blue rounded-5 ms-3 px-3 py-2">
                              <p className="mb-0 ms-2 fw-medium ff_primary text_semiprimary fs_md">
                                ${offered_salary}/month
                              </p>
                            </div>
                          </div>
                          <div>
                            <p className="mb-0 fs_lg ff_primary text_lowsecondary fw-medium ">
                              <span className="text_semiprimary ">
                                {applyDay}
                              </span>
                              <span className="text_semiprimary">
                                {Math.floor(Math.random() * 50) + 10}
                              </span>
                              <span> days left to apply</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </NavLink>
                  </div>
                );
              })}

            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}

export default JobPage;
