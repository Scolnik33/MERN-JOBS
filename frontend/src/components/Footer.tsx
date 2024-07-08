import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer_top">
        <div className="container">
          <div className="row">
            <div className="col-xl-3 col-md-6 col-lg-3">
              <div
                className="footer_widget wow fadeInUp"
                data-wow-duration="1s"
                data-wow-delay=".3s"
              >
                <div className="footer_logo">
                  <a href="#">
                    <img src="img/logo.png" alt="" />
                  </a>
                </div>
                <div className="socail_links">
                  <ul>
                    <li>
                      <a href="#">
                        <i className="ti-facebook"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fa fa-google-plus"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fa fa-twitter"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fa fa-instagram"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-xl-2 col-md-6 col-lg-2">
              <div
                className="footer_widget wow fadeInUp"
                data-wow-duration="1.1s"
                data-wow-delay=".4s"
              >
                <h3 className="footer_title">Company</h3>
                <ul>
                  <li>
                    <a href="#">About </a>
                  </li>
                  <li>
                    <a href="#"> Pricing</a>
                  </li>
                  <li>
                    <a href="#">Carrier Tips</a>
                  </li>
                  <li>
                    <a href="#">FAQ</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-xl-3 col-md-6 col-lg-3">
              <div
                className="footer_widget wow fadeInUp"
                data-wow-duration="1.2s"
                data-wow-delay=".5s"
              >
                <h3 className="footer_title">Category</h3>
                <ul>
                  <li>
                    <a href="#">Design & Art</a>
                  </li>
                  <li>
                    <a href="#">Engineering</a>
                  </li>
                  <li>
                    <a href="#">Sales & Marketing</a>
                  </li>
                  <li>
                    <a href="#">Finance</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-xl-4 col-md-6 col-lg-4">
              <div
                className="footer_widget wow fadeInUp"
                data-wow-duration="1.3s"
                data-wow-delay=".6s"
              >
                <h3 className="footer_title">Subscribe</h3>
                <form action="#" className="newsletter_form">
                  <input type="text" placeholder="Enter your mail" />
                  <button type="submit">Subscribe</button>
                </form>
                <p className="newsletter_text">
                  Esteem spirit temper too say adieus who direct esteem esteems
                  luckily.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="copy-right_text wow fadeInUp"
        data-wow-duration="1.4s"
        data-wow-delay=".3s"
      >
        <div className="container">
          <div className="footer_border"></div>
          <div className="row">
            <div className="col-xl-12">
              <p className="copy_right text-center">
                {/* <!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. -->
Copyright &copy;<script>document.write(new Date().getFullYear());</script> All rights reserved | This template is made with <i className="fa fa-heart-o" aria-hidden="true"></i> by <a href="https://colorlib.com" target="_blank">Colorlib</a>
<!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. --> */}
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
