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
import { useNavigate, useParams } from "react-router";
import axios from "../axios";
import { JobsType } from "../types/JobsType";
import { Audio } from "react-loader-spinner";
import { Link } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { useSelector, useDispatch } from "react-redux";
import { authData } from "../redux/slices/auth";
import { AppDispatch } from "../redux/store";
import {
  fetchFavoritiesJobs,
  fetchJobs,
  selectJobs,
} from "../redux/slices/jobs";
import { CompamiesType } from "../types/CompaniesType";
import { CiHeart } from "react-icons/ci";
import { VscHeartFilled } from "react-icons/vsc";
import toast from "react-hot-toast";

const JobDetail: React.FC = () => {
  const randomNumber = Math.floor(Math.random() * 6) + 1;

  const userData = useSelector(authData);
  const favorities = useSelector(selectJobs);
  const dispatch = useDispatch<AppDispatch>();
  const [data, setData] = useState<JobsType>();
  const [company, setCompany] = useState<CompamiesType>();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();

  const fetchOneJob = async () => {
    const { data } = await axios.get<JobsType>(`/getone/${id}`);
    setData(data);
    setIsLoading(false);
  };

  const fetchOneCompany = async () => {
    const { data } = await axios.get<CompamiesType>(`getOneForJob/${id}`);
    setCompany(data[0]);
  };

  const handleRemove = async () => {
    await axios.delete(`/delete/${data?._id}`);
    window.localStorage.setItem('toast', 'delete');

    navigate("/");
  };

  const handleSendMessage = () => {
    window.localStorage.setItem('toast', 'send');
    navigate('/');
  }

  const handleAddFavorite = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    await axios.delete(`deleteFavorite/${data?._id}`);
    dispatch(fetchJobs(''));
  };

  const handleRemoveFavorite = async (
    e: React.MouseEvent<HTMLAnchorElement>
  ) => {
    e.preventDefault();
    await axios.get(`addFavorite/${data?._id}`);
    dispatch(fetchJobs(''));
    dispatch(fetchFavoritiesJobs());
  };

  useEffect(() => {
    dispatch(fetchFavoritiesJobs());
    fetchOneJob();
    fetchOneCompany();
    window.scrollTo(0, 0);
  }, []);


  if ((window.localStorage.getItem('toast') == 'edit')) {
    toast.success('Вакансия была успешно обновлена!');
    window.localStorage.removeItem('toast');
  }

  return (
    <>
      <div className="bradcam_area bradcam_bg_1">
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="bradcam_text">
                <h3>{data?.vacancy}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div
          className="d-flex justify-content-center"
          style={{ paddingTop: "100px", paddingBottom: "200px" }}
        >
          <Audio height="300" width="300" color="grey" ariaLabel="loading" />
        </div>
      ) : (
        <div className="job_details_area">
          <div className="container">
            <div className="row">
              <div className="col-lg-8">
                <div className="job_details_header">
                  <div className="single_jobs white-bg d-flex justify-content-between">
                    <div className="jobs_left d-flex align-items-center">
                      <div className="thumb">
                        {data?.image ? (
                          <img
                            src={`http://localhost:3000${data.image}`}
                            alt=""
                            style={{ width: "48px", height: "48px" }}
                          />
                        ) : (
                          <img
                            src={`/img/svg_icon/${randomNumber}.svg`}
                            alt=""
                            style={{ width: "48px", height: "48px" }}
                          />
                        )}
                      </div>
                      <div className="jobs_conetent">
                        <h3>{data?.vacancy}</h3>
                        <div className="links_locat d-flex align-items-center">
                          <div className="location">
                            <p>
                              {" "}
                              <i className="fa fa-map-marker"></i>
                              {data?.location}
                            </p>
                          </div>
                          <div className="location">
                            <p>
                              {" "}
                              <i className="fa fa-clock-o"></i>
                              {data?.employment}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="jobs_right">
                      <div className="apply_now">
                        {userData?.role == "Employer" && (
                          <div className="heart_mark">
                            {favorities.items.find((item) => item._id == id) ? (
                              <a
                                className="heart_mark"
                                href="#"
                                onClick={handleAddFavorite}
                              >
                                <VscHeartFilled />
                              </a>
                            ) : (
                              <a
                                className="heart_mark"
                                href="#"
                                onClick={handleRemoveFavorite}
                              >
                                <CiHeart />
                              </a>
                            )}
                          </div>
                        )}
                        {data?.user._id == userData?._id && (
                          <>
                            <Link
                              to={`/edit/${data?._id}`}
                              className="heart_mark_grey"
                            >
                              <FaPencil />
                            </Link>
                            <div
                              className="heart_mark_red"
                              onClick={handleRemove}
                            >
                              <FaTrashAlt />
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="descript_wrap white-bg">
                  <div className="single_wrap">
                    <h4>Job description</h4>
                    <p>{data?.description}</p>
                  </div>
                </div>
                <div className="apply_job_form white-bg">
                  <h4>Apply for the job</h4>
                  <form action="#">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="input_field">
                          <input type="text" placeholder="Your name" />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="input_field">
                          <input type="text" placeholder="Email" />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="input_field">
                          <input
                            type="text"
                            placeholder="Website/Portfolio link"
                          />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="input-group">
                          <div className="input-group-prepend">
                            <button type="button" id="inputGroupFileAddon03">
                              <i
                                className="fa fa-cloud-upload"
                                aria-hidden="true"
                              ></i>
                            </button>
                          </div>
                          <div className="custom-file">
                            <input
                              type="file"
                              className="custom-file-input"
                              id="inputGroupFile03"
                              aria-describedby="inputGroupFileAddon03"
                            />
                            <label className="custom-file-label">
                              Upload CV
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="input_field">
                          <textarea
                            name="#"
                            id=""
                            placeholder="Coverletter"
                          ></textarea>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="submit_btn">
                          <button onClick={handleSendMessage} className="boxed-btn3 w-100" type="submit">
                            Apply Now
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="job_sumary">
                  <div className="summery_header">
                    <h3>Job Summery</h3>
                  </div>
                  <div className="job_content">
                    <ul>
                      <li>
                        Published on:{" "}
                        <span>{data?.createdAt.slice(0, 10)}</span>
                      </li>
                      <li>
                        Vacancy: <span>{data?.vacancy}</span>
                      </li>
                      <li>
                        Category: <span>{data?.category}</span>
                      </li>
                      <li>
                        Salary: <span>{data?.salary}$ in year</span>
                      </li>
                      <li>
                        Location: <span>{data?.location}</span>
                      </li>
                      <li>
                        Employment: <span>{data?.employment}</span>
                      </li>
                      <li>
                        Experience: <span>{data?.experience}</span>
                      </li>
                    </ul>
                  </div>
                  <div className="job_content">
                    Company:{" "}
                    <h4>
                      <Link to={`/companies/${company?._id}`}>
                        {company?.name}
                      </Link>
                    </h4>
                  </div>
                </div>
                <div className="share_wrap d-flex">
                  <span>Share at:</span>
                  <ul>
                    <li>
                      <a href="#">
                        {" "}
                        <i className="fa fa-facebook"></i>
                      </a>{" "}
                    </li>
                    <li>
                      <a href="#">
                        {" "}
                        <i className="fa fa-google-plus"></i>
                      </a>{" "}
                    </li>
                    <li>
                      <a href="#">
                        {" "}
                        <i className="fa fa-twitter"></i>
                      </a>{" "}
                    </li>
                    <li>
                      <a href="#">
                        {" "}
                        <i className="fa fa-envelope"></i>
                      </a>{" "}
                    </li>
                  </ul>
                </div>
                <div className="job_location_wrap"></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default JobDetail;
