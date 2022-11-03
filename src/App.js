import DataEditor, { GridCellKind } from "@glideapps/glide-data-grid";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import "@glideapps/glide-data-grid/dist/index.css";
import { data } from "./Data/data";
const App = () => {
  const [fakeData, setfakeData] = useState([]);
  useEffect(() => {
    let emptyList = [];
    for (let i = 0; i < 1000; i++) {
      const x = {
        name: i.toString(),
        company: "BUZZNESS",
        email: "hinesfowler@buzzness.com",
        phone: "+1 (869) 405-3127",
      };
      emptyList.push(x);
    }
    setfakeData(emptyList);
  }, []);
  console.log("RENDER");

  // const dataMemo = useMemo(() => {
  //   let emptyList = [];
  //   for (let i = 0; i < 1000; i++) {
  //     const x = {
  //       name: "Hines Fowler",
  //       company: "BUZZNESS",
  //       email: "hinesfowler@buzzness.com",
  //       phone: "+1 (869) 405-3127",
  //     };
  //     emptyList.push(x);
  //   }
  //   console.log(emptyList);
  //   return emptyList;
  // }, []);

  // const dataCreator = () => {
  //   let emptyList = [];
  //   for (let i = 0; i < 1000; i++) {
  //     const x = {
  //       name: "Hines Fowler",
  //       company: "BUZZNESS",
  //       email: "hinesfowler@buzzness.com",
  //       phone: "+1 (869) 405-3127",
  //     };
  //     emptyList.push(x);
  //   }
  //   return emptyList;
  // };
  // let dataStateless = dataCreator();

  const getContent = React.useCallback(
    (cell) => {
      if (fakeData.length > 1) {
        const [col, row] = cell;
        const dataRow = fakeData[row];
        const indexes = ["name", "company", "email", "phone"];
        const d = dataRow[indexes[col]];
        return {
          kind: GridCellKind.Text,
          allowOverlay: true,
          readonly: false,
          displayData: d,
          data: d,
        };
      }
      return [];
    },
    [fakeData.length]
  );
  console.log("GAV");
  const onCellEdited = React.useCallback(
    (cell, newValue) => {
      if (newValue.kind !== GridCellKind.Text) {
        // we only have text cells, might as well just die here.
        return;
      }
      console.log(cell, newValue);
      const indexes = ["name", "company", "email", "phone"];
      const [col, row] = cell;
      const key = indexes[col];
      // console.log(fakeData);
      // console.log(fakeData[row][key]);
      fakeData[row][key] = newValue.data;
    },
    [fakeData.length]
  );

  const columnResizeHandler = (props, x, t, a) => {
    console.log(props, x, t, a);
  };

  return (
    <div>
      <h1>Test Glide</h1>
      <div style={{ width: "500px", height: "600px", border: "1px solid red" }}>
        <DataEditor
          getCellContent={getContent}
          columns={columns}
          rows={fakeData.length}
          onCellEdited={onCellEdited}

          // onColumnResize={columnResizeHandler}
        />
      </div>
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
