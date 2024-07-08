import React, { useEffect, useState } from "react";
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
import withoutAvatar from "../../public/img/without_avatar.png";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { AuthType } from "../types/AuthType";
import { Audio } from "react-loader-spinner";
import axios from "../axios";

const Profile: React.FC = () => {
  const [data, setData] = useState<AuthType>();
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  const handleProfile = async () => {
    const { data } = await axios.get<AuthType>(`/getProfile/${id}`);
    setData(data);
    setIsLoading(false);
  };

  useEffect(() => {
    handleProfile();
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="bradcam_area bradcam_bg_1">
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="bradcam_text">
                <h3>Profile</h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="d-flex justify-content-center p-5">
          <Audio height="350" width="350" color="grey" ariaLabel="loading" />
        </div>
      ) : (
        <section className="contact-section section_padding">
          <div className="container mt-5 mb-5">
            <div className="row no-gutters justify-content-center bg-dark">
              <div className="col-md-4 col-lg-4 pt-4 pb-4">
                <img
                  className="profile_img"
                  src={
                    data?.avatar
                      ? `http://localhost:3000${data?.avatar}`
                      : withoutAvatar
                  }
                />
              </div>
              <div className="col-md-12 col-lg-12">
                <div className="d-flex flex-column">
                  <div className="d-flex flex-row justify-content-between align-items-center bg-dark text-white name_company" style={{ borderTop: '1px solid #515151'}}>
                    <h3 className="display-5">{data?.name}</h3>
                    <i className="fa fa-facebook"></i>
                    <i className="fa fa-google"></i>
                    <i className="fa fa-youtube-play"></i>
                    <i className="fa fa-dribbble"></i>
                    <i className="fa fa-linkedin"></i>
                  </div>
                  <div
                    className="p-3 bg-black text-white d-flex justify-content-between align-items-center"
                    style={{
                      backgroundColor: "#343a40",
                      borderTop: "1px solid #515151",
                    }}
                  >
                    <h6>{data?.role}</h6>
                    {data?.role == "Employer" ? (
                      <h6>Speciality: {data?.speciality}</h6>
                    ) : (
                      <h6>
                        Company:{" "}
                        <Link
                          className="company_link"
                          style={{ paddingTop: 0 }}
                          to={`/companies/${data?.company[0]._id}`}
                        >
                          {data?.company[0].name}
                        </Link>
                      </h6>
                    )}
                  </div>
                  <div
                    className="d-flex flex-row justify-content-between align-items-cente p-3 bg-dark text-white"
                    style={{
                      backgroundColor: "#343a40",
                      borderTop: "1px solid #515151",
                    }}
                  >
                    <div className="d-flex flex-column">
                      <h4>About</h4>
                      {data?.about}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Profile;
