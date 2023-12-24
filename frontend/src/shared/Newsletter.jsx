import React, { useState } from 'react';
import './newsletter.css';
import { Container, Row, Col } from 'reactstrap';
import maleTourist from '../assets/images/male-tourist.png';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NewsLetter = () => {
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = () => {
    setSubscribed(true);

    // Display a toast notification
    toast.success('Thanks for subscribing!', {
      position: 'top-right',
      autoClose: 2000, // Close after 3 seconds
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  return (
    <section className='newsletter'>
      <Container>
        <Row>
          <Col lg='6'>
            <div className="newsletter__content">
              <h2>Subscribe to get all traveling info</h2>

              {subscribed ? (
                <p>Thanks for subscribing!</p>
              ) : (
                <>
                  <div className="newsletter__input">
                    <input type="email" placeholder='Enter your email' />
                    <button className="btn newsletter__btn" onClick={handleSubscribe}>
                      Subscribe
                    </button>
                  </div>
                  <p>Dear User, subscribe to get all news right in your mail.</p>
                </>
              )}
            </div>
          </Col>
          <Col lg='6'>
            <div className="newsletter__img">
              <img src={maleTourist} alt="" />
            </div>
          </Col>
        </Row>
      </Container>

      {/* Toast container for displaying notifications */}
      <ToastContainer />
    </section>
  );
};

export default NewsLetter;
