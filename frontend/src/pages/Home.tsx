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
import "../../public/css/nice-select.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchJobs, selectJobs } from "../redux/slices/jobs";
import { AppDispatch } from "../redux/store";
import { Audio } from "react-loader-spinner";
import JobItem from "../components/JobItem";
import CategoryItem from "../components/CategoryItem";
import axios from "../axios";
import CompanyItem from "../components/CompanyItem";
import { fetchCompanies, selectCompanies } from "../redux/slices/company";
import PaginateItem from "../components/Paginate/PaginateItem";
import { pages } from "../components/Paginate/Pages";
import qs from "qs";
import toast from "react-hot-toast";

type CategoryType = {
  sum: number;
  _id: string;
};

const Home: React.FC = () => {
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const { items, status } = useSelector(selectJobs);
  const { itemsCompanies, statusCompanies } = useSelector(selectCompanies);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const isLoading = status == "loading";
  const isLoadingCompamies = statusCompanies == "loading";

  const handleCategories = async () => {
    const { data } = await axios.get<CategoryType[]>("/getCategories");
    setCategories(data);
  };

  useEffect(() => {
    dispatch(fetchJobs(''));
    dispatch(fetchCompanies(''));
    handleCategories();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);

    const queryString = qs.stringify({
      page,
      limit,
    });

    dispatch(fetchJobs(queryString));
    window.localStorage.removeItem("category");

    navigate(`?${queryString}`);
  }, [page, limit]);

  const handlePage = (sign: string) => {
    sign == "-" ? setPage(page - 1) : setPage(page + 1);
    window.localStorage.setItem("scroll", "yes");
  };

  if (window.localStorage.getItem("scroll")) {
    window.scrollTo(0, 1000);
    setTimeout(() => {
      window.localStorage.removeItem("scroll");
    }, 1);
  }

  switch (window.localStorage.getItem("toast")) {
    case "create":
      toast.success("Вакансия была успешно создана!");
      window.localStorage.removeItem("toast");
      break;
    case "delete":
      toast.success("Вакансия была успешно удалена!");
      window.localStorage.removeItem("toast");
      break;
    case "edit":
      toast.success("Вакансия была успешно редактирована!");
      window.localStorage.removeItem("toast");
      break;
    case "signIn":
      toast.success("Вы успешно вошли в аккаунт!");
      window.localStorage.removeItem("toast");
      break;
    case "signUp":
      toast.success("Вы успешно зарегистрировались!");
      window.localStorage.removeItem("toast");
      break;
    case "send":
      toast.success("Сообщение успешно отправлено!");
      window.localStorage.removeItem("toast");
      break;
    default:
      break;
  }

  return (
    <>
      <div className="slider_area">
        <div className="single_slider  d-flex align-items-center slider_bg_1">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-7 col-md-6">
                <div className="slider_text">
                  <h5
                    className="wow fadeInLeft"
                    data-wow-duration="1s"
                    data-wow-delay=".2s"
                  >
                    4536+ Jobs listed
                  </h5>
                  <h3
                    className="wow fadeInLeft"
                    data-wow-duration="1s"
                    data-wow-delay=".3s"
                  >
                    Find your Dream Job
                  </h3>
                  <p
                    className="wow fadeInLeft"
                    data-wow-duration="1s"
                    data-wow-delay=".4s"
                  >
                    We provide online instant cash loans with quick approval
                    that suit your term length
                  </p>
                  <div
                    className="sldier_btn wow fadeInLeft"
                    data-wow-duration="1s"
                    data-wow-delay=".5s"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="ilstration_img wow fadeInRight d-none d-lg-block text-right"
          data-wow-duration="1s"
          data-wow-delay=".2s"
        >
          <img src="img/banner/illustration.png" alt="" />
        </div>
      </div>

      <div className="popular_catagory_area">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section_title mb-40">
                <h3>Popolar Categories</h3>
              </div>
            </div>
          </div>
          <div className="row">
            {isLoading ? (
              <Audio
                height="150"
                width="150"
                color="grey"
                ariaLabel="loading"
              />
            ) : categories.length > 0 ? (
              categories.map((item) => (
                <CategoryItem
                  key={item._id}
                  category={item._id}
                  count={item.sum}
                />
              ))
            ) : (
              <h4 style={{ paddingLeft: "15px" }}>Categories not found</h4>
            )}
          </div>
        </div>
      </div>

      <div className="job_listing_area">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="section_title">
                <h3>Job Listing</h3>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="brouse_job text-right">
                <Link to={"/jobs"} className="boxed-btn4">
                  Browse More Job
                </Link>
              </div>
            </div>
          </div>
          <div className="job_lists">
            <div className="row justify-content-center">
              {isLoading ? (
                <Audio
                  height="150"
                  width="150"
                  color="grey"
                  ariaLabel="loading"
                />
              ) : items.length > 0 ? (
                <>
                  {items.map((item) => (
                    <JobItem key={item._id} {...item} />
                  ))}
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="pagination_wrap">
                        <ul>
                          {pages.map((item, index) => (
                            <PaginateItem
                              key={item}
                              lenght={items.length}
                              index={index}
                              page={page}
                              handlePage={handlePage}
                            />
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <h4 style={{ paddingLeft: "15px" }}>Jobs not found</h4>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="top_companies_area">
        <div className="container">
          <div className="row align-items-center mb-40">
            <div className="col-lg-6 col-md-6">
              <div className="section_title">
                <h3>Top Companies</h3>
              </div>
            </div>
            <div className="col-lg-6 col-md-6">
              <div className="brouse_job text-right">
                <Link to={"/companies"} className="boxed-btn4">
                  Browse More Companies
                </Link>
              </div>
            </div>
          </div>
          <div className="row">
            {isLoadingCompamies ? (
              <Audio
                height="150"
                width="150"
                color="grey"
                ariaLabel="loading"
              />
            ) : itemsCompanies.length > 0 ? (
              itemsCompanies.map((item) => (
                <CompanyItem key={item.description} {...item} />
              ))
            ) : (
              <h4 style={{ paddingLeft: "15px" }}>Companies not found</h4>
            )}
          </div>
        </div>
      </div>

      <div className="job_searcing_wrap overlay">
        <div className="container">
          <div className="row">
            <div className="col-lg-5 offset-lg-1 col-md-6">
              <div className="searching_text">
                <h3>Looking for a Job?</h3>
                <p>We provide online instant cash loans with quick approval </p>
                <Link to={"/jobs"} className="boxed-btn3">
                  Browse Job
                </Link>
              </div>
            </div>
            <div className="col-lg-5 offset-lg-1 col-md-6">
              <div className="searching_text">
                <h3>Looking for a Expert?</h3>
                <p>We provide online instant cash loans with quick approval </p>
                <Link to={"/create"} className="boxed-btn3">
                  Post a Job
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
