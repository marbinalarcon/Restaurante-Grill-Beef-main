import React, { useState, useEffect } from "react";
import { useOrder, useTable, usePayment } from "../../hooks";
import { map, size, forEach } from "lodash";
import { OrderHistoryItem } from "../../components/Client";
import { ModalConfirm } from "../../components/Common";
import { useParams } from "react-router-dom";
import { Button } from "semantic-ui-react";

export function OrdersHistory() {
  const [showTypePayment, setShowTypePayment] = useState(false);
  const [isRequestAccount, setIsRequestAccount] = useState(false);
  const [idTable, setIdTable] = useState(null);
  const { loading, orders, getOrdersByTable, addPaymentToOrder } = useOrder();
  const { getTableByNumber } = useTable();
  const { tableNumber } = useParams();
  const { createPayment, getPaymentByTable } = usePayment();

  useEffect(() => {
    (async () => {
      const table = await getTableByNumber(tableNumber);
      const idTableTemp = table[0].id;
      setIdTable(idTableTemp);

      getOrdersByTable(idTableTemp, "", "ordering=-status,-created_at");
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (idTable) {
        const response = await getPaymentByTable(idTable);
        setIsRequestAccount(response);
      }
    })();
  }, []);

  const onCreatePayment = async (paymentType) => {
    setShowTypePayment(false);
    let totalPayment = 0;
    forEach(orders, (order) => {
      totalPayment += Number(order.product_data.price);
    });

    const paymentData = {
      table: idTable,
      totalPayment: totalPayment.toFixed(3),
      paymentType,
      statusPayment: "PENDIENTE",
    };

    const payment = await createPayment(paymentData);
    for await (const order of orders) {
      await addPaymentToOrder(order.id, payment.id);
    }
    window.location.reload();
  };

  return (
    <div>
      <h1>Historial de pedidos</h1>

      {loading ? (
        <p>Cargando...</p>
      ) : (
        <>
          {size(orders) > 0 && (
            <Button
              primary
              fluid
              onClick={() =>
                size(isRequestAccount) === 0 && setShowTypePayment(true)
              }
            >
              {size(isRequestAccount) > 0
                ? "La cuenta ya esta pedida"
                : "Pedir la cuenta"}
            </Button>
          )}
          {map(orders, (order) => (
            <OrderHistoryItem key={order.id} order={order} />
          ))}
        </>
      )}
      <ModalConfirm
        title="Pagar con tarjeta o efectivo"
        show={showTypePayment}
        onCloseText="Efectivo"
        onClose={() => onCreatePayment("EFECTIVO")}
        onConfirmText="Tarjeta"
        onConfirm={() => onCreatePayment("TARJETA")}
      />
    </div>
  );
}
