import React from "react";
import { JobsType } from "../types/JobsType";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authData, fetchGetMe } from "../redux/slices/auth";
import axios from "../axios";
import { CiHeart } from "react-icons/ci";
import { VscHeartFilled } from "react-icons/vsc";
import { AppDispatch } from "../redux/store";

const JobItem: React.FC<JobsType> = ({
  _id,
  vacancy,
  location,
  employment,
  image,
  createdAt,
}) => {
  const randomNumber = Math.floor(Math.random() * 6) + 1;

  const dispatch = useDispatch<AppDispatch>();
  const userData = useSelector(authData);

  const handleAddFavorite = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    await axios.delete(`deleteFavorite/${_id}`);
    dispatch(fetchGetMe());
  };

  const handleRemoveFavorite = async (
    e: React.MouseEvent<HTMLAnchorElement>
  ) => {
    e.preventDefault();
    await axios.get(`addFavorite/${_id}`);
    dispatch(fetchGetMe());
  };

  return (
    <div className="col-lg-12 col-md-12">
      <div className="single_jobs white-bg d-flex justify-content-between">
        <div className="jobs_left d-flex align-items-center">
          <div className="thumb">
            {image ? (
              <img
                src={`http://localhost:3000${image}`}
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
            <Link to={`/jobs/${_id}`}>
              <h4>{vacancy}</h4>
            </Link>
            <div className="links_locat d-flex align-items-center">
              <div className="location">
                <p>
                  {" "}
                  <i className="fa fa-map-marker"></i> {location}
                </p>
              </div>
              <div className="location">
                <p>
                  {" "}
                  <i className="fa fa-clock-o"></i> {employment}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="jobs_right">
          <div className="apply_now">
            {userData?.role == "Employer" &&
              (userData.favorities.find((item) => item._id == _id) ? (
                <a className="heart_mark" href="#" onClick={handleAddFavorite}>
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
              ))}
            <Link to={`/jobs/${_id}`} className="boxed-btn3">
              {userData?.role == "Employer" ? "Apply Now" : "Read More"}
            </Link>
          </div>
          <div className="date">
            <p>Date line: {createdAt.slice(0, 10)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobItem;
