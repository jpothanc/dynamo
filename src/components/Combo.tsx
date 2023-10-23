import Select, { SingleValue } from "react-select";
import { useEffect, useMemo, useState } from "react";
import { selectOption } from "../services/AppTypes";

type Props = {
  name: string;
  selectOptions: selectOption[];
  defaultSelectedItem: SingleValue<selectOption>;
  onSelectionChange: (selectedOption: SingleValue<selectOption>) => void;
};

export const Combo = ({
  name,
  selectOptions,
  defaultSelectedItem,
  onSelectionChange,
}: Props) => {
  const options = useMemo(() => selectOptions, [selectOptions]);
  const [selectectedItem, setSelectedItem] = useState<
    SingleValue<selectOption> | undefined
  >();

  const handleSelectChange = (newValue: SingleValue<selectOption>) => {
    onSelectionChange(newValue);
    setSelectedItem(newValue);
  };

  useEffect(() => {
    if (selectectedItem == undefined) handleSelectChange(defaultSelectedItem);
  }, []);

  return (
    <div>
      <Select
        name={name}
        id={name}
        options={options}
        value={selectectedItem}
        styles={{
          control: (baseStyles: any, state: any) => ({
            ...baseStyles,
            borderColor: state.isFocused ? "red" : "rgb(164, 168, 171)",
            width: 200,
            height: 10,
            background: "rgb(39, 44, 51)",
          }),
          singleValue: (provided) => ({
            ...provided,
            color: "white",
          }),
          menu: (provided) => ({
            ...provided,
            color: "white",
            position: "absolute",
            top: "-10%", // Adjust this value as needed to control the distance above the input
            left: 0, // You can adjust left and right to control horizontal positioning
            right: 0,
            background: "rgb(39, 44, 51)",
          }),
        }}
        onChange={handleSelectChange} // Set the onChange callback
      />
    </div>
  );
};
