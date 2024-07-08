import React from "react";
import { Link } from "react-router-dom";

type CategoryProps = {
  category: string;
  count: number;
};

const CategoryItem: React.FC<CategoryProps> = ({ category, count }) => {

  const rememberCatergory = () => {
    window.localStorage.setItem('category', category);
  }

  return (
    <div className="col-lg-4 col-xl-3 col-md-6">
      <div className="single_catagory">
        <Link to={"/jobs"}>
          <h4 onClick={rememberCatergory}>{category}</h4>
        </Link>
        <p>
          {" "}
          <span>{count}</span> Available position
        </p>
      </div>
    </div>
  );
};

export default CategoryItem;
