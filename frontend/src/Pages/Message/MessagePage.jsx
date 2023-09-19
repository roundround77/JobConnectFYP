import React, { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import SearchIcon from "../../Assets/images/png/SearchIcon.png";
import MessageData from "../../DummyData/MessageData";
import Chatpage from "./Chatpage";
import girlSuzana from "../../Assets/images/png/man_images.jpg";
import AuthUser from "../../Components/AuthUser";
import axios from "axios";

function MessagePage() {
  const [visible, setvisible] = useState(false);
  const [userData, setUserData] = useState([]);
  const { http, getToken, user,getUser } = AuthUser();
  const [selectedUser, setSelectedUser] = useState("");
  const currentuser=getUser()

  const chatUserHandler = () => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${getToken()}`;
    axios
      .get("http://localhost:8000/user/GetAllUser/")
      .then((response) => {
        setUserData(response.data.data);
      })
      .catch((error) => {
        // Handle errors
        console.error("Error:", error);
      });
  };

  const newuserData=userData.filter((value)=>value.username!==currentuser.username)
  useEffect((e) => {
    chatUserHandler();
  }, []);

  return (
    <>
      <section className=" py-5">
        <Container>
          <Row>
            <Col xs={12} md={6} lg={4}>
              <div className=" bg_secondary box_shadow p-4 rounded-3">
                <h2 className=" ff_primary fw-normal fs_4xl text_dark">
                  Messages
                </h2>
                <form className=" border_clr rounded-pill px-2 mt-4">
                  <img src={SearchIcon} alt="" />
                  <input
                    type="text"
                    className=" bg-transparent border-0"
                    placeholder="Search people or message"
                  />
                </form>
                <div
                  style={{
                    width: "100%",
                    height: "350px",
                    overflow: "hidden",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      bottom: 0,
                      left: 0,
                      right: "-17px",
                      overflowY: "scroll",
                    }}
                  >
                    {newuserData
                      // .slice(userData.length - 10, userData.length)
                      .map((value, key) => {
                        const { id, username, email } = value;
                        return (
                          <div
                            key={key}
                            className=" d-flex align-items-start justify-content-between mt-4"
                            onClick={() => {
                              setSelectedUser(value);
                              setvisible(true);
                            }}
                          >
                            <div className=" d-flex align-items-center">
                              <img src={girlSuzana} height="10%" width="10%" alt="" />
                              <div className="ps-3">
                                <h2 className=" ff_primary fw-normal fs_lg text_dark mb-0">
                                  {username}
                                </h2>
                                <p className=" ff_primary fw-normal fs_xsm text_darktertiary mb-0">
                                  {email}
                                </p>
                              </div>
                            </div>
                            <h4 className=" ff_primary fw-normal fs_xsm text_darktertiary mb-0">
                              Just Now
                            </h4>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
            </Col>
            {selectedUser != "" && (
              <Col>
                <Row>
                  <div
                    style={{
                      height: "100%",
                    }}
                  >
                    <Chatpage selected={selectedUser} currentUser={user} />
                  </div>
                </Row>
              </Col>
            )}
          </Row>
        </Container>
      </section>
    </>
  );
}

export default MessagePage;
