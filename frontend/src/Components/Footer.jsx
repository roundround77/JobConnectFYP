import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import FooterLogo from "../Assets/images/svg/FooterLogo.svg";
import { Link } from "react-router-dom";
import AuthUser from "./AuthUser";

function Footer() {
  return (
    <>
      <footer className="bg_semitertiary py-5">
        <Container>
          <Row>
            <Col xs={12} lg={3}>
              <Link to="/">
                <img src={FooterLogo} alt="" />
              </Link>
              <p className=" ff_primary fw-normal fs_lg text_secondary opacity_6 pt-2">
                Connect with Top Employers. Your Career Journey Starts Here.
              </p>
            </Col>
            <Col xs={12} lg={9}>
              <Row>
                <Col xs={6} md={3} className="pt-4 pt-lg-0">
                  <ul className=" ps-0 ps-lg-4">
                    <li className=" ff_primary fw-semibold fs_2xl text_secondary">
                      Employers
                    </li>
                    <li>
                      <a
                        className=" ff_primary fw-normal fs_lg text_secondary opacity_6 mt-2 d-inline-block"
                        href="#"
                      >
                        Overview
                      </a>
                    </li>
                    <li>
                      <a
                        className=" ff_primary fw-normal fs_lg text_secondary opacity_6 mt-2 d-inline-block"
                        href="#"
                      >
                        Pricing
                      </a>
                    </li>
                    <li>
                      <a
                        className=" ff_primary fw-normal fs_lg text_secondary opacity_6 mt-2 d-inline-block"
                        href="#"
                      >
                        Download
                      </a>
                    </li>

                    <li>
                      <Link
                        to="/PostJob"
                        className=" ff_primary fw-normal fs_lg text_secondary opacity_6 mt-2 d-inline-block"
                      >
                        Post a job
                      </Link>
                    </li>
                  </ul>
                </Col>
                <Col xs={6} md={3} className="pt-4 pt-lg-0">
                  <ul className=" ps-0 ps-lg-4">
                    <li className=" ff_primary fw-semibold fs_2xl text_secondary">
                      About
                    </li>
                    <li>
                      <a
                        className=" ff_primary fw-normal fs_lg text_secondary opacity_6 mt-2 d-inline-block"
                        href="#"
                      >
                        Success Stories
                      </a>
                    </li>
                    <li>
                      <a
                        className=" ff_primary fw-normal fs_lg text_secondary opacity_6 mt-2 d-inline-block"
                        href="#"
                      >
                        Openview
                      </a>
                    </li>
                    <li>
                      <a
                        className=" ff_primary fw-normal fs_lg text_secondary opacity_6 mt-2 d-inline-block"
                        href="#"
                      >
                        Team
                      </a>
                    </li>
                    <li>
                      <a
                        className=" ff_primary fw-normal fs_lg text_secondary opacity_6 mt-2 d-inline-block"
                        href="#"
                      >
                        Press
                      </a>
                    </li>
                  </ul>
                </Col>
                <Col xs={6} md={3} className="pt-4 pt-lg-0">
                  <ul className=" ps-0 ps-md-4">
                    <li className=" ff_primary fw-semibold fs_2xl text_secondary">
                      General
                    </li>
                    <li>
                      <a
                        className=" ff_primary fw-normal fs_lg text_secondary opacity_6 mt-2 d-inline-block"
                        href="#"
                      >
                        News
                      </a>
                    </li>
                    <li>
                      <a
                        className=" ff_primary fw-normal fs_lg text_secondary opacity_6 mt-2 d-inline-block"
                        href="#"
                      >
                        FAQ
                      </a>
                    </li>
                    <li>
                      <a
                        className=" ff_primary fw-normal fs_lg text_secondary opacity_6 mt-2 d-inline-block"
                        href="#"
                      >
                        Contact us
                      </a>
                    </li>
                    <li>
                      <a
                        className=" ff_primary fw-normal fs_lg text_secondary opacity_6 mt-2 d-inline-block"
                        href="#"
                      >
                        Terms & Conditions
                      </a>
                    </li>
                  </ul>
                </Col>
                <Col xs={6} md={3} className="pt-4 pt-lg-0">
                  <h2 className="ff_primary fw-semibold fs_2xl text_secondary">
                    Get in touch
                  </h2>
                  <p className=" ff_primary fw-normal fs_lg text_secondary opacity_6 pt-2">
                    4517 Singapore Ave, 23a Jalan Lateh International 359121
                  </p>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  );
}

export default Footer;
