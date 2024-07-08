import React from "react";
import { Link } from "react-router-dom";
import { CompamiesType } from "../types/CompaniesType";
import { FaStar } from "react-icons/fa";

const CompanyItem: React.FC<CompamiesType> = ({
  _id,
  name,
  image,
  rating,
  voters,
}) => {
  return (
    <div className="col-lg-4 col-xl-3 col-md-6">
      <div className="single_company">
        <div className="thumb">
          <img src={`http://localhost:3000${image}`} alt="" style={{ width: '43px', height: '48px'}}/>
        </div>
        <Link to={`/companies/${_id}`}>
          <h3>{name}</h3>
        </Link>
        <p>
          {" "}
          Rating: <span>{(rating && voters.length != 0) ? (rating / voters.length).toFixed(1) : 0} <FaStar style={{ paddingTop: '4px' }}/></span>
        </p>
      </div>
    </div>
  );
};

export default CompanyItem;
