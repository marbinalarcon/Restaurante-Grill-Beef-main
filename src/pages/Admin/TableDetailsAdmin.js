import React, { useState, useEffect, Component } from "react";
import { useParams } from "react-router-dom";
import { Loader } from "semantic-ui-react";
import { forEach, size } from "lodash";

import { HeaderPage, AddOrderFormAdmin } from "../../components/Admin";
import { ModalBasic } from "../../components/Common";
import {
  ListOrderAdmin,
  PaymentDetailsAdmin,
} from "../../components/Admin/TableDetails";
import { useOrder, useTable, usePayment } from "../../hooks";

export function TableDetailsAdmin() {
  const [reloadOrders, setReloadOrders] = useState(false);
  const { id } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [paymentData, setPaymentData] = useState(null);

  const { loading, orders, getOrdersByTable, addPaymentToOrder } = useOrder();
  const { table, getTable } = useTable();
  const { createPayment, getPaymentByTable } = usePayment();

  useEffect(() => {
    getOrdersByTable(id, "", "ordering=-status, created_at");
  }, [id, reloadOrders]);

  useEffect(() => getTable(id), [id]);

  useEffect(() => {
    (async () => {
      const response = await getPaymentByTable(id);
      if (size(response) > 0) setPaymentData(response[0]);
    })();
  }, [reloadOrders]);

  const onReloadOrders = () => setReloadOrders((prev) => !prev);
  const openCloseModal = () => setShowModal((prev) => !prev);

  const onCreatePaymente = async () => {
    const result = window.confirm(
      "Estas seguro de generar la cuenta de la mesa?"
    );
    if (result) {
      let totalPayment = 0;

      forEach(orders, (order) => {
        totalPayment += Number(order.product_data.price);
      });

      const resultTypePayment = window.confirm(
        "ACEPTAR => TARJETA, CANCELAR => EFECTIVO"
      );

      const paymentData = {
        table: id,
        totalPayment: totalPayment.toFixed(3),
        paymentType: resultTypePayment ? "TARJETA" : "EFECTIVO",
        statusPayment: "PENDIENTE",
      };

      const payment = await createPayment(paymentData);

      for await (const order of orders) {
        await addPaymentToOrder(order.id, payment.id);
      }
      onReloadOrders();
    }
  };

  return (
    <>
      <HeaderPage
        title={`Mesa ${table?.number || ""}`}
        btnTitle={paymentData ? "Ver cuenta" : "Añadir pedido"}
        btnClick={openCloseModal}
        btnTitleTwo={!paymentData ? "Generar cuenta" : null}
        btnClickTwo={onCreatePaymente}
      />
      {loading ? (
        <Loader active inline="centered">
          Cargando...
        </Loader>
      ) : (
        <ListOrderAdmin orders={orders} onReloadOrders={onReloadOrders} />
      )}
      <ModalBasic
        show={showModal}
        onClose={openCloseModal}
        title="Generar pedido"
      >
        {paymentData ? (
          <PaymentDetailsAdmin
            payment={paymentData}
            orders={orders}
            openCloseModal={openCloseModal}
            onReloadOrders={onReloadOrders}
          />
        ) : (
          <AddOrderFormAdmin
            idTable={id}
            openCloseModal={openCloseModal}
            onReloadOrders={onReloadOrders}
          />
        )}
      </ModalBasic>
    </>
  );
}
