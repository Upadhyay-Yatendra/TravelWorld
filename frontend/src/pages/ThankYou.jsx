import React, { useRef, useState } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import { Link } from "react-router-dom";
import "../styles/thank-you.css";
import { useSearchParams } from "react-router-dom";
import { FaCopy } from "react-icons/fa";

const CopyToClipboard = ({ referenceNum }) => {
  const textAreaRef = useRef(null);
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = () => {
    textAreaRef.current.select();
    document.execCommand("copy");
    window.getSelection().removeAllRanges();
    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <span>
      <textarea
        ref={textAreaRef}
        value={referenceNum}
        readOnly
        style={{ position: "absolute", left: "-9999px" }}
      />
      <span className="copy-icon" onClick={copyToClipboard}>
        {isCopied ? "Copied!" : <FaCopy />}
      </span>
    </span>
  );
};

const ThankYou = () => {
  const searchQuery = useSearchParams()[0];
  const referenceNum = searchQuery.get("reference");

  return (
    <section>
      <Container>
        <Row>
          <Col lg="12" className="pt-5 text-center">
            <div className="thank__you">
              <span>
                <i className="ri-checkbox-circle-line"></i>
              </span>
              <h1 className="mb-3 fw-semibold">Thank You</h1>
              <h3 className="mb-4">Your Tour Is Booked</h3>
              <h6 className="mb-4"> 
                Save this payment Id for future reference :{""}
                <CopyToClipboard referenceNum={referenceNum} />
              </h6>

              <Button className="btn primary__btn w-25">
                <Link to="/home">Back To Home</Link>
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ThankYou;
