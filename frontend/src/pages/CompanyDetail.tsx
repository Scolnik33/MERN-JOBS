import React, { useEffect, useState } from "react";
import axios from "../axios";
import { useParams } from "react-router";
import { CompamiesType } from "../types/CompaniesType";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { authData, selectIsAuth } from "../redux/slices/auth";
import { Audio } from "react-loader-spinner";
// @ts-ignore
import ReactStars from "react-rating-stars-component";
import toast from "react-hot-toast";

const CompanyDetail: React.FC = () => {
  const [company, setCompany] = useState<CompamiesType>();
  const [isRated, setIsRated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const isAuth = useSelector(selectIsAuth);
  const userData = useSelector(authData);
  const { id } = useParams();

  const handleStars = async (newRating: number) => {
    toast.success("Оценка принята!");
    setIsRated(true);
    await axios.post(`/addRating/${id}`, {
      rating: newRating,
    });
  };

  const fetchOneCompany = async () => {
    const { data } = await axios.get<CompamiesType>(`getOneCompany/${id}`);
    setCompany(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchOneCompany();
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="bradcam_area bradcam_bg_1">
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="bradcam_text">
                <h3>Company</h3>
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
            <div className="row no-gutters">
              <div className="col-md-12 col-lg-12">
                <img
                  className="profile_img"
                  src={`http://localhost:3000${company?.image}`}
                />
              </div>
              <div className="col-md-12 col-lg-12">
                <div className="d-flex flex-column">
                  <div className="d-flex flex-row justify-content-between align-items-center bg-dark text-white name_company">
                    <h3 className="display-5">{company?.name}</h3>
                    <i className="fa fa-facebook"></i>
                    <i className="fa fa-google"></i>
                    <i className="fa fa-youtube-play"></i>
                    <i className="fa fa-dribbble"></i>
                    <i className="fa fa-linkedin"></i>
                  </div>
                  <div
                    className="p-4 bg-black text-white"
                    style={{
                      backgroundColor: "#343a40",
                      borderTop: "1px solid #515151",
                    }}
                  >
                    <h6>О компании:</h6>
                    {company?.description}
                    {isAuth &&
                      (company?.voters.find(
                        (item) => item._id == userData?._id
                      ) || isRated ? (
                        <h4 className="mt-4">
                          You have already given a rating.
                        </h4>
                      ) : (
                        <h4 className="mt-4">
                          Rating the company
                          <ReactStars
                            activeColor="#f6ff00"
                            count={5}
                            size={32}
                            onChange={handleStars}
                          />
                        </h4>
                      ))}
                  </div>
                  <div className="text-white">
                    <div className="p-4 bg-primary text-center skill-block w-100 h-100">
                      <h4>Company vacancies: </h4>
                      {company?.vacancies.length! > 1 ? (
                        company?.vacancies.map((item) => {
                          return (
                            <h6>
                              <Link
                                key={item._id}
                                to={`/jobs/${item._id}`}
                                className="company_link"
                              >
                                {item.vacancy}
                              </Link>
                            </h6>
                          );
                        })
                      ) : (
                        <h6 style={{ paddingBottom: "4px", paddingTop: "5px" }}>
                          The company does not have any vacancies yet
                        </h6>
                      )}
                    </div>
                    <div className="p-4 bg-success text-center skill-block w-100 h-100">
                      <h4>Company representatives: </h4>
                      {company?.representatives.map((item) => {
                        return (
                          <h6>
                            <Link
                              key={item._id}
                              to={`/profile/${item._id}`}
                              className="company_link"
                            >
                              {item.name}
                            </Link>
                          </h6>
                        );
                      })}
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

export default CompanyDetail;
