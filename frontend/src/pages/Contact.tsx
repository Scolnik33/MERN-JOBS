import React, { useEffect } from "react";
import "../../public/css/style.css";
import "../../public/css/bootstrap.min.css";
import "../../public/css/owl.carousel.min.css";
import "../../public/css/magnific-popup.css";
import "../../public/css/font-awesome.min.css";
import "../../public/css/themify-icons.css";
import "../../public/css/flaticon.css";
import "../../public/css/gijgo.css";
import "../../public/css/animate.min.css";
import "../../public/css/slicknav.css";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { selectIsAuth } from "../redux/slices/auth";

const Contact: React.FC = () => {
  const isAuth = useSelector(selectIsAuth);
  const navigate = useNavigate();

  const handleSendMessage = () => {
    if (window.localStorage.getItem("token") && isAuth) {
      window.localStorage.setItem('toast', 'send');
      navigate('/');
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="bradcam_area bradcam_bg_1">
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="bradcam_text">
                <h3>contact</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="contact-section section_padding">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h2 className="contact-title">Get in Touch</h2>
            </div>
            <div className="col-lg-8">
              <form
                className="form-contact contact_form"
                id="contactForm"
              >
                <div className="row">
                  <div className="col-12">
                    <div className="form-group">
                      <textarea
                        className="form-control w-100"
                        placeholder="Enter Message"
                      ></textarea>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Enter your name"
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <input
                        className="form-control"
                        type="email"
                        placeholder="Enter email address"
                      />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-group">
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Enter Subject"
                      />
                    </div>
                  </div>
                </div>
                <div className="form-group mt-3">
                  <button
                    className="button button-contactForm btn_4 boxed-btn"
                    onClick={handleSendMessage}
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>
            <div className="col-lg-4">
              <div className="media contact-info">
                <span className="contact-info__icon">
                  <i className="ti-home"></i>
                </span>
                <div className="media-body">
                  <h3>Buttonwood, California.</h3>
                  <p>Rosemead, CA 91770</p>
                </div>
              </div>
              <div className="media contact-info">
                <span className="contact-info__icon">
                  <i className="ti-tablet"></i>
                </span>
                <div className="media-body">
                  <h3>00 (440) 9865 562</h3>
                  <p>Mon to Fri 9am to 6pm</p>
                </div>
              </div>
              <div className="media contact-info">
                <span className="contact-info__icon">
                  <i className="ti-email"></i>
                </span>
                <div className="media-body">
                  <h3>support@colorlib.com</h3>
                  <p>Send us your query anytime!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
