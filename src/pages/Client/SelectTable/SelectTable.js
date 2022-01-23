import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";

import { useTable } from "../../../hooks";
import "./SelectTable.scss";

export function SelectTable() {
  let history = useNavigate();

  const [tableNum, setTableNum] = useState(null);
  const [error, setError] = useState(null);
  const { isExistTable } = useTable();

  const onSubmit = async () => {
    setError(null);
    if (!tableNum) {
      setError("No ha introducido ninguna mesa");
    } else {
      const exist = await isExistTable(tableNum);
      if (exist) history(`/client/${tableNum}`);
      else setError("El número de la mesa no existe!");
    }
  };

  return (
    <div className="select-table">
      <div className="select-table__content">
        <h1>Bienvenido a Parrilla Res</h1>
        <h2>Introducir el número de mesa</h2>

        <Form onSubmit={onSubmit}>
          <Form.Input
            min="1"
            placeholder="Ejem"
            type="number"
            onChange={(_, data) => setTableNum(data.value)}
          />
          <Button primary fluid>
            Ingresar
          </Button>
        </Form>
        <p className="select-table__content-error">{error}</p>
      </div>
    </div>
  );
}
