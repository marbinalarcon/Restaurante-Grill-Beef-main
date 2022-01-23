import React, { useEffect } from "react";
import { Container, Button, Icon } from "semantic-ui-react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useTable } from "../../hooks";
import "./ClientLayouts.scss";

export function ClientLayouts(props) {
  const { children } = props;
  const { isExistTable } = useTable();
  const { tableNumber } = useParams();
  let history = useNavigate();

  useEffect(() => {
    (async () => {
      const exist = await isExistTable(tableNumber);
      if (!exist) closeTable();
    })();
  }, [tableNumber]);

  const closeTable = () => {
    history("/");
  };

  const goTocart = () => {
    history(`/client/${tableNumber}/cart`);
  };

  const goToOrders = () => {
    history(`/client/${tableNumber}/orders`);
  };

  return (
    <div className="client-layout-bg">
      <Container className="client-layout">
        <div className="client-layout__header">
          <Link to={`/client/${tableNumber}`}>
            <h1>Restaurante Grill Beef</h1>
          </Link>
          <span>Mesa {tableNumber}</span>
          <div>
            <Button icon onClick={goTocart}>
              <Icon name="shop" />
            </Button>
            <Button icon onClick={goToOrders}>
              <Icon name="list" />
            </Button>
            <Button icon onClick={closeTable}>
              <Icon name="sign-out" />
            </Button>
          </div>
        </div>

        <div className="client-layout__content">{children}</div>
      </Container>
    </div>
  );
}
