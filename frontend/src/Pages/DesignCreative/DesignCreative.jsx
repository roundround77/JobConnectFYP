import { useEffect, useState } from "react";
import Arrow from "../../Assets/images/svg/Arrow.svg";
import { Link } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import designCreative from "../../Assets/images/png/DesignCreative.png";
import DesignCreativeData from "../../DummyData/DesignCreativeData";
import Icon from "../../Assets/images/png/Icon.png";
import viewsIcon from "../../Assets/images/svg/viewsIcon.svg";
import SendIcon from "../../Assets/images/svg/SendIcon.svg";
import visitIcon from "../../Assets/images/svg/visitIcon.svg";
import icon_featured from "../../Assets/images/png/icon_featured.png";
import LightIcon from "../../Assets/images/svg/LightIcon.png";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import AuthUser from "../../Components/AuthUser";
import axios from "axios";

function DesignCreative() {
  const navigate = useNavigate();
  const { iid } = useParams();
  const [PostData, setPostData] = useState({});
  const { http, getToken, user } = AuthUser();
  
  // Slick settings for the slider
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
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

  // Function to handle the post request
  const postHandler = (id) => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${getToken()}`;
    axios
      .get(`http://localhost:8000/addjob/changejob/${id}/`)
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
    // Redirect user to home if not a client
    if (!user.is_client) {
      navigate("/");
    }
  }, []);

  useEffect((e) => {
    // Scroll to the top and fetch post data
    window.scrollTo(0, 0);
    postHandler(iid);
  }, []);

  return (
    <>
      <section className="py-5">
        <Container>
          <p className=" ff_primary fw-normal fs_lg text_darktertiary">
            <Link className="text_darktertiary" to="/">
              Home
            </Link>
            <img className="px-2" src={Arrow} alt="Arrow" />
            Jobs <img className="px-2" src={Arrow} alt="Arrow" />
            Design & Creative
          </p>
          {DesignCreativeData.map((value) => {
            const {
              id,
              ProductImage,
              avatarImage,
              stackname,
              Ulite,
              instack,
              views,
              location,
              Remote,
              jobRole,
              DatePostedimg,
              DatePostedHeading,
              Date,
              Description,
              OverviewHeading,
              Overviewparagraph,
              slillsname,
              Photos,
              Photosimage,
              applyDay,
              stackheading,
              selerity,
              time,
              Jobs,
              jobparagraph,
              Software,
              Categories,
              CompanySize,
              Founded,
              LocationTwo,
              PhoneNumber,
              Email,
              video,
            } = value;
            return (
              <div key={id}>
                <Row>
                  <Col xs={12} md={8} lg={7}>
                    <img
                      className="w-100"
                      src={ProductImage}
                      alt="DesignCreative"
                    />
                    <div className=" d-flex align-items-center pt-5">
                      <img src={avatarImage} alt="" />
                      <div className=" ps-4">
                        <h2 className=" ff_primary fw-medium fs_5xl text_dark mb-0">
                          {PostData.title}
                        </h2>
                        <p className="fs_xl ff_primary text_lowsecondary fw-medium mb-0">
                          by
                          <span className=" text_semidark"> {PostData.company} </span> in
                          <span className="fw-medium text_semiprimary ms-2">
                            {PostData.requirements}
                          </span>
                          <span className=" fs_2xl mx-1">.</span>
                          <img src={viewsIcon} alt="viewsIcon" /> {views}{" "}
                          (views)
                        </p>{" "}
                      </div>
                    </div>
                    <div className=" d-flex pt-4">
                      <p className=" d-inline-block mb-0 ms-2 fw-medium ff_primary text_semiprimary fs_md bg_light_blue rounded-5 px-3 py-2">
                        <img className=" me-1 mb-1" src={Icon} alt="" />{" "}
                        {PostData.hiring_location}
                      </p>
                      <p className=" d-inline-block mb-0 ms-2 fw-medium ff_primary text_semiprimary fs_md bg_light_blue rounded-5 px-3 py-2">
                        {Remote}
                      </p>
                    </div>

                    <h2 className=" ff_primary fw-medium fs_4xl text_dark pt-5">
                      {jobRole}{" "}
                    </h2>
                    <Row className="">
                      {/* Repeat this section as needed */}
                      <Col xs={6} lg={4} className="mt-4">
                        <div className="d-flex align-items-center">
                          <img src={DatePostedimg} alt="" />
                          <div className="ps-2 ps-sm-3">
                            <h2 className=" ff_primary fw-medium fs_lg text_dark mb-0">
                              {DatePostedHeading}{" "}
                            </h2>
                            <p className=" ff_primary fw-normal fs_lg text_light mb-0">
                              {Date}
                            </p>
                          </div>
                        </div>
                      </Col>
                      {/* Repeat section ends */}
                    </Row>
                    
                    {/* Description section */}
                    <h2 className=" pt-5 ff_primary fw-medium fs_4xl text_dark">
                      <p className="fs_xl ff_secondry">Description</p>
                      {PostData.description}
                    </h2>
                
                    {/* Skills section */}
                    <h2 className=" pt-5 ff_primary fw-medium fs_xl text_dark">
                      Skills
                    </h2>
                    <h4 className=" ff_primary fw-normal fs_md text_semiprimary pt-4">
                      {PostData.skills}
                    </h4>
                  </Col>
                  <Col xs={12} md={4} lg={5}>
                    {/* Apply now section */}
                    <div className=" text-center p-4 border_light bg_graylignt mt-5">
                      <div className="">
                        <h2 className=" ff_primary fw-medium fs_4xl text_dark">
                          Interested in this job?
                        </h2>
                        <p className=" ff_primary fw-normal fs_lg text_lowsecondary">
                          <span className=" text_red">137</span> days left to
                          apply
                        </p>
                      </div>
                      <button
                        onClick={() => navigate(`/Applyjob/${iid}`)}
                        className=" text-nowrap ff_primary fw-medium text_secondary bg_semiprimary py-2 px-5  rounded-pill border-0 fs_lg"
                      >
                        Apply now
                      </button>
                    </div>
                    {/* Company information section */}
                    <div className=" border_semisecondary bg_secondary p-3 rounded-3 mt-4">
                      <div className=" d-flex align-items-center ">
                        <img src={avatarImage} alt="" />
                        <div className=" ps-3">
                          <h2 className=" ff_primary fs_xl fw-medium text-dark-emphasis mb-0">
                            {PostData.company}
                          </h2>
                          <p className=" ff_primary fw-medium fs_lg text_semiprimary mb-0">
                            View company profile
                          </p>
                        </div>
                      </div>
                      <div className="pt-4 d-flex align-items-center">
                        <a
                          href="#"
                          className=" ff_primary fw-medium fs_xl text_dark border-2 border-dark border-bottom"
                        >
                          Overview
                        </a>
                        <h2 className=" ff_primary fw-medium fs_xl text_darktertiary mb-0 ms-5">
                          Jobs <span className=" text_semiprimary">{Jobs}</span>
                        </h2>
                      </div>
                      <p className=" ff_primary fw-normal fs_lg text_lowsecondary pt-4">
                        {jobparagraph}
                      </p>
                      <a
                        className=" ff_primary fw-normal fs_lg  text_semiprimary"
                        href="#"
                      >
                        {" "}
                        Read more
                      </a>
                    </div>{" "}
                  </Col>
                </Row>
              </div>
            );
          })}
        </Container>
      </section>
    </>
  );
}

export default DesignCreative;
