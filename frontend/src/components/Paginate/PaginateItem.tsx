import React from "react";

type PaginateItemProps = {
  lenght: number;
  index: number;
  page: number;
  handlePage: (sign: string) => void;
};

const PaginateItem: React.FC<PaginateItemProps> = ({
  lenght,
  index,
  page,
  handlePage,
}) => {
  return (
    <li>
      {index == 0
        ? page > 1 && (
            <a className="paginate_arrow">
              <i onClick={() => handlePage("-")} className="ti-angle-left"></i>
            </a>
          )
        : page < lenght - 1 && (
            <a className="paginate_arrow">
              <i onClick={() => handlePage("+")} className="ti-angle-right"></i>
            </a>
          )}
    </li>
  );
};

export default PaginateItem;
