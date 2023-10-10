import { AgGridReact } from "ag-grid-react";
import { useMemo, useRef, useEffect } from "react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { useEventManager } from "../hooks/useEventManager";
import { EventType, globalEvent } from "../services/EventManager";

type Props = {
  title: string;
  columnDefs: any;
  rowData: any;
  theme: string;
};

const BasicGrid = ({ title, columnDefs, rowData, theme }: Props) => {
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: 800, width: "100%" }), []);
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
      <h3>{title.toUpperCase()}</h3>
      <div style={containerStyle}>
        <div className={theme} style={gridStyle}>
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
          />
        </div>
      </div>
    </>
  );
};

export default BasicGrid;
