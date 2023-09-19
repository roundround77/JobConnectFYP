import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import man_images from "../Assets/images/png/man_images.jpg";
import symbols_delete from "../Assets/images/svg/symbols_delete.png";
import symbols_delete_black from "../Assets/images/svg/symbols_delete_black.png";
import arrow2 from "../Assets/images/svg/arrow2.png";
import white_arrow from "../Assets/images/svg/white_arrow.png";
import arrow1 from "../Assets/images/svg/arrow1.png";

export default function BasicInformation() {
  // Define state variables to manage user-selected data
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedCoverImage, setSelectedCoverImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [selectedVideoName, setSelectedVideoName] = useState("");

  // Event handler for video file selection
  const handleVideoChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.includes("video/")) {
      setSelectedVideo(URL.createObjectURL(file));
      setSelectedVideoName(file.name);
    }
  };

  // Event handler for file (resume) selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Define allowed file extensions
      const allowedExtensions = ["doc", "docx", "pdf"];
      // Get the file extension of the selected file
      const fileExtension = file.name.split(".").pop().toLowerCase();
      if (allowedExtensions.includes(fileExtension)) {
        setSelectedFile(file);
      } else {
        alert("Invalid file format. Only .doc, .docx, and .pdf are allowed.");
      }
    }
  };

  // Event handler for user photo selection
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  // Event handler for cover image selection
  const handleCoverImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedCoverImage(URL.createObjectURL(file));
    }
  };

  return (
    <>
      <section className="py-5">
        <Container>
          <Row>
            <Col xs={12} lg={8}>
              {/* Section title */}
              <h1 className=" ff_secondary fw-medium fs_2xl text_dark">
                Basic Information
              </h1>
              {/* User photo and cover image selection */}
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
                      {selectedImage ? (
                        // Display selected user photo if available
                        <img
                          src={selectedImage}
                          alt="Selected"
                          style={{
                            maxWidth: "100%",
                            maxHeight: "100%",
                            objectFit: "cover",
                            borderRadius: "20px",
                          }}
                        />
                      ) : (
                        // Display '+' symbol if no user photo is selected
                        <p
                          style={{
                            fontSize: "30px",
                          }}
                        >
                          +
                        </p>
                      )}
                      {/* Input element for user photo selection */}
                      <input
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
                      {selectedCoverImage ? (
                        // Display selected cover image if available
                        <img
                          src={selectedCoverImage}
                          alt="Selected"
                          style={{
                            maxWidth: "100%",
                            maxHeight: "100%",
                            objectFit: "cover",
                            borderRadius: "20px",
                          }}
                        />
                      ) : (
                        // Display upload UI if no cover image is selected
                        <div>
                          <div className=" text-center">
                            <img src={arrow2} alt="arrow2" />
                          </div>
                          <p className=" mb-0 fs_lg ff_primary fw-normal text_dark opacity_6 mt-3">
                            Click here or drop files to upload
                          </p>
                        </div>
                      )}

                      {/* Input element for cover image selection */}
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
                {/* User personal information form */}
                <form className="mt-4" action="#">
                  <Row>
                    <Col xs={12} sm={6}>
                      <label htmlFor="name">First name</label> <br />
                      <input
                        className=" mt-2"
                        type="text"
                        id="name"
                        placeholder="Wei"
                      />{" "}
                      <br /> <br />
                      <label htmlFor="Email">Email address</label> <br />
                      <input
                        className=" mt-2"
                        type="email"
                        id="Email"
                        placeholder="candidate@Weiyuan.com"
                      />
                      <br /> <br />
                      <label htmlFor="Position">Current Position</label> <br />
                      <input
                        className=" mt-2"
                        type="text"
                        id="Position"
                        placeholder="UVUX Desianer"
                      />
                    </Col>
                    <Col xs={12} sm={6}>
                      <label htmlFor="Last">Last name</label> <br />
                      <input
                        className=" mt-2"
                        type="text"
                        id="Last"
                        placeholder="Wei"
                      />{" "}
                      <br /> <br />
                      <label htmlFor="number">Phone number</label> <br />
                      <input
                        className=" mt-2"
                        type="tel"
                        id="number"
                        placeholder="123456789"
                        maxLength={10}
                      />
                      <br /> <br />
                      <label htmlFor="Categories">Categories</label> <br />
                      <input
                        className=" mt-2"
                        type="text"
                        id="Categories"
                        placeholder="Designer"
                      />
                    </Col>
                  </Row>
                </form>
              </div>
              {/* Resume and Video Profile sections */}
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
                        {/* Input element for resume file selection */}
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
                      Upload file: doc, docx, pdf
                    </p>
                  </div>
                </Col>
                <Col xs={12} sm={6}>
                  <div className=" bg_secondary box_shadow1 rounded-4 px-4 pt-4 pb-3 h-100  mt-4 mt-sm-0">
                    <h1 className=" text_dark ff_primary fw-medium fs_3xl">
                      Video Profile
                    </h1>
                    <p className=" mb-0 ff_primary text_dark fs_md fw-medium mt-3">
                      Improve your hiring chances by 35%
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
                        {/* Input element for video file selection */}
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
              {/* Additional personal information */}
              <div className=" bg_secondary box_shadow1 rounded-4 mt-5 pb-4 pt-2 px-4 mb-5">
                <form className="mt-4" action="#">
                  <Row>
                    <Col xs={12} sm={6}>
                      <label htmlFor="Date">Date of birth</label> <br />
                      <input
                        className=" mt-2"
                        type="date"
                        id="Date"
                        value="01-01-2000"
                      />{" "}
                      <br /> <br />
                      <label htmlFor="Gender">Gender</label> <br />
                      <input
                        className=" mt-2"
                        type="text"
                        id="Gender"
                        placeholder="Male"
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
                        />
                        <div className=" me-2">
                          <img src={arrow1} alt="arrow1" />
                        </div>
                      </div>
                    </Col>
                  </Row>
                </form>
              </div>{" "}
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}
