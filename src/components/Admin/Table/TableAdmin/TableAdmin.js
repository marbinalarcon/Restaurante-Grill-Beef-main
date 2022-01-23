import React, { useEffect, useState } from "react";
import { size } from "lodash";
import classNames from "classnames";
import { Label } from "semantic-ui-react";
import { Link } from "react-router-dom";

import { getOrdersByTableApi } from "../../../../api/orders";
import "./TableAdmin.scss";
import { ORDER_STATUS } from "../../../../utils/constant";
import { ReactComponent as IcTable } from "../../../../assets/table.svg";
import { usePayment } from "../../../../hooks";

export function TableAdmin(props) {
  const { table, reload } = props;
  const [orders, setOrders] = useState([]);
  const [tableBusy, setTableBusy] = useState(false);
  const [pendingPaymente, setPendingPaymente] = useState(false);
  const { getPaymentByTable } = usePayment();

  useEffect(() => {
    (async () => {
      const response = await getOrdersByTableApi(
        table.id,
        ORDER_STATUS.PENDIENTE
      );
      setOrders(response);
    })();
  }, [reload]);

  useEffect(() => {
    (async () => {
      const response = await getOrdersByTableApi(
        table.id,
        ORDER_STATUS.ENTREGADO
      );

      if (size(response) > 0) setTableBusy(response);
      else setTableBusy(false);
    })();
  }, [reload]);

  useEffect(() => {
    (async () => {
      const response = await getPaymentByTable(table.id);
      if (size(response) > 0) setPendingPaymente(true);
      else setPendingPaymente(false);
    })();
  }, [reload]);

  return (
    <Link className="table-admin" to={`/admin/table/${table.id}`}>
      {size(orders) > 0 ? (
        <Label circular color="blue">
          {size(orders)}
        </Label>
      ) : null}

      {pendingPaymente && (
        <Label circular color="orange">
          Cuenta
        </Label>
      )}

      <IcTable
        className={classNames({
          pending: size(orders) > 0,
          busy: tableBusy,
          "pending-payment": pendingPaymente,
        })}
      />
      <p>Mesa No. {table.number}</p>
    </Link>
  );
}
