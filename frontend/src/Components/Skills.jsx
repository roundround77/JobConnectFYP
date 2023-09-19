import React from "react";
import { Container } from "react-bootstrap"; // Imported Container from react-bootstrap
import multipleicon from "../Assets/images/png/multipleicon.png";

function Skills() {
  return (
    <>
      {/* Skill Section */}
      <section className="py-5">
        <Container> {/* Wrapping content in a Container */}
          <p className="fs_2xl ff_secondary fw-medium text_dark">Skills</p>
          <div className="box_shadow px-4 py-4 rounded-3">
            <p className="fs_lg ff_primary fw-medium text_dark opacity-75 mb-0">
              We recommend at least one skill entry
            </p>
            <div className="d-sm-flex mt-2">
              <input type="text" /> {/* Input field for adding skills */}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

export default Skills;
