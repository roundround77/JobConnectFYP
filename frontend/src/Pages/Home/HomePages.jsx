import React, { useRef, useState } from "react";
import portrait_woman from "../../Assets/images/png/portrait_woman.png";
import location from "../../Assets/images/png/location.png";
import search_icon from "../../Assets/images/png/search_icon.png";
import googlelogo from "../../Assets/images/png/googlelogo.png";
import slack from "../../Assets/images/png/slack.png";
import microsoft from "../../Assets/images/png/microsoft.png";
import facebook from "../../Assets/images/png/facbook.png";
import amazon from "../../Assets/images/png/amazon.png";
import images_man from "../../Assets/images/png/images_man.png";
import background_images from "../../Assets/images/png/background_images.png";
import Group_1 from "../../Assets/images/png/Group_1.png";
import Group_2 from "../../Assets/images/png/Group_2.png";
import Group_3 from "../../Assets/images/png/Group_3.png";
import Group_4 from "../../Assets/images/png/Group_4.png";
import Group_5 from "../../Assets/images/png/Group_5.png";
import Group_6 from "../../Assets/images/png/Group_6.png";
import icon_featured from "../../Assets/images/png/icon_featured.png";
import rectangle from "../../Assets/images/png/Rectangle.png";
import icon_urgent from "../../Assets/images/svg/icon_urgent.png";
import link from "../../Assets/images/svg/Link.png";
import icon from "../../Assets/images/png/Icon.png";
import frame260 from "../../Assets/images/png/Frame 260.png";
import netomi_logo from "../../Assets/images/png/netomi_logo.png";
import frame261 from "../../Assets/images/png/Frame 261.png";
import Frame_1 from "../../Assets/images/png/Frame_1.png";
import Frame_2 from "../../Assets/images/png/Frame_2.png";
import Frame_3 from "../../Assets/images/png/Frame_3.png";
import Frame_4 from "../../Assets/images/png/Frame_4.png";
import Frame_5 from "../../Assets/images/png/Frame_5.png";
import Arrow_1 from "../../Assets/images/png/Arrow_1.png";
import Arrow_2 from "../../Assets/images/png/Arrow_2.png";
import Ellipse_1 from "../../Assets/images/png/Ellipse_1.png";
import Ellipse_2 from "../../Assets/images/png/Ellipse_2.png";
import laptop from "../../Assets/images/png/laptop.png";
import clock from "../../Assets/images/png/clock.png";
import laptop1 from "../../Assets/images/png/laptop1.png";
import laptop2 from "../../Assets/images/png/laptop2.png";
import laptop3 from "../../Assets/images/png/laptop3.png";
import email from "../../Assets/images/png/email.png";
import green_line from "../../Assets/images/png/green_line.png";
import circle from "../../Assets/images/png/circle.png";
import black_line from "../../Assets/images/png/black_line.png";
import orange_line from "../../Assets/images/svg/orange_line.png";
import short_orange_line from "../../Assets/images/svg/short_orange_line.png";
import orange_circle from "../../Assets/images/svg/orange_circle.png";
import black_circle from "../../Assets/images/svg/black_circle.png";
import starbox from "../../Assets/images/svg/starbox.png";
import blue_line from "../../Assets/images/svg/blue_line.png";
import workImages from "../../Assets/images/png/workImages.png";
// import PostData from "../../DummyData/PostData";
import { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import avatar_uxper from "../../Assets/images/png/avatar_uxper.png";
import AuthUser from "../../Components/AuthUser";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function HomePages() {
  const slider = React.useRef(null);
  const navigate = useNavigate();
  const [PostData, setPostData] = useState([]);
  const { http, getToken, user } = AuthUser();
  const [jobUrl, setjobUrl] = useState("");

  const postHandler = (url) => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${getToken()}`;
    axios
      .get(url)
      .then((response) => {
        console.log(response, "data chk");
        setPostData(response.data.data);
      })
      .catch((error) => {
        // Handle errors
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    if (user == null) {
      navigate("/LoginPage");
    } else {
      const url = user.is_client
        ? `http://localhost:8000/addjob/createjob/`
        : `http://localhost:8000/addjob/getuserjob/${user.id}/`;
      setjobUrl(url);
      postHandler(url);
    }
  }, []);

  useEffect((e) => {
    window.scrollTo(0, 0);
  }, []);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 2.5,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1.5,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <section>
        <Container className=" rounded-5  bg_darklight position-relative overflow-hidden">
          <img
            className=" position-absolute top27_left12 d-none d-md-flex"
            src={green_line}
            alt="greenline"
          />
          <img
            className=" position-absolute top36_right39 d-none d-md-flex"
            src={circle}
            alt="greenline"
          />
          <img
            className=" position-absolute bottom13_right43 d-none d-md-flex"
            src={black_line}
            alt="greenline"
          />
          <img
            className=" position-absolute top9_right35 d-none d-md-flex"
            src={black_line}
            alt="greenline"
          />
          <img
            className=" position-absolute top8_left48 d-none d-md-flex"
            src={orange_line}
            alt="top8_left48"
          />
          <img
            className=" position-absolute top6_left50 d-none d-md-flex"
            src={short_orange_line}
            alt="greenline"
          />
          <img
            className=" position-absolute top6_right20 d-none d-md-flex"
            src={orange_circle}
            alt="greenline"
          />
          <img
            className=" position-absolute top5_right28 d-none d-md-flex"
            src={black_circle}
            alt="black_circle"
          />
          <Row className="align-items-xl-center align-items-end z-2 position-relative pt-5 px-2">
            <Col className=" pb-5" xs={12} md={6}>
              <div>
                <p className="fs_9xl ff_primary light_black fw-semibold d-block">
                  Revolutionize{" "}
                  <span className="d-md-block">Your Job Search Experience</span>
                </p>
                <p className="fs_2xl ff_primary opacity_6 fw-medium">
                  Find Your Dream Job. Simplify Hiring. Stand Out. Take Control.
                  Connect with Top Employers. Your Career Journey Starts Here.
                </p>
                <div className="border1px rounded-5 bg_white box_shadow pxy_12_14 d-sm-flex justify-content-between align-items-center">
                  <input
                    className=" border_none outline_none w-100"
                    type="search"
                    placeholder="Search jobs here"
                  />
                  <div className=" d-flex w-100 mt-4 mt-sm-0">
                    <img src={location} alt="location" />
                    <input
                      className=" outline_none border_none ms-3 w-100"
                      type="search"
                      placeholder="New York, USA"
                    />
                  </div>
                  <img
                    className=" d-none d-sm-block"
                    src={search_icon}
                    alt="search_icon"
                  />
                </div>
              </div>
            </Col>

            <Col className="" xs={12} md={6}>
              <img
                className="w-100 position-relative z-3"
                src={portrait_woman}
                alt="portrait_woman"
              />
            </Col>
          </Row>
          <img
            className=" position-absolute backImages_position top-50 translate-middle-y d-none d-md-block"
            src={background_images}
            alt="background_images"
          />
        </Container>
      </section>
      <section>
        <Container>
          <div>
            <h1 className="fs_xl ff_primary fw-normal opacity_6 text-center pt-5">
              Popular tech companies who are seeking talents in our website
            </h1>
            <div className=" overflow-auto overflow_hidden">
              <div className=" d-flex align-items-center mt-4 mx-auto w_992">
                <a href="#">
                  <img src={googlelogo} alt="googlelogo" />
                </a>
                <a className=" ms-5" href="#">
                  <img src={slack} alt="slack" />
                </a>
                <a className=" ms-5" href="#">
                  <img src={microsoft} alt="microsoft" />
                </a>
                <a className=" ms-5" href="#">
                  <img src={facebook} alt="facebook" />
                </a>
                <a className=" ms-5 pt-3" href="#">
                  <img src={amazon} alt="amazon" />
                </a>
              </div>
            </div>
          </div>
        </Container>
      </section>
      <section className="py-5">
        <Container>
          <section>
            <Row className=" mt-5 align-items-center">
              <h1 className=" fs_8xl ff_primary fw-bold text_dark pb-4 position-relative">
                Our
                <span className="d-block">Platform's Features</span>
                <img
                  className=" position-absolute left_22"
                  src={blue_line}
                  alt="blue_line"
                />
              </h1>
              <Col
                className=" pb-5  pb-md-5 position-relative"
                xs={12}
                sm={12}
                md={5}
              >
                <img
                  className=" position-absolute z-n1 top_n2"
                  src={starbox}
                  alt="starbox"
                />
                <img
                  className=" position-absolute z-n1 bottom7_right12"
                  src={starbox}
                  alt="starbox"
                />
                <img className=" w-100" src={images_man} alt="images_man" />
              </Col>
              <Col className=" pt-md-5" xs={12} sm={12} md={7}>
                <div className="position-relative timeLine">
                  <div className=" d-flex align-items-center ">
                    <img
                      className="timeline_images"
                      src={Group_1}
                      alt="Group_1"
                    />
                    <div className=" ms-3">
                      <p className="fs_lg fw-semibold text_lowdark mb-0">
                        In-Website Messaging:
                      </p>
                      <p className="fs_lg text_dark fw-normal opacity_6 line_height160">
                        Communicate directly with hirers or recruiters.
                      </p>
                    </div>
                  </div>
                  <div className=" d-flex align-items-center">
                    <img
                      className="timeline_images"
                      src={Group_2}
                      alt="Group_1"
                    />
                    <div className=" ms-3">
                      <p className="fs_lg fw-semibold text_lowdark mb-0">
                        Video Introductions
                      </p>
                      <p className="fs_lg text_dark fw-normal opacity_6 line_height160">
                        Stand out with a short introduction video alongside your
                        job applications
                      </p>
                    </div>
                  </div>
                  <div className=" d-flex align-items-center">
                    <img
                      className="timeline_images"
                      src={Group_3}
                      alt="Group_1"
                    />
                    <div className=" ms-3">
                      <p className="fs_lg fw-semibold text_lowdark mb-0">
                        Candidate's Profile
                      </p>
                      <p className="fs_lg text_dark fw-normal opacity_6 line_height160">
                        Create and manage your profile, showcasing your work
                        history, education, skills, and contact information.
                      </p>
                    </div>
                  </div>
                  <div className=" d-flex align-items-center">
                    <img
                      className="timeline_images"
                      src={Group_4}
                      alt="Group_1"
                    />
                    <div className=" ms-3">
                      <p className="fs_lg fw-semibold text_lowdark mb-0">
                        Employer's Profile
                      </p>
                      <p className="fs_lg text_dark fw-normal opacity_6 line_height160">
                        Post job listings, view resumes, and communicate with
                        job seekers.
                      </p>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </section>
        </Container>
      </section>
      <section className="py-5">
        <Container>
          <div className=" d-sm-flex justify-content-between align-items-center mt-5 mt-sm-0">
            <div>
              <h1 className="fs_5xl ff_secondary fw-semibold text_semidark">
                Latest jobs
              </h1>
              <p className="text_lowsecondary fw-medium fs_xl ff_secondary">
                2023 jobs live – {PostData.length} added today.
              </p>
            </div>
            <div>
            
            </div>
          </div>
          <Row className=" mt-4  pb-md-5 pb-lg-0">
            {PostData?.length > 0 ? (
              PostData.slice(PostData.length - 4, PostData.length).map(
                (value) => {
                  const {
                    image,
                    title,
                    requirements,
                    id,
                    company,
                    offered_salary,
                    hiring_location,
                    updated_at,
                  } = value;
                  return (
                    <Col xs="12" sm="12" md={6} key={id} className="pt-4">
                      <Link
                        to={
                          user.is_client
                            ? `/DesignCreative/${id}`
                            : `/ApplicationTracking`
                        }
                      >
                        <div className=" bg_secondary border_1px jobCart rounded-4 pxy_21_28">
                          <div className=" d-flex justify-content-between">
                            <div>
                              <div className=" d-sm-flex align-items-center">
                                <div>
                                  <img src={avatar_uxper} alt="avatar_uxper" />
                                </div>
                                <div className=" ms-sm-4 pt-2 pt-sm-0">
                                  <h1 className="fs_xl text_semidark ff_secondary fw-medium mb-0">
                                    {title}
                                  </h1>
                                  <p className="fs_lg ff_secondary fw-normal text_lowsecondary mb-0">
                                    <span>by </span>
                                    <span className=" text_semidark fw-medium me-3">
                                      {company}
                                    </span>
                                    <span className=" fw-medium text_semiprimary">
                                      {requirements}
                                    </span>
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div>
                              <img src={icon_urgent} alt="icon_urgent" />
                            </div>
                          </div>
                          <div className=" d-sm-flex align-items-center mt-4">
                            <div className="d-flex align-items-center">
                              <div className=" rounded-4 bg_lowlight  d-flex align-items-center justify-content-center w-20 pxy_5_10">
                                <p className=" text_da  rk fs_md fw-medium opacity_6 ff_secondary mb-0 ">
                                  remote
                                </p>
                              </div>
                              <div className="rounded-4 bg_lowlight pxy_5_10 w-20   d-flex align-items-center justify-content-center  ms-2 bg_semisecondary">
                                <img src={icon} alt="icon" />
                                <span className=" text_dark fs_md fw-medium opacity_6 ff_secondary mb-0 ms-2">
                                  {hiring_location}
                                </span>
                              </div>
                            </div>
                            <div className="rounded-4 bg_lowlight d-inline-block mt-3 mt-sm-0  d-sm-flex align-items-center justify-content-center w-30 pxy_5_10 ms-2 bg_semisecondary">
                              <p className=" text_dark fs_md fw-medium opacity_6 ff_secondary mb-0">
                                ${offered_salary - 50}-{offered_salary}/Week
                              </p>
                            </div>
                          </div>
                          <p className=" text_lowsecondary ff_secondary fs_lg fw-medium line_height24 mt-4 mb-0">
                            <span className=" text_semiprimary">Apply now</span>
                          </p>
                        </div>
                      </Link>
                    </Col>
                  );
                }
              )
            ) : (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "50%",
                }}
              >
                No jobs yet!
              </div>
            )}
          </Row>
        </Container>
      </section>
      <section className=" bg_darklight py-5 mt-md-5">
        <Container className="">
          <div className="">
            <h1 className=" fs_8xl text_dark ff_primary fw-bold text-center position-relative">
              How We Works
              <img
                className=" position-absolute bottom_n6_left_50 d-none d-md-block"
                src={blue_line}
                alt="blue_line"
              />
            </h1>
          </div>
          <Row className=" justify-content-between mt-5 align-items-center flex-column-reverse flex-md-row">
            <Col xs={12} sm={12} md={6} lg={5}>
              <p className=" text_dark ff_primary fs_7xl fw-bold d-block pt-4 pt-md-0">
                Simplifying Your{" "}
                <span className=" d-md-block">
                  Job Search and Hiring Journey
                </span>
              </p>
              <p className=" text_dark opacity_6 ff_primary fs_lg fw-normal mb-4 mt-2 mb-5">
                Step-by-step explanation of how the platform works, highlighting
                its user-friendly nature and the benefits it provides to both
                job seekers and employers.
              </p>
              <div className=" bg_semiprimary rounded-4 d-inline pxy_16_36">
                <a
                  className=" fw-medium ff_primary fs_xl text_secondary"
                  href="#"
                >
                  Learn More
                </a>
              </div>
            </Col>
            <Col xs={12} sm={12} md={6} lg={6}>
              <img className="w-100" src={workImages} alt="workImages" />
              {/* <div className="border_1px w-100 position-relative z-1">
                <img src={frame260} alt="frame260" />
                <img
                  className=" position-absolute top5_left2"
                  src={frame261}
                  alt="frame261"
                />

                <img
                  className=" position-absolute top16_left30"
                  src={Group_5}
                  alt="Group_5"
                />
              </div> */}
            </Col>
          </Row>
        </Container>
      </section>
      <section className=" overflow-hidden pb-5">
        <Container>
          <h1 className=" fw-bold ff_primary text_dark fs_8xl text-center mb-3 mt-5 pt-5 position-relative">
            Browse by Job Categories
            <img
              className=" position-absolute bottom_n6_right_20"
              src={blue_line}
              alt="blue_line"
            />
          </h1>
          <p className=" fw-normal fs_lg ff_primary text_dark opacity_6 text-center m-auto pb-4">
            Browse by Job Categories and Explore Different Career Paths to
            Simplify Your Job Search and{" "}
            <span className="d-block">
              Find the Right Opportunity That Matches Your Skills and Interests.
            </span>
          </p>
          <Row className="mb-5">
            <Col xs={6} md={4} lg={2} className="pt-4">
              <div className="px-sm-4 py-sm-3 px-2 py-1  hover">
                <img src={Frame_1} alt="Frame_1" />
                <h2 className=" fw-semibold ff_primary text_dark fs_xl d-block mt-3">
                  Design & Development
                </h2>
                <p className=" opacity-50 fw-normal fs_md ff_primary mb-0 mt-2">
                  17K Post Jobs
                </p>
              </div>
            </Col>
            <Col xs={6} md={4} lg={2} className="pt-4">
              <div className="px-sm-4 py-sm-3 px-2 py-1  hover">
                <img src={Frame_2} alt="Frame_2" />
                <h2 className=" fw-semibold ff_primary text_dark fs_xl d-block mt-3">
                  Marketing Development
                </h2>
                <p className=" opacity-50 fw-normal fs_md ff_primary mb-0 mt-2">
                  37K Post Jobs
                </p>
              </div>
            </Col>
            <Col xs={6} md={4} lg={2} className="pt-4">
              <div className="px-sm-4 py-sm-3 px-2 py-1  hover">
                <img src={Frame_3} alt="Frame_3" />
                <h2 className=" fw-semibold ff_primary text_dark fs_xl d-block mt-3">
                  Human Resources
                </h2>
                <p className=" opacity-50 fw-normal fs_md ff_primary mb-0 mt-2">
                  7K Post Jobs
                </p>
              </div>
            </Col>
            <Col xs={6} md={4} lg={2} className="pt-4">
              <div className="px-sm-4 py-sm-3 px-2 py-1  hover">
                <img src={Frame_4} alt="Frame_4" />
                <h2 className=" fw-semibold ff_primary text_dark fs_xl d-block mt-3">
                  Project Management
                </h2>
                <p className=" opacity-50 fw-normal fs_md ff_primary mb-0 mt-2">
                  1K Post Jobs
                </p>
              </div>
            </Col>
            <Col xs={6} md={4} lg={2} className="pt-4">
              <div className="px-sm-4 py-sm-3 px-2 py-1  hover">
                <img src={Frame_5} alt="Frame_5" />
                <h2 className=" fw-semibold ff_primary text_dark fs_xl d-block mt-3">
                  Writing & Translation
                </h2>
                <p className=" opacity-50 fw-normal fs_md ff_primary mb-0 mt-2">
                  11K Post Jobs
                </p>
              </div>
            </Col>
            <Col xs={6} md={4} lg={2} className="pt-4">
              <div className="px-sm-4 py-sm-3 px-2 py-1  hover">
                <img src={Frame_1} alt="Frame_6" />
                <h2 className=" fw-semibold ff_primary text_dark fs_xl d-block mt-3">
                  Education & Translation
                </h2>
                <p className=" opacity-50 fw-normal fs_md ff_primary mb-0 mt-2">
                  11K Post Jobs
                </p>
              </div>
            </Col>
          </Row>
          <div className=" text-center">
            <a
              className=" fw-medium ff_primary fs_xl text_secondary bg_semiprimary pxy_16_36  rounded-4"
              href="#"
            >
              See More
            </a>
          </div>
        </Container>
      </section>
      <section className="bg_darklight pb-5">
        <Container>
          <p className=" fs_8xl ff_primary fw-bold text_dark text-center pt-5 position-relative">
            Enhancing Your Career Prospects
            <img
              className=" position-absolute bottom0_right9 d-none d-md-block"
              src={blue_line}
              alt="blue_line"
            />
          </p>
          <Row className=" align-items-center justify-content-between pb-4">
            <Col xs={12} sm={12} md={6} lg={5} xl={4}>
              <img className="w-100" src={Group_6} alt="Group_6" />
            </Col>
            <Col xs={12} sm={12} md={6} lg={6} className="pt-4 pt-md-0">
              <span className=" fw-semibold ff_primary fs_7xl text_dark d-block">
                Gain a Competitive
              </span>
              <span className=" fw-semibold ff_primary fs_7xl text_dark d-block">
                Edge in the Job Market
              </span>
              <p className=" fs_lg fw-normal opacity_6 ff_primary text_dark mt-2">
                Engaging paragraph emphasizing how using the platform can
                enhance future career prospects and provide a competitive
                advantage by connecting job seekers with suitable opportunities
                and helping employers find qualified candidates.
              </p>
              <div className=" mt-5">
                <a
                  className=" fw-medium ff_primary fs_xl text_secondary bg_semiprimary pxy_16_36  rounded-4"
                  href="#"
                >
                  See More
                </a>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section>
        <Container>
          <Row className=" justify-content-between overflow-hidden pt-5 pb-5">
            <Col xs={12} md={5}>
              <p className="text_semiprimary ff_primary fs_lg fw-semibold">
                Testimonial
              </p>
              <p className=" ff_primary fw-bold text_dark fs_8xl">
                See what they say about us
              </p>
              <p className=" fs_lg fw-normal ff_primary text_dark opacity_6">
                Finding the right job was a daunting task until you discovered
                Job Connect
              </p>
              <div className=" d-flex align-items-center pt-5">
                <div
                  className=" w_40 h_40 bg_lightprimary rounded-5 d-flex align-items-center justify-content-center"
                  onClick={() => slider?.current?.slickPrev()}
                >
                  <img src={Arrow_1} alt="Arrow_1" />
                </div>
                <div
                  className=" w_40 h_40 bg_semiprimary ms-4 rounded-5 d-flex align-items-center justify-content-center"
                  onClick={() => slider?.current?.slickNext()}
                >
                  <img src={Arrow_2} alt="Arrow_2" />
                </div>
              </div>
            </Col>
            <Col md={7} className="pt-4 pt-md-0">
              <Slider ref={slider} {...settings}>
                <div className="px-2">
                  <div className="box_shadow bg_secondary rounded-3 px-2 py-3">
                    <div className=" d-flex justify-content-center">
                      <img src={Ellipse_1} alt="Ellipse_1" />
                    </div>
                    <p className=" fs_lg ff_primary text_lowdark fw-semibold text-center mt-2">
                      Caplin Brookly
                    </p>
                    <p className=" fs_lg ff_primary fw-normal text_dark opacity_6  text-center m-auto">
                      I was skeptical at first, but Job Connect proved to be a
                      game-changer for me. The AI matching technology provided
                      me with tailored job recommendations that perfectly
                      matched my qualifications.
                    </p>
                    <div className=" text-center mt-4">
                      <a
                        className=" fs_lg ff_primary fw-semibold text_semiprimary"
                        href="#"
                      >
                        Learn more
                      </a>
                    </div>
                  </div>
                </div>
                <div className="px-2">
                  <div className="box_shadow bg_secondary rounded-3 px-2 py-3">
                    <div className=" d-flex justify-content-center">
                      <img src={Ellipse_1} alt="Ellipse_1" />
                    </div>
                    <p className=" fs_lg ff_primary text_lowdark fw-semibold text-center mt-2">
                      Caplin Brookly
                    </p>
                    <p className=" fs_lg ff_primary fw-normal text_dark opacity_6  text-center m-auto">
                      I was skeptical at first, but Job Connect proved to be a
                      game-changer for me. The AI matching technology provided
                      me with tailored job recommendations that perfectly
                      matched my qualifications.
                    </p>
                    <div className=" text-center mt-4">
                      <a
                        className=" fs_lg ff_primary fw-semibold text_semiprimary"
                        href="#"
                      >
                        Learn more
                      </a>
                    </div>
                  </div>
                </div>
                <div className="px-2">
                  <div className="box_shadow bg_secondary rounded-3 px-2 py-3">
                    <div className=" d-flex justify-content-center">
                      <img src={Ellipse_1} alt="Ellipse_1" />
                    </div>
                    <p className=" fs_lg ff_primary text_lowdark fw-semibold text-center mt-2">
                      Caplin Brookly
                    </p>
                    <p className=" fs_lg ff_primary fw-normal text_dark opacity_6  text-center m-auto">
                      I was skeptical at first, but Job Connect proved to be a
                      game-changer for me. The AI matching technology provided
                      me with tailored job recommendations that perfectly
                      matched my qualifications.
                    </p>
                    <div className=" text-center mt-4">
                      <a
                        className=" fs_lg ff_primary fw-semibold text_semiprimary"
                        href="#"
                      >
                        Learn more
                      </a>
                    </div>
                  </div>
                </div>
                <div className="px-2">
                  <div className="box_shadow bg_secondary rounded-3 px-2 py-3">
                    <div className=" d-flex justify-content-center">
                      <img src={Ellipse_1} alt="Ellipse_1" />
                    </div>
                    <p className=" fs_lg ff_primary text_lowdark fw-semibold text-center mt-2">
                      Caplin Brookly
                    </p>
                    <p className=" fs_lg ff_primary fw-normal text_dark opacity_6  text-center m-auto">
                      I was skeptical at first, but Job Connect proved to be a
                      game-changer for me. The AI matching technology provided
                      me with tailored job recommendations that perfectly
                      matched my qualifications.
                    </p>
                    <div className=" text-center mt-4">
                      <a
                        className=" fs_lg ff_primary fw-semibold text_semiprimary"
                        href="#"
                      >
                        Learn more
                      </a>
                    </div>
                  </div>
                </div>
              </Slider>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="bg_darklight pt-5 pb-5 overflow-hidden">
        <Container>
          <Row className=" justify-content-between">
            <Col xs={12} sm={12} md={6} xl={5}>
              <div>
                <h2 className=" text_dark fs_8xl fw-bold ff_primary">
                  Latest news about <span className="d-block">job trends</span>
                </h2>
              </div>
              <div className="d-flex bg_secondary p-lg-4 p-3 rounded-4 mt-4">
                <div>
                  <img className=" w-100" src={laptop1} alt="laptop1" />
                </div>
                <div className=" ms-3">
                  <h2 className=" ff_primary fw-semibold fs_3xl text_tertiary d-block">
                    Why freelancers are more interested in Full-time jobs?
                  </h2>

                  <div className=" d-flex align-items-center mt-3">
                    <div className=" d-flex align-items-center">
                      <img src={clock} alt="clock" />
                      <span className=" fs_md ff_primary fw-normal text_light ms-3">
                        2 days ago
                      </span>
                    </div>
                    <div className=" d-flex align-items-center ms-4">
                      <img src={clock} alt="clock" />
                      <span className=" fs_md ff_primary fw-normal text_light ms-3">
                        6 min read
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="d-flex bg_secondary p-lg-4 p-3 rounded-4 mt-4">
                <div>
                  <img className=" w-100" src={laptop} alt="laptop" />
                </div>
                <div className=" ms-4">
                  <h2 className=" ff_primary fw-semibold fs_3xl text_tertiary d-block">
                    10 resume writing tips to land you next job.
                  </h2>

                  <div className=" d-flex align-items-center mt-3">
                    <div className=" d-flex align-items-center">
                      <img src={clock} alt="clock" />
                      <span className=" fs_md ff_primary fw-normal text_light ms-3">
                        2 days ago
                      </span>
                    </div>
                    <div className=" d-flex align-items-center ms-4">
                      <img src={clock} alt="clock" />
                      <span className=" fs_md ff_primary fw-normal text_light ms-3">
                        6 min read
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col xs={12} sm={12} md={6} xl={5}>
              <div className="d-flex bg_secondary p-lg-4 p-3 rounded-4 mt-4">
                <div>
                  <img className=" w-100" src={laptop2} alt="laptop1" />
                </div>
                <div className=" ms-3">
                  <h2 className=" ff_primary fw-semibold fs_3xl text_tertiary d-block">
                    Engineering job is becoming more interesting.
                  </h2>

                  <div className=" d-flex align-items-center mt-3">
                    <div className=" d-flex align-items-center">
                      <img src={clock} alt="clock" />
                      <span className=" fs_md ff_primary fw-normal text_light ms-3">
                        2 days ago
                      </span>
                    </div>
                    <div className=" d-flex align-items-center ms-4">
                      <img src={clock} alt="clock" />
                      <span className=" fs_md ff_primary fw-normal text_light ms-3">
                        6 min read
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="d-flex bg_secondary p-lg-4 p-3 rounded-4 mt-4">
                <div>
                  <img className=" w-100" src={laptop3} alt="laptop1" />
                </div>
                <div className=" ms-3">
                  <h2 className=" ff_primary fw-semibold fs_3xl text_tertiary d-block">
                    How to manage your time efficiently to do more.
                  </h2>

                  <div className=" d-flex align-items-center mt-3">
                    <div className=" d-flex align-items-center">
                      <img src={clock} alt="clock" />
                      <span className=" fs_md ff_primary fw-normal text_light ms-3">
                        2 days ago
                      </span>
                    </div>
                    <div className=" d-flex align-items-center ms-4">
                      <img src={clock} alt="clock" />
                      <span className=" fs_md ff_primary fw-normal text_light ms-3">
                        6 min read
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <p className=" fs_3xl text_tertiary ff_primary fw-semibold mt-5 text-end position-relative">
                See all blog posts
                <img
                  className=" position-absolute bottom_n14_left67 d-none d-md-block"
                  src={blue_line}
                  alt="blue_line"
                />
              </p>
            </Col>
          </Row>
        </Container>
      </section>
      <section>
        <Container className=" pt-5 pb-5">
          <div className=" bg_semiprimary p-5 rounded-4">
            <Row className=" align-items-center">
              <Col xs={12} lg={6}>
                <p className=" fs_8xl ff_primary text_secondary fw-bold d-lg-block mb-0">
                  Join Our Job-
                  <span className=" d-lg-block">Search Community</span> Today
                </p>
              </Col>
              <Col xs={12} lg={6}>
                <p className=" fs_lg ff_primary text_secondary opacity_6">
                  We receive over 50 new job submission at our website.
                  Subscribe to our newsletter and get instant job alert on your
                  inbox to apply.
                </p>
                <div className=" bg_secondary px-2 py-2 rounded-3 d-sm-flex  align-items-center justify-content-between">
                  <div>
                    <img className=" ms-3" src={email} alt="email" />
                    <input
                      className=" outline_none border_none"
                      type="text"
                      placeholder="Your mail here"
                    />
                  </div>
                  <div className=" bg_semiprimary border_radius6 d-inline-block pxy_16_36 mt-4 mt-sm-0 ">
                    <a
                      className=" fw-medium ff_primary fs_xl text_secondary text-nowrap"
                      href="#"
                    >
                      Learn More
                    </a>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </Container>
      </section>
    </>
  );
}

export default HomePages;
