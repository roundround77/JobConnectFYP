import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import multipleicon from "../Assets/images/png/multipleicon.png";

function Skills() {
  return (
    <>
      <section className="py-5">
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
      </section>
    </>
  );
}

export default Skills;
