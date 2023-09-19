import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import plush_icon from "../Assets/images/svg/plush_icon.png";

export default function Experience() {
  return (
    <>
      <section className="py-5">
        <Container>
          {/* Section title */}
          <h1 className="ff_secondary fw-medium fs_2xl text_dark">
            Experience 1
          </h1>
          {/* Experience form */}
          <div className="bg_secondary box_shadow1 rounded-4 mt-3 pt-2 pb-5 px-4 w_84">
            <form className="mt-4" action="#">
              <Row>
                <Col xs={12} sm={6}>
                  {/* Job Title input */}
                  <label htmlFor="Title">Job Title</label> <br />
                  <input
                    className="mt-2"
                    type="text"
                    id="Title"
                    placeholder="Web Designer"
                  />{" "}
                  <br /> <br />
                  {/* From date input */}
                  <label htmlFor="From">From</label> <br />
                  <input
                    className="mt-2"
                    type="date"
                    id="From"
                    placeholder="01-01-2020"
                  />
                </Col>
                <Col xs={12} sm={6}>
                  {/* Company input */}
                  <label htmlFor="Education">Company</label> <br />
                  <input
                    className="mt-2"
                    type="text"
                    id="Education"
                    placeholder="Alpanaoo Company"
                  />{" "}
                  <br /> <br />
                  {/* To date input */}
                  <label htmlFor="date">To</label> <br />
                  <input
                    className="mt-2"
                    type="date"
                    id="date"
                    placeholder="01-01-2022"
                  />
                </Col>
              </Row>
            </form>
          </div>
        </Container>
      </section>
    </>
  );
}
