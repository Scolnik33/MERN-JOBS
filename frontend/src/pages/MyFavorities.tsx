import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFavoritiesJobs, selectJobs } from "../redux/slices/jobs";
import { Audio } from "react-loader-spinner";
import JobItem from "../components/JobItem";
import { AppDispatch } from "../redux/store";
import { authData, selectIsAuth } from "../redux/slices/auth";
import { Navigate } from "react-router";
import { Link } from "react-router-dom";

const MyFavorities: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, status } = useSelector(selectJobs);
  const isAuth = useSelector(selectIsAuth);
  const userData = useSelector(authData);
  const isLoading = status == "loading";

  useEffect(() => {
    dispatch(fetchFavoritiesJobs());
    window.scrollTo(0, 0);
  }, []);

  if (!isAuth && !window.localStorage.getItem('token') || userData?.role != 'Employer') {
    return <Navigate to={'/'}/>
  }

  return (
    <>
      <div className="bradcam_area bradcam_bg_1">
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="bradcam_text">
                <h3>My Favorities</h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="job_listing_area plus_padding">
        <div className="container">
          <div className="job_lists m-0">
            <div className="row justify-content-center pb-5">
              {isLoading ? (
                <div style={{ margin: "0 auto" }}>
                  <Audio
                    height="300"
                    width="300"
                    color="grey"
                    ariaLabel="loading"
                  />
                </div>
              ) : (
                items.length > 0 ? (
                  items.map((item) => <JobItem key={item._id} {...item} />)
                ) : (
                  <h2>Now your favorities is empty... <Link className="company_link" style={{ fontSize: '32px', color: '#212529'}} to={'/jobs'}>You can find one!</Link></h2>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyFavorities;
