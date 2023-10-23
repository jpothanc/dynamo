import { AgGridReact } from "ag-grid-react";
import { useMemo, useRef, useEffect, useState } from "react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { useEventManager } from "../hooks/useEventManager";
import { EventType, globalEvent } from "../services/AppTypes";

type Props = {
  title: string;
  columnDefs: any;
  rowData: any;
  theme: string;
};
const offset = 120;

const BasicGrid = ({ title, columnDefs, rowData, theme }: Props) => {
  const [gridHeight, setGridHeight] = useState(window.innerHeight - offset);
  // const containerStyle = useMemo(
  //   () => ({ width: { gridHeight }, height: "100%" }),
  //   []
  // );

  const gridRef = useRef<AgGridReact>(null);
  const eventManager = useEventManager();

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
      cellStyle: { fontSize: "12px" },
    }),
    []
  );
  useEffect(() => {
    function handleResize() {
      setGridHeight(window.innerHeight - offset);
      console.log("window ht" + window.innerHeight);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // const gridStyle = useMemo(
  //   () => ({ height: gridHeight + "px", width: "100%" }),
  //   [gridHeight]
  // );

  useEffect(() => {
    eventManager.globalEvent().subscribe((event: globalEvent) => {
      if (
        event.eventType == EventType.Catalogue_Change ||
        event.eventType == EventType.Environment_Change
      ) {
        gridRef?.current?.api.setRowData([]);
      }
    });

    return () => {};
  }, []);

  const onSelectionChanged = () => {
    // debugger;
    const selectedRows = gridRef?.current?.api.getSelectedRows();
    console.log(selectedRows);
    // gridRef?.current?.api.applyTransaction({ add: [item] }); // Insert the row
  };
  function handleCellDoubleClicked(params: any) {
    const selectedValue = params.value;

    // Create a temporary input element to copy the text to the clipboard
    const tempInput = document.createElement("input");
    tempInput.value = selectedValue;
    document.body.appendChild(tempInput);
    tempInput.select();

    // Copy the selected text to the clipboard
    document.execCommand("copy");

    // Remove the temporary input element
    document.body.removeChild(tempInput);
  }

  // function test() {
  //   // Insert data into the grid
  //   const newRowData = { id: 3, name: "Alice" };
  //   gridRef?.current?.api?.applyTransaction({ add: [newRowData] });
  // }

  return (
    <>
      <div>
        <div
          className={theme}
          style={{ height: gridHeight + "px", width: "100%" }}
        >
          <AgGridReact
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            rowSelection="multiple"
            animateRows={false}
            ref={gridRef}
            onSelectionChanged={() => onSelectionChanged()}
            alwaysMultiSort={false}
            onCellDoubleClicked={handleCellDoubleClicked}
            tooltipHideDelay={1000}
          />
        </div>
        <footer className="footer">{title}</footer>
      </div>
    </>
  );
};

export default BasicGrid;
