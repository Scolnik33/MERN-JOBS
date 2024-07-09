import React from "react";
import { Link } from "react-router-dom";

const NotFound: React.FC = () => {
  return (
    <div className="slider_area">
      <div className="single_slider d-flex align-items-center slider_bg_1">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-7 col-md-6">
              <div className="slider_text">
                <h3 className="wow fadeInLeft">This page doesn't exist</h3>
                <Link className="boxed-btn3 wow fadeInLeft" to={'/'}>Home</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
