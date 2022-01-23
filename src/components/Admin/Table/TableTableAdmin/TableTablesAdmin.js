import React from "react";
import { Table, Button, Icon } from "semantic-ui-react";
import { map } from "lodash";
import "./TableTablesAdmin.scss";

export function TableTablesAdmin(props) {
  const { tables, updateTable, deleteTable } = props;

  return (
    <Table className="table-tables-admin">
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Numero</Table.HeaderCell>
          <Table.HeaderCell></Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {map(tables, (table, index) => (
          <Table.Row key={index}>
            <Table.Cell> {table.number}</Table.Cell>
            <Actions table={table} updateTable={updateTable} deleteTable = {deleteTable}/>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}

function Actions(props) {
  const { table, updateTable, deleteTable} = props;
  return (
    <Table.Cell textAlign="right">
      <Button icon onClick={() => updateTable(table)}>
        <Icon name="pencil" />
      </Button>
      <Button icon negative onClick={() => deleteTable(table)}>
        <Icon name="close" />
      </Button>
    </Table.Cell>
  );
}
