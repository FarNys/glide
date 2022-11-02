import DataEditor, { GridCellKind } from "@glideapps/glide-data-grid";
import React, { useCallback } from "react";
import "@glideapps/glide-data-grid/dist/index.css";
import { data } from "./Data/data";
const App = () => {
  const getContent = React.useCallback((cell) => {
    const [col, row] = cell;
    const dataRow = data[row];
    const indexes = ["name", "company", "email", "phone"];
    const d = dataRow[indexes[col]];
    return {
      kind: GridCellKind.Text,
      allowOverlay: true,
      readonly: false,
      displayData: d,
      data: d,
    };
  }, []);

  const onCellEdited = React.useCallback((cell, newValue) => {
    if (newValue.kind !== GridCellKind.Text) {
      // we only have text cells, might as well just die here.
      return;
    }

    const indexes = ["name", "company", "email", "phone"];
    const [col, row] = cell;
    const key = indexes[col];
    data[row][key] = newValue.data;
  }, []);

  const columnResizeHandler = (props, x, t, a) => {
    console.log(props, x, t, a);
  };

  console.log(data);

  return (
    <div>
      <h1>Test Glide</h1>
      <DataEditor
        getCellContent={getContent}
        columns={columns}
        rows={data.length}
        onCellEdited={onCellEdited}
        onColumnResize={columnResizeHandler}
      />
    </div>
  );
};

export default App;

const columns = [
  {
    title: "Name",
    id: "name",
    width: 150,
  },
  {
    title: "Company",
    id: "company",
    width: 150,
  },
  {
    title: "Email",
    id: "email",
    width: 150,
  },
  {
    title: "Phone",
    id: "phone",
    width: 150,
  },
];
