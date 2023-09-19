import React,{useState} from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Arrow from "../../Assets/images/svg/Arrow.svg";
import RightArrow from "../../Assets/images/svg/RightArrow.svg";
import HomeWorker from "../../Assets/images/png/HomeWorker.png";
import Speaking from "../../Assets/images/png/Speaking.png";
import LaptopToCoffie from "../../Assets/images/png/LaptopToCoffie.png";
import LaptopToLed from "../../Assets/images/png/LaptopToLed.png";
import TippingInLaptop from "../../Assets/images/png/TippingInLaptop.png";
import CatAndLaptop from "../../Assets/images/png/CatAndLaptop.png";
import BookAndLaptop from "../../Assets/images/png/BookAndLaptop.png";
import ReadBook from "../../Assets/images/png/ReadBook.png";
import { useEffect } from "react";
import imgdata from "../../Assets/images/png/Speaking.png";
import AuthUser from "../../Components/AuthUser";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

function BlogsPage() {

  const[blogsData,setBlogsData]=useState([])
  const [selectedImage, setSelectedImage] = useState(null);
  const { http, getToken, user } = AuthUser();
  const navigate = useNavigate();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
 
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    
    today = mm + '/' + dd + '/' + yyyy;

    formData.append("description", description);
    formData.append("title", title);
    formData.append("user", user.id);
    formData.append("date",today );
    formData.append("image",selectedImage);

    axios.defaults.headers.common["Authorization"] = `Bearer ${getToken()}`;
    axios
      .post("http://localhost:8000/blog/createblog/", formData)
      .then(function (response) {
        setDescription('')
        setTitle('')
        
        toast("Your Blog is created successfully")

        function greet() {
         window.location.reload()
      }
      
      let intervalId = setTimeout(greet, 5000);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0])
  };
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');  
  
  //console.log(blogsData)
  
  useEffect(() => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${getToken()}`;
    axios
      .get("http://localhost:8000/blog/createblog/")
      .then(function (response) {
        setBlogsData(response.data.data)
      })
      .catch(function (error) {
        console.log(error);
      });

    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <section className="py-5">
        <Container>
        <form onSubmit={handleSubmit} className="pb-5">
      <div className="mb-3">
        <label htmlFor="title" className="ff_primary fw-medium me-2 fs_3xl">
          Title:
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          className="form-control "
          required
        />
      </div>
      <div className="mb-3">
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
      <p className=" ff_primary text_dark fs_xl fw-normal opacity_6 ">
                      Blog Image
                    </p>
                    <div
                      className="position-relative "
                      style={{
                        border: "1px dotted black",
                        width: "100px",
                        height: "100px",
                        borderRadius: "20px",
                        fontSize: "20px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      {selectedImage ? (
                        <img
                          src={URL.createObjectURL(selectedImage)}
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
      <div className="d-flex justify-content-end">
      <button type="submit" className="fw-medium ff_primary fs_xl text_secondary  bg_semiprimary pxy_16_36  rounded-4 input_border">
        Create Blog
      </button>
      </div>
    </form>
          <p className=" ff_primary fw-normal fs_lg text_darktertiary">
            <Link className="text_darktertiary" to="/">
              Home{" "}
            </Link>
            <img src={Arrow} alt="Arrow" /> Blogs
          </p>
          <h2 className="ff_primary fw-bold fs_8xl text_dark">Our Blogs </h2>
          <Row className="py-5 flex-column-reverse flex-lg-row">
            <Col xs={12} lg={8} xxl={7} className=" pt-lg-0">
              {blogsData.length === 0 ? <h3>No Blogs Created yet</h3> : blogsData.map((value) => {
                const { id, Skill, date, title, description,image  } = value;
                var finalimg;
                if(image==null){
                  finalimg=imgdata
                }else{
                  finalimg=`http://localhost:8000${image}`
                }
                return (
                  <Row className=" align-items-end pt-4" key={id}>
                    <Col xs={12} sm={6} xl={5}>
                      <img className="w-100" src={finalimg} alt="HomeWorker" />
                    </Col>
                    <Col xs={12} sm={6} className="pt-4 pt-sm-0">
                      <div className="d-flex align-items-center ps-sm-3">
                        <p className=" ff_primary fw-medium fs_lg mb-0 text_semiprimary">
                          {Skill}
                        </p>
                        <h2 className="ff_primary fw-medium fs_lg mb-0  text_darktertiary ">
                          Publish on: {date}
                        </h2>
                      </div>
                      <h2 className="ff_primary fw-medium fs_2xl text_lowsecondary py-3 ps-sm-3">
                        {title}
                      </h2>
                      <p className="ff_primary fw-normal fs_lg text_lowsecondary ps-sm-3">
                        {description}
                      </p>
                      {/* <button className=" ff_primary fw-medium fs_lg text_semiprimary bg-transparent border-0 ms-sm-3 p-0 border_semiprimary">
                        Read More
                      </button> */}
                    </Col>
                  </Row>
                );
              })}
          

             
            </Col>
            <Col xs={12} lg={4}>
              <div className=" overflow-auto overflow_hidden">
                <ul className="ps-0 d-flex align-items-center align-items-lg-start flex-lg-column">
                  <li className=" ff_primary fs_2xl fw-semibold text_dark">
                    Category
                  </li>
                  <li>
                    <a
                      className=" ff_primary fw-medium fs_lg text_lowsecondary mt-lg-4 ms-4 ms-lg-0 d-inline-block"
                      href="#"
                    >
                      Education
                    </a>
                  </li>
                  <li>
                    <a
                      className=" ff_primary fw-medium fs_lg text_lowsecondary mt-lg-3 ms-4 ms-lg-0 d-inline-block"
                      href="#"
                    >
                      Information
                    </a>
                  </li>
                  <li>
                    <a
                      className=" ff_primary fw-medium fs_lg text_lowsecondary mt-lg-3 ms-4 ms-lg-0 d-inline-block"
                      href="#"
                    >
                      Interview
                    </a>
                  </li>
                  <li>
                    <a
                      className=" ff_primary fw-medium fs_lg text_lowsecondary mt-lg-3 ms-4 ms-lg-0 d-inline-block"
                      href="#"
                    >
                      Learn
                    </a>
                  </li>
                  <li>
                    <a
                      className=" ff_primary fw-medium fs_lg text_lowsecondary mt-lg-3 ms-4 ms-lg-0 d-inline-block"
                      href="#"
                    >
                      Skill
                    </a>
                  </li>
                  <li>
                    <a
                      className=" ff_primary fw-medium fs_lg text_lowsecondary mt-lg-3 ms-4 ms-lg-0 d-inline-block"
                      href="#"
                    >
                      Speaking
                    </a>
                  </li>
                </ul>
              </div>
              <p className=" ff_primary fs_2xl fw-semibold text_dark mt-4">
                Tags
              </p>
              <div>
                <button className="border_semisecondary py-2 bg-transparent px-3 ff_primary fw-normal fs_lg text_lowsecondary rounded-2 ms-2">
                  App
                </button>
                <button className="border_semisecondary py-2 bg-transparent px-3 ff_primary fw-normal fs_lg text_lowsecondary rounded-2 ms-2">
                  Design
                </button>
                <button className="border_semisecondary py-2 bg-transparent px-3 ff_primary fw-normal fs_lg text_lowsecondary rounded-2 ms-2">
                  Digital
                </button>
                <button className="border_semisecondary py-2 bg-transparent px-3 ff_primary fw-normal fs_lg text_lowsecondary rounded-2 ms-2">
                  Jobs
                </button>
                <button className="border_semisecondary py-2 bg-transparent px-3 ff_primary fw-normal fs_lg text_lowsecondary rounded-2 ms-2">
                  Skill
                </button>
                <button className="border_semisecondary py-2 bg-transparent px-3 ff_primary fw-normal fs_lg text_lowsecondary rounded-2 mt-2 ms-2">
                  Topic
                </button>
              </div>
            </Col>
          </Row>
      
          <ToastContainer />
        </Container>
      </section>
    </>
  );
}

export default BlogsPage;
