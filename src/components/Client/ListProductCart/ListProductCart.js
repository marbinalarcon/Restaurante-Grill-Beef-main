import React, { useEffect, useState } from "react";
import { Image, Button, Icon } from "semantic-ui-react";
import { map, forEach } from "lodash";
import { removeProductCartApi } from "../../../api/cart";
import { useParams, useNavigate } from "react-router-dom";

import "./ListProductCart.scss";
import { toast } from "react-toastify";

export function ListProductCart(props) {
  const { products, onReloadCart } = props;

  const removeProduct = (index) => {
    removeProductCartApi(index);
    onReloadCart();
    toast.info("Eliminado exitosasmente");
  };

  return (
    <div className="list-product-cart">
      {map(products, (product, index) => (
        <div key={index} className="list-product-cart__product">
          <div>
            <Image src={product.image} rounded size="tiny" />
            <span>{product.title.substring(0, 20)}</span>
          </div>
          <span> {product.price} $ </span>
          <Icon name="close" onClick={() => removeProduct(index)} />
        </div>
      ))}

      <Button primary fluid>
        Realizar pedido
      </Button>
    </div>
  );
}
