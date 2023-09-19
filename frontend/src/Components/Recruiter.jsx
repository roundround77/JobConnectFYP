import React, { useRef, useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import Application from "../DummyData/Application";
import LightIcon from "../Assets/images/svg/LightIcon.png";
import link from "../Assets/images/svg/Link.png";
import TickCircle from "../Assets/images/svg/TickCircle.svg";
import closeIcon from "../Assets/images/svg/closeIcon.svg";
import mdi_user from "../Assets/images/svg/mdi_user.svg";
import avatar_uxper from "../Assets/images/png/avatar_uxper.png";
import icon_featured from "../Assets/images/png/icon_featured.png";
import AuthUser from "./AuthUser";
import axios from "axios";
import styles from "./css/LineContainer.module.css";
import { useNavigate } from 'react-router-dom'

export default function Recruiter() {
  const navigate = useNavigate();
  const [PostData, setPostData] = useState([]);
  const [selectedPost, setselectedPost] = useState({});
  const [jobUserDetails, setjobUserDetails] = useState([]);
  const { http, getToken, user } = AuthUser();
  const jobUrl = user.is_client
    ? "http://localhost:8000/jobapply/getuserappliedjob/"
    : `http://localhost:8000/addjob/getuserjob/${user.id}/`;

  // Function to fetch and set post data
  const postHandler = () => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${getToken()}`;
    axios
      .get(jobUrl)
      .then((response) => {
        console.log(response, "data chk");
        setPostData(response.data.data);
      })
      .catch((error) => {
        // Handle errors
        console.error("Error:", error);
      });
  };

  // Function to fetch job user details
  const getPostUserHandler = (id) => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${getToken()}`;
    axios
      .get(`http://localhost:8000/jobapply/getjobuser/${id}/`)
      .then((response) => {
        console.log(response, "data chk");
        setjobUserDetails(
          response.data.data.filter((val) => {
            if (val.status == "pending") {
              return val;
            }
          })
        );
      })
      .catch((error) => {
        // Handle errors
        console.error("Error:", error);
      });
  };

  // Function to handle status change
  const statusHandler = (id, userStatus) => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${getToken()}`;
    axios
      .patch(`http://localhost:8000/jobapply/changeapplyjob/${id}/`, {
        status: userStatus,
      })
      .then((response) => {
        setjobUserDetails((prevArray) => {
          prevArray = prevArray.filter(
            (obj) => obj.id !== response.data.data.id
          );

          return prevArray;
        });
      })
      .catch((error) => {
        // Handle errors
        console.error("Error:", error);
      });
  };

  // Function to navigate to view candidate page
  const handleOnViewCandidate = (id) => {
    navigate(`/ApplicationTracking/ViewCandidate/${id}`)
  }

  // Function to calculate progress bar width
  const progressBar = () => {
    let progress = "50%";
    if (selectedPost.status == "pending") {
      progress = "50%";
    } else {
      progress = "100%";
    }
    return progress;
  };

  // Function to determine recruiter action status
  const recruiterAction = () => {
    let status = "Awaiting Recruiter";
    if (selectedPost.status == "approved") {
      status = "Approved";
    }
    if (selectedPost.status == "rejected") {
      status = "Rejected";
    }
    return status;
  };

  useEffect(() => {}, [jobUserDetails]);

  useEffect((e) => {
    postHandler();
  }, []);

  return (
    <>
      <Row className=" pt-5">
        <Col xs={12} lg={6} className="border_semidark ">
          <div
            style={{
              width: "100%",
              height: "850px",
              overflow: "hidden",
              position: "relative",
            }}
          >
            <div
              style={{
                overflowY: "auto",
                position: "absolute",
                top: 0,
                bottom: 0,
                left: 0,
                right: "-17px",
                overflowY: "scroll",
              }}
            >
              {PostData.length > 0 ? (
                PostData.map((value) => {
                  const {
                    image,
                    title,
                    requirements,
                    id,
                    company,
                    date_posted,
                    offered_salary,
                    hiring_location,
                    updated_at,
                  } = user.is_client ? value.job : value;
                  return (
                    <div
                      key={id}
                      className="pt-4 pe-xl-4 "
                      onClick={() => {
                        user.is_client
                          ? setselectedPost(value)
                          : getPostUserHandler(value.id);
                      }}
                    >
                      <div className=" bg_secondary border_1px status rounded-4 pxy_21_28">
                        <div className=" d-flex justify-content-between">
                          <div>
                            <div className=" d-flex align-items-center">
                              <div>
                                <img src={avatar_uxper} alt="avatar_uxper" />
                              </div>
                              <div className=" ms-4">
                                <h1 className="fs_xl text_semidark ff_secondary fw-medium mb-0">
                                  {title}
                                </h1>
                                <p className="fs_lg ff_secondary fw-normal text_lowsecondary mb-0">
                                  by
                                  <span className=" text_semidark fw-medium me-3 ms-2">
                                    {company}
                                  </span>
                                  <span className=" fw-medium text_semiprimary">
                                    {requirements}
                                  </span>
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="pt-4 d-sm-flex align-items-center justify-content-between">
                          <button className=" border-0 rounded-pill bg_lowlight py-2 px-4 ff_primary fw-medium fs_sm text_semiprimary">
                            <img
                              className="me-2"
                              src={TickCircle}
                              alt="TickCircle"
                            />
                            Job posted on {date_posted}
                          </button>
                          <p className=" ff_primary fw-medium fs_xsm text_dark mb-0 pt-3 pt-sm-0">
                            {/* Add job details here */}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "50%",
                  }}
                >
                  Nothing yet!
                </div>
              )}
            </div>
          </div>
        </Col>
        {user.is_client ? (
          selectedPost.job && (
            <Col xs={12} lg={6} className="pt-5 pt-lg-0">
              <div className=" mx-4">
                <div className=" d-flex align-items-center justify-content-between borderBottom_semidark pb-4">
                  <div className=" d-flex align-items-center">
                    <img src={avatar_uxper} alt="" />
                    <div className="ps-3">
                      <h1 className="fs_xl text_semidark ff_secondary fw-medium mb-0">
                        {selectedPost.job.title}
                      </h1>
                      <p className="fs_lg ff_secondary fw-normal text_lowsecondary mb-0">
                        by
                        <span className=" text_semidark fw-medium me-3 ms-2">
                          {selectedPost.job.company}
                        </span>
                        <span>Requirements </span> 
                        <span className=" fw-medium text_semiprimary">
                           {selectedPost.job.requirements}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="">
                    <img src={icon_featured} alt="" />
                    <img className=" mx-3" src={LightIcon} alt="" />
                    <img src={link} alt="" />
                  </div>
                </div>
                <p className=" ff_primary fs_xl fs_md text_dark pt-4">
                  Application Status
                </p>
                <Row>
                  <div className={styles["line-container"]}>
                    <div className={styles["progress-line"]}>
                      <div
                        className={styles.progress}
                        style={{ width: progressBar() }}
                      ></div>
                      <div className={styles.status}>
                        <div
                          className={`${styles.dot} ${styles.completed}`}
                        ></div>
                      </div>
                      <div className={styles.status}>
                        <div
                          className={`${styles.dot} ${styles.completed}`}
                        ></div>
                      </div>
                      <div className={styles.status}>
                        <div
                          className={`${styles.dot} ${
                            selectedPost.status === "rejected" &&
                            styles.rejected
                          }
                            ${
                              selectedPost.status === "approved" &&
                              styles.completed
                            }`}
                        ></div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "7vh",
                      }}
                    >
                      <div className={styles.status}>
                        <div
                          style={{
                            marginTop: "5px",
                            marginBottom: "2px",
                            textAlign: "center",
                          }}
                        >
                          <h6
                            style={{
                              margin: "0px",
                              padding: "0px",
                              fontWeight: "500",
                            }}
                          >
                            Applied
                          </h6>
                          <p
                            style={{
                              margin: "0px",
                              padding: "0px",
                              fontWeight: "500",
                              color: "gray",
                            }}
                          >
                            03 Jul 23
                          </p>
                        </div>
                      </div>
                      <div className={styles.status}>
                        <div
                          style={{
                            marginTop: "5px",
                            marginBottom: "2px",
                            textAlign: "center",
                            marginLeft: "70px",
                          }}
                        >
                          <h6
                            style={{
                              margin: "0px",
                              padding: "0px",
                              fontWeight: "500",
                            }}
                          >
                            Application Sent
                          </h6>
                          <p
                            style={{
                              margin: "0px",
                              padding: "0px",
                              fontWeight: "500",
                              color: "gray",
                            }}
                          >
                            03 Jul 23
                          </p>
                        </div>
                      </div>
                      <div className={styles.status}>
                        <div
                          style={{
                            marginTop: "5px",
                            marginBottom: "2px",
                            textAlign: "center",
                          }}
                        >
                          <h6
                            style={{
                              margin: "0px",
                              padding: "0px",
                              fontWeight: "500",
                            }}
                          >
                            {recruiterAction()}
                          </h6>
                          <p
                            style={{
                              margin: "0px",
                              padding: "0px",
                              fontWeight: "500",
                              color: "gray",
                            }}
                          >
                            03 Jul 23
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Row>
                <p className=" ff_primary fw-medium fs_xl text_dark">
                  Activity on this job
                </p>
                <div className=" d-flex align-items-center justify-content-between Total_application py-4 px-5 rounded-3">
                  <div className=" d-flex align-items-center border_semidark w-50">
                    <h2 className=" ff_primary fw-medium fs_7xl mb-0">79</h2>
                    <p className=" ff_primary fw-normal fs_lg   text_lowsecondary mb-0 ms-3">
                      Total <span className=" d-block">application</span>
                    </p>
                  </div>
                  <div className=" d-flex align-items-center">
                    <h2 className=" ff_primary fw-medium fs_7xl mb-0">79</h2>
                    <p className=" ff_primary fw-normal fs_lg   text_lowsecondary mb-0 ms-3">
                      Total <span className=" d-block">application</span>
                    </p>
                  </div>
                </div>{" "}
                <h2 className=" ff_primary fw-medium fs_xl text_dark pt-5">
                  What may work for you?
                </h2>
                <p className=" ff_primary fw-normal fs_lg text_lowsecondary">
                  Following criteria suggests how well you match with the job.
                </p>
                <div className=" d-flex align-items-center">
                  <img src={closeIcon} alt="closeIcon" />
                  <h2 className=" ff_primary fw-normal fs_md mb-0 ms-3">
                    Early Applicant
                  </h2>
                </div>
                <div className=" d-flex align-items-center mt-3">
                  <img src={closeIcon} alt="closeIcon" />
                  <h2 className=" ff_primary fw-normal fs_md mb-0 ms-3">
                    Keyskills
                  </h2>
                </div>
                <div className=" d-flex align-items-center mt-3">
                  <img src={closeIcon} alt="closeIcon" />
                  <h2 className=" ff_primary fw-normal fs_md mb-0 ms-3">
                    Location
                  </h2>
                </div>
                <div className=" d-flex align-items-center mt-3">
                  <img src={TickCircle} alt="closeIcon" />
                  <h2 className=" ff_primary fw-normal fs_md mb-0 ms-3">
                    Work Experience
                  </h2>
                </div>
                <h2 className=" ff_primary fw-medium fs_xl text_dark pt-5">
                  Details view
                </h2>
                <div className=" d-flex align-items-center pt-4 border_gray rounded-3 p-4">
                  <img src={mdi_user} alt="" />
                  <div className="ps-4">
                    <h2 className=" ff_primary fw-medium fs_lg text_dark">
                      HR Recruiter
                    </h2>
                    <p
                      className=" ff_primary fw-normal fs_lg text_lowsecondary mb-0
                    "
                    >
                      HR at Dream Careers Services
                    </p>
                    <p
                      className=" ff_primary fw-normal fs_lg text_lowsecondary mb-0
                    "
                    >
                      Recruiter last active 6d ago
                    </p>
                  </div>
                </div>
              </div>
            </Col>
          )
        ) : (
          <Col xs={12} lg={6} className="pt-5 pt-lg-0">
            <div
              style={{
                width: "100%",
                height: "850px",
                overflow: "hidden",
                position: "relative",
              }}
            >
              <div
                style={{
                  overflowY: "auto",
                  position: "absolute",
                  top: 0,
                  bottom: 0,
                  left: 0,
                  right: "-17px",
                  overflowY: "scroll",
                }}
              >
                {jobUserDetails.length > 0 ? (
                  jobUserDetails.map((value) => (
                    <div className=" mx-4 borderBottom_semidark pb-4 pt-3">
                      <div className=" d-flex align-items-center justify-content-between ">
                        <div className=" d-flex align-items-center">
                          <img src={avatar_uxper} alt="" />
                          <div className="ps-3">
                            <h1 className="fs_xl text_semidark ff_secondary fw-medium mb-0">
                              {value.user.username}
                            </h1>
                            <p className="fs_lg ff_secondary fw-normal text_lowsecondary mb-0">
                              by
                              <span className=" text_semidark fw-medium me-3 ms-2">
                                Ulite
                              </span>
                              <span className=" fw-medium text_semiprimary">
                                {value.skills}
                              </span>
                            </p>
                          </div>
                        </div>
                        <div className="">
                          <img src={icon_featured} alt="" />
                          <img className=" mx-3" src={LightIcon} alt="" />
                          <img src={link} alt="" />
                        </div>
                      </div>
                      <div className=" d-lg-flex mt-3">
                        <button
                          onClick={() => statusHandler(value.id, "approved")}
                          style={{
                            backgroundColor: "blue",
                            color: "white",
                          }}
                          className=" d-flex border-0  ff_primary fs_lg fw-medium py-2 px-4 rounded-2 d-inline-block"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => statusHandler(value.id, "rejected")}
                          style={{
                            backgroundColor: "lightgray",
                            color: "black",
                          }}
                          className=" d-flex  border-0  ff_primary fs_lg fw-medium py-2 px-4 rounded-2 ms-lg-3 mt-4 mt-lg-0 d-inline-block"
                        >
                          Reject
                        </button>
                        <button 
                          onClick={() => handleOnViewCandidate(value.id)}
                          className=" d-flex  border-0  ff_primary fs_lg fw-medium py-2 px-4 rounded-2 ms-lg-3 mt-4 mt-lg-0 d-inline-block"
                        >
                          View
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "50%",
                    }}
                  >
                    No one apply for job yet!
                  </div>
                )}
              </div>
            </div>
          </Col>
        )}
      </Row>
    </>
  );
}
