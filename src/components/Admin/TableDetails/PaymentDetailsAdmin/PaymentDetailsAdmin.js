import React from "react";
import { Table, Button, Icon } from "semantic-ui-react";

import "./PaymentDetailsAdmin.scss";
import { usePayment, useOrder } from "../../../../hooks";

export function PaymentDetailsAdmin(props) {
  const { payment, orders, openCloseModal, onReloadOrders } = props;
  const { closePayment } = usePayment();
  const { closeOrder } = useOrder();

  const getIconPayment = (key) => {
    if (key === "TARJETA") return "credit card outline";
    if (key === "EFECTIVO") return "money bill alternate outline";
    return null;
  };

  const onCloseTable = async () => {
    const result = window.confirm("¿Cerrar mesa para nuevos clientes?");
    if (result) {
      await closePayment(payment.id);
      for await (const order of orders) {
        await closeOrder(order.id);
      }
      onReloadOrders();
      openCloseModal();
    }
  };

  return (
    <div className="payment-details-admin">
      <Table striped>
        <Table.Body>
          <Table.Row>
            <Table.Cell>Mesa: </Table.Cell>
            <Table.Cell>{payment.table_data.number}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Total</Table.Cell>
            <Table.Cell>$ {payment.totalPayment}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Forma de pago</Table.Cell>
            <Table.Cell>
              <Icon name={getIconPayment(payment.paymentType)} />
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
      <Button primary fluid onClick={onCloseTable}>
        Marcar como pagado y cerrar mesa
      </Button>
    </div>
  );
}
