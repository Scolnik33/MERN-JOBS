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
import { Audio } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../redux/store";
import { fetchJobs, selectJobs } from "../redux/slices/jobs";
import JobItem from "../components/JobItem";
import ReactSelect from "react-select";
import qs from "qs";
import { OptionsType } from "../types/OptionsType";
import { useNavigate } from "react-router";
import {
  optionsCategory,
  optionsEmployment,
  optionsExperience,
} from "../Options/Options";
import PaginateItem from "../components/Paginate/PaginateItem";
import { pages } from "../components/Paginate/Pages";

const filterOptions: OptionsType[] = [
  {
    value: "popular",
    label: "Popular",
  },
  {
    value: "new",
    label: "New",
  },
  {
    value: "old",
    label: "Old",
  },
];

const locationOptions: OptionsType[] = [
  {
    value: "Russia",
    label: "Russia",
  },
  {
    value: "USA",
    label: "USA",
  },
  {
    value: "Monako",
    label: "Monako",
  },
  {
    value: "China",
    label: "China",
  },
  {
    value: "Italy",
    label: "Italy",
  },
  {
    value: "France",
    label: "France",
  },
  {
    value: "Germany",
    label: "Germany",
  },
  {
    value: "Britain",
    label: "Britain",
  },
  {
    value: "Turkey",
    label: "Turkey",
  },
  {
    value: "Spain",
    label: "Spain",
  },
];

const Jobs: React.FC = () => {
  const [value, setValue] = useState("");
  const [filter, setFilter] = useState("");
  const [location, setLocation] = useState("");
  const [employment, setEmployment] = useState("");
  const [experience, setExperience] = useState("");
  const [category, setCategory] = useState(
    window.localStorage.getItem("category") || ""
  );
  const [priceFrom, setPriceFrom] = useState<number | string>('');
  const [priceTo, setPriceTo] = useState<number | string>('');
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const { items, status } = useSelector(selectJobs);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const isLoading = status == "loading";

  const getValue = (value: string) => {
    return value ? optionsCategory.find((item) => item.value == value) : "";
  };

  const handleResetFields = () => {
    setValue("");
    setFilter("new");
    setLocation("");
    setEmployment("");
    setExperience("");
    setCategory("");
    setPriceFrom("");
    setPriceTo("");
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    const queryString = qs.stringify({
      filter,
      location,
      employment,
      experience,
      category,
      priceFrom,
      priceTo,
      page,
      limit,
    });

    dispatch(fetchJobs(queryString));
    window.localStorage.removeItem("category");

    navigate(`?${queryString}`);
    window.scrollTo(0, 300);
  }, [
    filter,
    location,
    employment,
    experience,
    category,
    priceFrom,
    priceTo,
    page,
    limit,
  ]);

  const handlePage = (sign: string) => {
    sign == "-" ? setPage(page - 1) : setPage(page + 1);
    window.localStorage.setItem("scroll", "yes");
  };

  if (window.localStorage.getItem("scroll")) {
    window.scrollTo(0, 300);
    setTimeout(() => {
      window.localStorage.removeItem("scroll");
    }, 1);
  }

  return (
    <>
      <div className="bradcam_area bradcam_bg_1">
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="bradcam_text">
                <h3>4536+ Jobs Available</h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="job_listing_area plus_padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <div className="job_filter white-bg">
                <div className="form_inner white-bg">
                  <h3>Filter</h3>
                  <form action="#">
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="single_field">
                          <input
                            type="text"
                            placeholder="Search keyword"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <ReactSelect
                          placeholder="Location"
                          options={locationOptions}
                          value={getValue(location)}
                          onChange={(newValue) => {
                            setLocation((newValue as OptionsType).value);
                          }}
                          isSearchable={false}
                        />
                      </div>
                      <div className="col-lg-12">
                        <ReactSelect
                          placeholder="Employment"
                          options={optionsEmployment}
                          value={getValue(employment)}
                          onChange={(newValue) => {
                            setEmployment((newValue as OptionsType).value);
                          }}
                          isSearchable={false}
                        />
                      </div>
                      <div className="col-lg-12">
                        <ReactSelect
                          placeholder="Experience"
                          options={optionsExperience}
                          value={getValue(experience)}
                          onChange={(newValue) => {
                            setExperience((newValue as OptionsType).value);
                          }}
                          isSearchable={false}
                        />
                      </div>
                      <div className="col-lg-12">
                        <ReactSelect
                          placeholder="Category"
                          options={optionsCategory}
                          value={getValue(category)}
                          onChange={(newValue) => {
                            setCategory((newValue as OptionsType).value);
                          }}
                          isSearchable={false}
                        />
                      </div>
                    </div>
                  </form>
                </div>
                <div className="range_wrap">
                  <label>Price range:</label>
                  <div className="single_field">
                    <input
                      type="number"
                      placeholder="From"
                      value={priceFrom}
                      onChange={(e) => setPriceFrom(Number(e.target.value))}
                    />
                  </div>
                  <div className="single_field">
                    <input
                      type="number"
                      placeholder="To"
                      value={priceTo}
                      onChange={(e) => setPriceTo(Number(e.target.value))}
                    />
                  </div>
                </div>
                <div className="reset_btn">
                  <button
                    onClick={handleResetFields}
                    className="boxed-btn3 w-100"
                    type="submit"
                  >
                    Reset
                  </button>
                </div>
              </div>
            </div>
            <div className="col-lg-9">
              <div className="recent_joblist_wrap">
                <div className="recent_joblist white-bg ">
                  <div className="row align-items-center">
                    <div className="col-md-6">
                      <h4>Job Listing</h4>
                    </div>
                    <div className="col-md-6">
                      <div className="serch_cat d-flex justify-content-end">
                        <ReactSelect
                          placeholder="Filter"
                          options={filterOptions}
                          value={
                            !filter
                              ? { value: "new", label: "New" }
                              : getValue(filter)
                          }
                          onChange={(newValue) => {
                            setFilter((newValue as OptionsType).value);
                          }}
                          isSearchable={false}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="job_lists m-0">
                <div className="row justify-content-center">
                  {isLoading ? (
                    <div style={{ margin: "0 auto" }}>
                      <Audio
                        height="300"
                        width="300"
                        color="grey"
                        ariaLabel="loading"
                      />
                    </div>
                  ) : items.length > 0 ? (
                    <>
                      {items
                        .filter((item) => {
                          return item.vacancy
                            .toLowerCase()
                            .includes(value.toLowerCase());
                        })
                        .map((item) => (
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
                    <h2 className="p-5">Jobs not found</h2>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Jobs;
