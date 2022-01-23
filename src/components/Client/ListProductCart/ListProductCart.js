import React, { useEffect, useState } from "react";
import { Image, Button, Icon } from "semantic-ui-react";
import { map, forEach } from "lodash";
import { useParams, useNavigate } from "react-router-dom";
import "./ListProductCart.scss";

export function ListProductCart(props) {
  const { products } = props;

  return (
    <div className="list-product-cart">
      {map(products, (product, index) => (
        <div key={index} className="list-product-cart__product">
          <div>
            <Image src={product.image} rounded size="tiny" />
            <span>{product.title.substring(0, 20)}</span>
          </div>
            <span> {product.price} $ </span>
            <Icon name="close"/>
        </div>
      ))}

      <Button primary fluid>
          Realizar pedido
      </Button>
    </div>
  );
}
