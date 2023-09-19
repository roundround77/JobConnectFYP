import React, { useState } from "react";
import AuthUser from "../../Components/AuthUser";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
// import arrow1 from "../../Assets/images/svg/arrow1.png";
import { NavLink, Outlet } from "react-router-dom";
import { useEffect, useRef } from "react";

import { Container, Row, Col } from "react-bootstrap";
import symbols_delete_black from "../../Assets/images/svg/symbols_delete_black.png";
import arrow2 from "../../Assets/images/svg/arrow2.png";
import white_arrow from "../../Assets/images/svg/white_arrow.png";
import arrow1 from "../../Assets/images/svg/arrow1.png";
export default function ProfileSettings() {
  const formRef = useRef()
  const { http, getToken, user } = AuthUser();
  const [loading, setLoading] = useState(true)

  // BASIC INFO
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageUrl, setSelectedImageUrl] = useState(null);
  const [selectedCoverImage, setSelectedCoverImage] = useState(null);
  const [selectedCoverImageUrl, setSelectedCoverImageUrl] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFileUrl, setSelectedFileUrl] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [selectedVideoUrl, setSelectedVideoUrl] = useState(null);
  const [selectedVideoName, setSelectedVideoName] = useState("");
  const [dob, setDob] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email,] = useState(user.email);
  const [phone, setPhone] = useState("");
  const [position, setPosition] = useState("");
  const [category, setCategory] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [qualificaton, setQualification] = useState("");
  const [language, setlanguage] = useState("");
  const [experince, setExperince] = useState("");
  // EDUCATION
  const [description, setDescription] = useState('');

  const getUserInfo = () => {
    setLoading(true)
    axios.defaults.headers.common["Authorization"] = `Bearer ${getToken()}`;
    axios
      .get(`http://localhost:8000/user/changebasicinfo`)
      .then((response) => {
        const userData = response.data.data

        if (userData.resume?.length) {
          setSelectedFile('')
          setSelectedFileUrl(`http://localhost:8000${userData.resume}`)
        } else {
          setSelectedFile('')
        }

        if (userData.your_photo?.length) {
          setSelectedImage('')
          setSelectedImageUrl(`http://localhost:8000${userData.your_photo}`)
        } else {
          setSelectedImage('')
        }

        if (userData.cover_image?.length) {
          setSelectedCoverImage('')
          setSelectedCoverImageUrl(`http://localhost:8000${userData.cover_image}`)
        } else {
          setSelectedCoverImage('')
        }

        if (userData.video_profile?.length) {
          setSelectedVideo('')
          setSelectedVideoName(userData.video_profile.split("/").pop())
          setSelectedVideoUrl(`http://localhost:8000${userData.video_profile}`)
        } else {
          setSelectedVideo('')
          setSelectedVideoName('')
        }

        setFirstName(userData.first_name)
        setLastName(userData.last_name)
        setCategory(userData.categories)
        setDescription(userData.description)
        setAge(userData.age)
        setDob(userData.date_of_birth)
        setPosition(userData.current_position)
        setPhone(userData.phone_no)
        setGender(userData.gender)
        setlanguage(userData.language)
        setQualification(userData.qualification)
        setExperince(userData.year_of_experience)

        setLoading(false)
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const handleVideoChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.includes("video/")) {
      setSelectedVideo(file);
      setSelectedVideoUrl(URL.createObjectURL(file))
      setSelectedVideoName(file.name);
    }
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setSelectedFileUrl(URL.createObjectURL(event.target.files[0]))
  };

  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0])
    setSelectedImageUrl(URL.createObjectURL(event.target.files[0]))

  };

  const handleCoverImageChange = (event) => {
    setSelectedCoverImage(event.target.files[0]);
    setSelectedCoverImageUrl(URL.createObjectURL(event.target.files[0]))
  };

  const onSubmitForm = e => {
    formRef.current.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }))
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    if (selectedImage) formData.append("your_photo", selectedImage);
    if (description) formData.append("description", description);
    if (dob)  formData.append("date_of_birth", dob);
    formData.append("user", user.id);
    if (firstName)  formData.append("first_name", firstName);
    if (lastName)  formData.append("last_name", lastName);
    formData.append("email", email);
    if (position)  formData.append("current_position", position);
    if (category)  formData.append("categories", category);
    if (age)  formData.append("age", age);
    if (phone)  formData.append("phone_no", phone);
    if (gender)  formData.append("gender", gender);
    if (language)  formData.append("language", language);
    if (qualificaton) formData.append("qualification", qualificaton);
    if (experince) formData.append("year_of_experience", experince);
    if (selectedFile) formData.append("resume", selectedFile);
    if (selectedCoverImage) formData.append("cover_image", selectedCoverImage);
    if (selectedVideo) formData.append("video_profile", selectedVideo);

    axios.defaults.headers.common["Authorization"] = `Bearer ${getToken()}`;
    axios
      .patch(`http://localhost:8000/user/changebasicinfo/`, formData)
      .then(function (response) {
        localStorage.setItem("profilePic", JSON.stringify(response.data.data.your_photo));
        toast.success(`Profile updated succesfully!`)
      })
      .catch(function (error) {
        if (error.response) {
          if (error.response.data.errors) {
            Object.entries(error.response.data.errors).forEach(([key, val]) => {
              toast.error(`${key}: ${val}`)
            })
          }
        }
      });
  };

  useEffect(() => {
    //window.scrollTo(0, 0);
    getUserInfo()
  }, []);

  if (loading === true) {
    return null;
  }

  return (
    <>
      <section>
        <Container>
          <div>
            <div className=" mt-5">
              <p className=" fs_lg fw-normal text_darktertiary ff_primary">
                {" "}
                <NavLink to="/" className="text_darktertiary">
                  Home
                </NavLink>
                <img className=" ms-2 me-2" src={arrow1} alt="arrow1" /> Profile
              </p>
              <h1 className=" fs_8xl fw-bold ff_primary text_dark mt-3">
                Profile Settings
              </h1>
            </div>
          </div>
          <form ref={formRef} className="mt-4" action="#" onSubmit={handleSubmit}>
            {/* BASIC INFORMATION */}
            <section className="py-5">
              <Container>
                <Row>
                  <Col xs={12} lg={8}>
                    <h1 className=" ff_secondary fw-medium fs_2xl text_dark">
                      Basic Information
                    </h1>
                    <div className=" bg_secondary box_shadow1 rounded-4 mt-5 pb-5 px-4">
                      <Row>
                        <Col className=" pt-3" xs={6} sm={4}>
                          <p className=" ff_primary text_dark fs_xl fw-normal opacity_6 ">
                            Your photo
                          </p>
                          <div
                            className="position-relative "
                            style={{
                              border: "1px dotted black",
                              width: "180px",
                              height: "150px",
                              borderRadius: "20px",
                              fontSize: "20px",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            {selectedImageUrl ? (
                              <img
                                src={selectedImageUrl}
                                alt="Selected"
                                style={{
                                  maxWidth: "100%",
                                  maxHeight: "100%",
                                  objectFit: "cover",
                                  borderRadius: "20px",
                                }}
                              />
                            ) : (
                              <p
                                style={{
                                  fontSize: "30px",
                                }}
                              >
                                +
                              </p>
                            )}
                            <input
                              required
                              type="file"
                              accept="image/*"
                              onChange={handleImageChange}
                              style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                width: "100%",
                                height: "100%",
                                opacity: 0,
                                cursor: "pointer",
                              }}
                            />


                          </div>
                        </Col>
                        <Col className=" pt-3" xs={12} sm={8}>
                          <p className=" ff_primary text_dark fs_xl fw-normal opacity_6 ">
                            Cover image
                          </p>
                          <div
                            style={{ position: "relative" }}
                            className="bg_lightbrown border_dashed w-100 h_151 d-flex align-items-center justify-content-center rounded-4"
                          >
                            {selectedCoverImageUrl ? (
                              <img
                                src={selectedCoverImageUrl}
                                alt="Selected"
                                style={{
                                  maxWidth: "100%",
                                  maxHeight: "100%",
                                  objectFit: "cover",
                                  borderRadius: "20px",
                                }}
                              />
                            ) : (
                              <div>
                                <div className=" text-center">
                                  <img src={arrow2} alt="arrow2" />
                                </div>
                                <p className=" mb-0 fs_lg ff_primary fw-normal text_dark opacity_6 mt-3">
                                  Click here or drop files to upload
                                </p>
                              </div>
                            )}

                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleCoverImageChange}
                              style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                width: "100%",
                                height: "100%",
                                opacity: 0,
                                cursor: "pointer",
                              }}
                            />
                          </div>
                        </Col>
                      </Row>

                      <Row>
                        <Col xs={12} sm={6}>
                          <label htmlFor="name">First name</label> <br />
                          <input
                            className=" mt-2"
                            type="text"
                            id="name"
                            placeholder="enter your name"
                            onChange={(e) => { setFirstName(e.target.value) }}
                            value={firstName}
                          />{" "}
                          <br /> <br />
                          <label htmlFor="Email">Email address</label> <br />
                          <input
                            className=" mt-2"
                            type="email"
                            id="Email"
                            value={email}
                            disabled
                            placeholder={email}
                          />
                          <br /> <br />
                          <label htmlFor="Position">Current Position</label> <br />
                          <input
                            className=" mt-2"
                            type="text"
                            id="Position"
                            placeholder="UVUX Desianer"
                            onChange={(e) => { setPosition(e.target.value) }}
                            value={position}
                          />
                        </Col>
                        <Col xs={12} sm={6}>
                          <label htmlFor="Last">Last name</label> <br />
                          <input
                            className=" mt-2"
                            type="text"
                            id="Last"
                            placeholder="enter your last name"
                            onChange={(e) => { setLastName(e.target.value) }}
                            value={lastName}
                          />{" "}
                          <br /> <br />
                          <label htmlFor="number">Phone number</label> <br />
                          <input
                            className=" mt-2"
                            type="tel"
                            id="number"
                            placeholder="123456789"
                            maxLength={15}
                            onChange={(e) => { setPhone(e.target.value) }}
                            value={phone}
                          />
                          <br /> <br />
                          <label htmlFor="Categories">Categories</label> <br />
                          <input
                            className=" mt-2"
                            type="text"
                            id="Categories"
                            placeholder="Designer"
                            onChange={(e) => { setCategory(e.target.value) }}
                            value={category}
                          />
                        </Col>
                      </Row>

                    </div>
                    <Row className=" mt-4">
                      <Col xs={12} sm={6}>
                        <div className=" bg_secondary box_shadow1 rounded-4 px-4 pt-4 pb-3 h-100">
                          <h1 className=" text_dark ff_primary fw-medium fs_3xl">
                            Resume
                          </h1>
                          <p className=" mb-0 ff_primary text_dark fs_md fw-medium mt-3">
                            CV Attachment
                          </p>
                          <div className=" d-flex align-items-center mt-2">
                            <div className=" bg_semiprimary w_109 h_40 rounded-5 d-flex align-items-center justify-content-center">
                              <label
                                className="w_109 h_40 rounded-5 d-flex align-items-center justify-content-center"
                                htmlFor="fileInput"
                                style={{
                                  cursor: "pointer",
                                }}
                              >
                                <img src={white_arrow} alt="white_arrow" />
                              </label>
                              <input
                                type="file"
                                accept=".doc,.docx, .pdf"
                                id="fileInput"
                                style={{ display: "none" }}
                                onChange={handleFileChange}
                              />
                            </div>

                            <div className=" ms-4">
                              <img
                                src={symbols_delete_black}
                                alt="symbols_delete_black"
                              />
                            </div>
                          </div>
                          {selectedFile && (
                            <p className=" mb-0 fs_md ff_primary fw-normal opacity_6 text_dark mt-2">
                              Selected file: {selectedFile.name}
                            </p>
                          )}
                          <p className=" mb-0 fs_md ff_primary fw-normal opacity_6 text_dark mt-2">
                            Upload file: doc, docx,pdf
                          </p>
                        </div>
                      </Col>
                      <Col xs={12} sm={6}>
                        <div className=" bg_secondary box_shadow1 rounded-4 px-4 pt-4 pb-3 h-100  mt-4 mt-sm-0">
                          <h1 className=" text_dark ff_primary fw-medium fs_3xl">
                            Video Profile
                          </h1>
                          <p className=" mb-0 ff_primary text_dark fs_md fw-medium mt-3">
                            Improve your hiring changes by 35%
                          </p>
                          <div className=" d-flex align-items-center mt-2">
                            <div className=" bg_semiprimary w_109 h_40 rounded-5 d-flex align-items-center justify-content-center">
                              <label
                                className="w_109 h_40 rounded-5 d-flex align-items-center justify-content-center"
                                htmlFor="videoInput"
                                style={{ cursor: "pointer" }}
                              >
                                <img src={white_arrow} alt="white_arrow" />
                              </label>
                              <input
                                type="file"
                                accept="video/*"
                                id="videoInput"
                                style={{ display: "none" }}
                                onChange={handleVideoChange}
                              />
                            </div>
                            <div className=" ms-4">
                              <img
                                src={symbols_delete_black}
                                alt="symbols_delete_black"
                              />
                            </div>
                          </div>
                          {selectedVideoName && (
                            <p className=" mb-0 fs_md ff_primary fw-normal opacity_6 text_dark mt-2">
                              Selected Video: {selectedVideoName}
                            </p>
                          )}
                          <p className=" mb-0 fs_md ff_primary fw-normal opacity_6 text_dark mt-2">
                            MP4, Max size: 150mb Video length 2 min max.
                          </p>
                        </div>
                      </Col>
                    </Row>
                    <div className=" bg_secondary box_shadow1 rounded-4 mt-5 pb-4 pt-2 px-4 mb-5">

                      <Row>
                        <Col xs={12} sm={6}>
                          <label htmlFor="Date">Date of birth</label> <br />
                          <input
                            className=" mt-2"
                            type="date"
                            id="Date"
                            onChange={(e) => setDob(e.target.value)}
                            value={dob}
                          />{" "}
                          <br /> <br />
                          <label htmlFor="Gender">Gender</label> <br />
                          <input
                            className=" mt-2"
                            type="text"
                            id="Gender"
                            placeholder="Male"
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                          />
                          <br /> <br />
                          <label htmlFor="Qualification">Qualification</label>{" "}
                          <br />
                          <div className=" border_solid d-flex align-items-center rounded-1 justify-content-between w-75 mt-2">
                            <input
                              className=" border_none"
                              type="text"
                              id="Qualification"
                              placeholder="Associate Degree"
                              value={qualificaton}
                              onChange={(e) => setQualification(e.target.value)}
                            />
                            <div className=" me-2">
                              <img src={arrow1} alt="arrow1" />
                            </div>
                          </div>
                        </Col>
                        <Col xs={12} sm={6}>
                          <label htmlFor="Age">Age</label>
                          <div className=" border_solid d-flex align-items-center rounded-1 justify-content-between w-75 mt-2">
                            <input
                              className=" border_none"
                              type="text"
                              id="Age"
                              placeholder="30-35"
                              value={age}
                              onChange={(e) => setAge(e.target.value)}
                            />
                            <div className=" me-2">
                              <img src={arrow1} alt="arrow1" />
                            </div>
                          </div>{" "}
                          <br />
                          <label htmlFor="Language">Language</label>
                          <div className=" border_solid d-flex align-items-center rounded-1 justify-content-between w-75 mt-2">
                            <input
                              className=" border_none"
                              type="text"
                              id="Language"
                              placeholder="English"
                              value={language}
                              onChange={(e) => setlanguage(e.target.value)}
                            />
                            <div className=" me-2">
                              <img src={arrow1} alt="arrow1" />
                            </div>
                          </div>{" "}
                          <br />
                          <label htmlFor="Experience">Year of Experience</label>
                          <div className=" border_solid d-flex align-items-center rounded-1 justify-content-between w-75 mt-2">
                            <input
                              className=" border_none"
                              type="text"
                              id="Experience"
                              placeholder="3-5 Years"
                              value={experince}
                              onChange={(e) => setExperince(e.target.value)}
                            />
                            <div className=" me-2">
                              <img src={arrow1} alt="arrow1" />
                            </div>
                          </div>
                        </Col>
                      </Row>

                    </div>{" "}
                  </Col>
                </Row>
                <div className="my-3">
                  <label htmlFor="description" className="ff_primary fw-medium me-2 fs_3xl ">
                    Description:
                  </label>
                  <textarea
                    id="description"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                    className="form-control "
                    rows="5"
                    required
                  />
                </div>
                <button type="button" onClick={(e) => onSubmitForm(e)}
                  className="fs_2xl ff_secondary fw-medium text_secondary border1px_solid py-2 px-4 rounded-5 bg_semiprimary"

                >
                  Publish
                </button>
              </Container>
            </section>
            {/* EDUCATION */}
            {/* <section className="pt-3">
        <Container>
          <h1 className=" ff_secondary fw-medium fs_2xl text_dark">
            Education 
          </h1>
          <div className="bg_secondary box_shadow1 rounded-4 mt-3 pt-2 pb-5 px-4 w_84">
       
              <Row>
                <Col xs={12} sm={6}>
                  <label htmlFor="Title">Title</label> <br />
                  <input
                    className=" mt-2"
                    type="text"
                    id="Title"
                    placeholder="New York University"
                  />{" "}
                  <br /> <br />
                  <label htmlFor="From">From</label> <br />
                  <input
                    className=" mt-2"
                    type="date"
                    id="From"
                    placeholder="01-01-2020"
                  />
                </Col>
                <Col xs={12} sm={6}>
                  <label htmlFor="Education">Level of Education</label> <br />
                  <input
                    className=" mt-2"
                    type="text"
                    id="Education"
                    placeholder="Yuan"
                  />
                  <br /> <br />
                  <label htmlFor="date">To</label> <br />
                  <input
                    className=" mt-2"
                    type="date"
                    id="date"
                    placeholder="01-01-2022"
                  />
                </Col>

                <Col xs={10} sm={10}>
                 
                  <div className="my-3">
                   <label htmlFor="description" className="ff_primary fw-medium me-2 fs_3xl ">
                     Description:
                   </label>
                   <textarea
                     id="description"
                     value={description}
                     onChange={(event) => setDescription(event.target.value)}
                     className="form-control "
                     rows="5"
                     required
                   />
                 </div>
                 <div className=" mt-4 d-flex justify-content-center align-items-center">
                <a
                  className="fs_2xl ff_secondary fw-medium text_secondary border1px_solid py-2 px-4 rounded-5 bg_semiprimary"
                  href="#"
                >
                  Publish
                </a>
              </div>
                </Col>
              </Row>
            
          </div>
         
          
        </Container>
      </section> */}
            {/* EXPERIENCE */}
            {/* <section className="py-5">
        <Container>
          <h1 className=" ff_secondary fw-medium fs_2xl text_dark">
            Experience 
          </h1>
          <div className="bg_secondary box_shadow1 rounded-4 mt-3 pt-2 pb-5 px-4 w_84">
           
              <Row>
                <Col xs={12} sm={6}>
                  <label htmlFor="Title">Job Title</label> <br />
                  <input
                    className=" mt-2"
                    type="text"
                    id="Title"
                    placeholder="Web Designer"
                  />{" "}
                  <br /> <br />
                  <label htmlFor="From">From</label> <br />
                  <input
                    className=" mt-2"
                    type="date"
                    id="From"
                    placeholder="01-01-2020"
                  />
                </Col>
                <Col xs={12} sm={6}>
                  <label htmlFor="Education">Company</label> <br />
                  <input
                    className=" mt-2"
                    type="text"
                    id="Education"
                    placeholder="Alpanaoo  Company"
                  />{" "}
                  <br /> <br />
                  <label htmlFor="date">To</label> <br />
                  <input
                    className=" mt-2"
                    type="date"
                    id="date"
                    placeholder="01-01-2022"
                  />
                </Col>

              
              </Row>
            
          </div>
          
        </Container>
      </section> */}
            {/* SKILLS */}
            {/* <section className="py-5">
        <Container>
          <p className="fs_2xl ff_secondary fw-medium text_dark">Skills</p>
          <div className="box_shadow px-4 py-4 rounded-3">
            <p className="fs_lg ff_primary fw-medium text_dark opacity-75 mb-0">
              We recommend at least one skill entry
            </p>
            <div className="d-sm-flex mt-2">
              <input type="text" />
             
            </div>
          </div>
          
        </Container>
      </section> */}
          </form>
        </Container>
      </section>
      <Outlet />
      <ToastContainer />
    </>
  );
}
