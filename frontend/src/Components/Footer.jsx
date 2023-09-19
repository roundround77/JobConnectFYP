import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import FooterLogo from "../Assets/images/svg/FooterLogo.svg";
import { Link } from "react-router-dom";
import AuthUser from "./AuthUser";

function Footer() {
  return (
    <>
      {/* Footer section */}
      <footer className="bg_semitertiary py-5">
        <Container>
          <Row>
            {/* Left column */}
            <Col xs={12} lg={3}>
              {/* Link to home page */}
              <Link to="/">
                <img src={FooterLogo} alt="" />
              </Link>
              {/* Footer description */}
              <p className="ff_primary fw-normal fs_lg text_secondary opacity_6 pt-2">
                Connect with Top Employers. Your Career Journey Starts Here.
              </p>
            </Col>
            {/* Right column */}
            <Col xs={12} lg={9}>
              <Row>
                {/* Column 1 */}
                <Col xs={6} md={3} className="pt-4 pt-lg-0">
                  {/* Employers section */}
                  <ul className="ps-0 ps-lg-4">
                    <li className="ff_primary fw-semibold fs_2xl text_secondary">
                      Employers
                    </li>
                    <li>
                      {/* Overview link */}
                      <a
                        className="ff_primary fw-normal fs_lg text_secondary opacity_6 mt-2 d-inline-block"
                        href="#"
                      >
                        Overview
                      </a>
                    </li>
                    <li>
                      {/* Pricing link */}
                      <a
                        className="ff_primary fw-normal fs_lg text_secondary opacity_6 mt-2 d-inline-block"
                        href="#"
                      >
                        Pricing
                      </a>
                    </li>
                    <li>
                      {/* Download link */}
                      <a
                        className="ff_primary fw-normal fs_lg text_secondary opacity_6 mt-2 d-inline-block"
                        href="#"
                      >
                        Download
                      </a>
                    </li>
                    <li>
                      {/* Post a job link */}
                      <Link
                        to="/PostJob"
                        className="ff_primary fw-normal fs_lg text_secondary opacity_6 mt-2 d-inline-block"
                      >
                        Post a job
                      </Link>
                    </li>
                  </ul>
                </Col>
                {/* Column 2 */}
                <Col xs={6} md={3} className="pt-4 pt-lg-0">
                  {/* About section */}
                  <ul className="ps-0 ps-lg-4">
                    <li className="ff_primary fw-semibold fs_2xl text_secondary">
                      About
                    </li>
                    <li>
                      {/* Success Stories link */}
                      <a
                        className="ff_primary fw-normal fs_lg text_secondary opacity_6 mt-2 d-inline-block"
                        href="#"
                      >
                        Success Stories
                      </a>
                    </li>
                    <li>
                      {/* Openview link */}
                      <a
                        className="ff_primary fw-normal fs_lg text_secondary opacity_6 mt-2 d-inline-block"
                        href="#"
                      >
                        Openview
                      </a>
                    </li>
                    <li>
                      {/* Team link */}
                      <a
                        className="ff_primary fw-normal fs_lg text_secondary opacity_6 mt-2 d-inline-block"
                        href="#"
                      >
                        Team
                      </a>
                    </li>
                    <li>
                      {/* Press link */}
                      <a
                        className="ff_primary fw-normal fs_lg text_secondary opacity_6 mt-2 d-inline-block"
                        href="#"
                      >
                        Press
                      </a>
                    </li>
                  </ul>
                </Col>
                {/* Column 3 */}
                <Col xs={6} md={3} className="pt-4 pt-lg-0">
                  {/* General section */}
                  <ul className="ps-0 ps-md-4">
                    <li className="ff_primary fw-semibold fs_2xl text_secondary">
                      General
                    </li>
                    <li>
                      {/* News link */}
                      <a
                        className="ff_primary fw-normal fs_lg text_secondary opacity_6 mt-2 d-inline-block"
                        href="#"
                      >
                        News
                      </a>
                    </li>
                    <li>
                      {/* FAQ link */}
                      <a
                        className="ff_primary fw-normal fs_lg text_secondary opacity_6 mt-2 d-inline-block"
                        href="#"
                      >
                        FAQ
                      </a>
                    </li>
                    <li>
                      {/* Contact us link */}
                      <a
                        className="ff_primary fw-normal fs_lg text_secondary opacity_6 mt-2 d-inline-block"
                        href="#"
                      >
                        Contact us
                      </a>
                    </li>
                    <li>
                      {/* Terms & Conditions link */}
                      <a
                        className="ff_primary fw-normal fs_lg text_secondary opacity_6 mt-2 d-inline-block"
                        href="#"
                      >
                        Terms & Conditions
                      </a>
                    </li>
                  </ul>
                </Col>
                {/* Column 4 */}
                <Col xs={6} md={3} className="pt-4 pt-lg-0">
                  {/* Get in touch section */}
                  <h2 className="ff_primary fw-semibold fs_2xl text_secondary">
                    Get in touch
                  </h2>
                  {/* Address */}
                  <p className="ff_primary fw-normal fs_lg text_secondary opacity_6 pt-2">
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
