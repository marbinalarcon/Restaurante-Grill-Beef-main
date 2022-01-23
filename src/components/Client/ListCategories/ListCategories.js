import React from "react";
import { Image } from "semantic-ui-react";
import { map } from "lodash";
import { useLocation, useNavigate } from "react-router-dom";
import "./ListCategories.scss";

export function ListCategories(props) {
  const { categories } = props;
  const location = useLocation();
  const history = useNavigate();


  const goToCategory = (id) => {
    history(`${location.pathname}/${id}`);
  };

  return (
    <div className="list-categories-client">
      {map(categories, (category) => (
        <div
          key={category.id}
          className="list-categories-client__category"
          onClick={() => goToCategory(category.id)}
        >
          <Image src={category.image} size="small" />
          <span>{category.title}</span>
        </div>
      ))}
    </div>
  );
}
