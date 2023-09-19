import React,{useState} from "react";
import { Container, Row, Col } from "react-bootstrap";
import plush_icon from "../Assets/images/svg/plush_icon.png";

function Education() {
  const [description, setDescription] = useState('');
  const handleSubmit = (event) => {
    event.preventDefault();
    setDescription('');
  };
  return (
    <>
      <section className="py-5">
        <Container>
          <h1 className=" ff_secondary fw-medium fs_2xl text_dark">
            Education 1
          </h1>
          <div className="bg_secondary box_shadow1 rounded-4 mt-3 pt-2 pb-5 px-4 w_84">
            <form className="mt-4" action="#" onSubmit={handleSubmit}>
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
            </form>
          </div>
        </Container>
      </section>
    </>
  );
}

export default Education;
