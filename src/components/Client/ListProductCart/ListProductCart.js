import React, { useEffect, useState } from "react";
import { Image, Button, Icon } from "semantic-ui-react";
import { map, forEach } from "lodash";
import { removeProductCartApi, cleanProductCartApi } from "../../../api/cart";
import { useParams, useNavigate } from "react-router-dom";
import { useOrder, useTable } from "../../../hooks";
import "./ListProductCart.scss";
import { toast } from "react-toastify";

export function ListProductCart(props) {
  const { products, onReloadCart } = props;
  const [total, seTtotal] = useState(0);
  const { addOrderToTable } = useOrder();
  const { getTableByNumber } = useTable();
  const { tableNumber } = useParams();
  const history = useNavigate();

  useEffect(() => {
    let totalTemp = 0;
    forEach(products, (product) => {
      totalTemp += Number(product.price);
    });
    seTtotal(totalTemp.toFixed(3));
  }, [products]);

  const removeProduct = (index) => {
    removeProductCartApi(index);
    onReloadCart();
    toast.info("Eliminado exitosamente");
  };

  const createOrder = async () => {
    const tableData = await getTableByNumber(tableNumber);
    const idTable = tableData[0].id;
    for await (const product of products) {
      await addOrderToTable(idTable, product.id);
    }
    cleanProductCartApi();
    history(`/client/${tableNumber}/orders`);
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

      <Button primary fluid onClick={createOrder}>
        Realizar pedido ($ {total})
      </Button>
    </div>
  );
}
