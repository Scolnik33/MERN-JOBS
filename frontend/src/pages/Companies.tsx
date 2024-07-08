import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCompanies, selectCompanies } from "../redux/slices/company";
import { Audio } from "react-loader-spinner";
import CompanyItem from "../components/CompanyItem";
import { AppDispatch } from "../redux/store";
import PaginateItem from "../components/Paginate/PaginateItem";
import { pages } from "../components/Paginate/Pages";
import { useNavigate } from "react-router";
import qs from "qs";

const Companies: React.FC = () => {
  const [page, setPage] = useState(1);
  const [limit] = useState(4);
  const { itemsCompanies, statusCompanies } = useSelector(selectCompanies);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const isLoading = statusCompanies == "loading";

  useEffect(() => {
    window.scrollTo(0, 0);

    const queryString = qs.stringify({
      page,
      limit,
    });

    dispatch(fetchCompanies(queryString));

    navigate(`?${queryString}`);
  }, [page, limit]);

  const handlePage = (sign: string) => {
    sign == "-" ? setPage(page - 1) : setPage(page + 1);
    window.localStorage.setItem("scroll", "yes");
  };

  return (
    <>
      <div className="bradcam_area bradcam_bg_1">
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="bradcam_text">
                <h3>Companies</h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="job_listing_area plus_padding">
        <div className="container">
          <div className="job_lists m-0">
            <div className="row">
              {isLoading ? (
                <div style={{ margin: "0 auto" }}>
                  <Audio
                    height="300"
                    width="300"
                    color="grey"
                    ariaLabel="loading"
                  />
                </div>
              ) : itemsCompanies.length > 0 ? (
                itemsCompanies.map((item) => (
                  <CompanyItem key={item.description} {...item} />
                ))
              ) : (
                <h4 style={{ paddingLeft: "15px" }}>Companies not found</h4>
              )}
            </div>
            <div className="row">
              <div className="col-lg-12">
                <div className="pagination_wrap">
                  <ul>
                    {pages.map((item, index) => (
                      <PaginateItem
                        key={item}
                        lenght={itemsCompanies.length}
                        index={index}
                        page={page}
                        handlePage={handlePage}
                      />
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Companies;
