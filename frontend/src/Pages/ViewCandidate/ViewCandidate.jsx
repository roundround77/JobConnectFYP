import { Col, Container, Row } from "react-bootstrap";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import Arrow from "../../Assets/images/svg/Arrow.svg";
import axios from "axios";
import AuthUser from "../../Components/AuthUser";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function ViewCandidate() {
  const { http, getToken, user } = AuthUser();
  const { cid } = useParams()
  const [loading, setLoading] = useState(true)
  const [candidateData, setCandidateData] = useState()
  const navigate = useNavigate()

  const getUserData = () => {
    setLoading(true)
    axios.defaults.headers.common["Authorization"] = `Bearer ${getToken()}`;
    axios
      .get(`http://localhost:8000/jobapply/getcandidate/${cid}/`)
      .then((response) => {
        setCandidateData(response.data.data);
        setLoading(false)
      })
      .catch((error) => {
        // Handle errors
        console.error("Error:", error);
      });
  };

  const statusHandler = (userStatus) => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${getToken()}`;
    axios
      .patch(`http://localhost:8000/jobapply/changeapplyjob/${cid}/`, {
        status: userStatus,
      })
      .then((response) => {
        navigate('/ApplicationTracking/')
      })
      .catch((error) => {
        // Handle errors
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    getUserData()
  }, [])

  if (loading) {
    return null
  }

  return (
    <>
      <section className="mb-3">
        <Container>
          <Row className=" pt-5">
            <Col xs={8} lg={8} className="">
              <p className=" ff_primary fw-normal fs_lg text_darktertiary">
                <Link className="text_darktertiary" to="/">
                  Home{" "}
                </Link>
                <img src={Arrow} alt="Arrow" /> Application Tracking <img src={Arrow} alt="Arrow" /> View Candidate
              </p>
            </Col>
            <Col xs={4} lg={4} className="mb-3">
              <div className="d-flex flex-row justify-content-end">
              <button
                onClick={() => statusHandler("approved")}
                style={{
                  backgroundColor: "blue",
                  color: "white",
                }}
                className=" d-flex border-0  ff_primary fs_lg fw-medium py-2 px-4 rounded-2 d-inline-block"
              >
                Approve
              </button>
              <button
                onClick={() => statusHandler("rejected")}
                style={{
                  backgroundColor: "lightgray",
                  color: "black",
                }}
                className=" d-flex  border-0  ff_primary fs_lg fw-medium py-2 px-4 rounded-2 ms-lg-3 mt-4 mt-lg-0 d-inline-block"
              >
                Reject
              </button>
              </div>
            </Col>
            <Col xs={4} lg={4} className="">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex flex-column align-items-center text-center">
                    <img src={`http://localhost:8000${candidateData.user.your_photo}`} alt="Admin" className="rounded-circle" width="150" />
                    <div className="mt-3">
                      <h4>{candidateData.username}</h4>
                      <p className="text-secondary mb-1">{candidateData.qualification}</p>
                      <p className="text-muted font-size-sm">{candidateData.user.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col xs={8} lg={8} className="">
              <div className="card mb-3">
                <div className="card-body">
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">First Name</h6>
                    </div>
                    <div className="col-sm-9 text-secondary"> {candidateData.user.first_name}</div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Last Name</h6>
                    </div>
                    <div className="col-sm-9 text-secondary"> {candidateData.user.last_name}</div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Phone</h6>
                    </div>
                    <div className="col-sm-9 text-secondary"> {candidateData.user.phone_no}</div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Language</h6>
                    </div>
                    <div className="col-sm-9 text-secondary"> {candidateData.user.language}</div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Gender</h6>
                    </div>
                    <div className="col-sm-9 text-secondary"> {candidateData.user.gender}</div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Date of birth</h6>
                    </div>
                    <div className="col-sm-9 text-secondary"> {candidateData.user.date_of_birth}</div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Experience</h6>
                    </div>
                    <div className="col-sm-9 text-secondary"> {candidateData.experience}</div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Skills</h6>
                    </div>
                    <div className="col-sm-9 text-secondary"> {candidateData.skills}</div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Note</h6>
                    </div>
                    <div className="col-sm-9 text-secondary"> {candidateData.description}</div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Salary requested</h6>
                    </div>
                    <div className="col-sm-9 text-secondary"> {candidateData.required_salary}</div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Video</h6>
                    </div>
                    <div className="col-sm-9 text-secondary"> 
                      <a href={`http://localhost:8000${candidateData.video}`}>{candidateData.video ? `http://localhost:8000${candidateData.video}`: '-'}</a>
                      </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Resume</h6>
                    </div>
                    <div className="col-sm-9 text-secondary"> 
                      <a href={`http://localhost:8000${candidateData.user.resume}`}>{candidateData.user.resume ? `http://localhost:8000${candidateData.user.resume}`: '-'}</a>
                     </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  )
}