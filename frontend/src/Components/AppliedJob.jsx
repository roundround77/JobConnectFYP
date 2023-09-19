// Import React and necessary components from react-bootstrap
import React from "react";
import { Col, Container, Row } from "react-bootstrap";

// Define the AppliedJob functional component
export default function AppliedJob() {
  return (
    <>
      {/* Container for the content */}
      <Container className="py-5">
        {/* Row for layout */}
        <Row className="py-5">
          <Col xs={6}></Col> {/* Empty column on the left */}
          <Col xs={6}>
            {/* Heading for the applied job section */}
            <h2 className="ff_primary fw-medium fs_xl text_dark pt-5 mt-5">
              Select applied job application to view details
            </h2>
            {/* Subtitle explaining the purpose */}
            <p className="ff_primary fw-medium fs_xl text_darktertiary pb-5 mb-5">
              See details like your application status, activity on job & match score
            </p>
          </Col>
        </Row>
      </Container>
    </>
  );
}
