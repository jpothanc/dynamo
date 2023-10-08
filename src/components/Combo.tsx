import Select from "react-select";
import { useAppConfig } from "../hooks/useAppConfig";
import { useState, useEffect, useMemo } from "react";
import { useEventManager } from "../hooks/useEventManager";
import { globalEvent } from "../services/EventManager";

type selectOption = {
  value: string;
  label: string;
};

type Props = {
  name: string;
};

export const Combo = ({ name }: Props) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const appConfig = useAppConfig();
  const eventManager = useEventManager();

  const getOptions = (name: string): any => {
    var envs = appConfig.getEnvironments();
    const options: selectOption[] = [];
    envs.forEach((env) => {
      options.push({
        value: env.name,
        label: env.name,
      });
    });
    console.log("getOptions");

    return options;
  };

  const options = useMemo(() => getOptions(name), []);

  const handleSelectChange = (selectedOption: any) => {
    setSelectedOption(selectedOption);
    console.log(`Selected option:`, selectedOption);
    var eventData: globalEvent = {
      name: "SELECT_CHANGE:" + name,
      data: selectedOption,
    };
    eventManager.emitGlobalEvent(eventData);
  };

  return (
    <>
      <Select
        name={name}
        id={name}
        options={options}
        styles={{
          control: (baseStyles: any, state: any) => ({
            ...baseStyles,
            borderColor: state.isFocused ? "red" : "black",
            width: 200,
          }),
          singleValue: (provided, state) => ({
            ...provided,
            color: "black",
          }),
          menu: (provided) => ({
            ...provided,
            color: "black",
            position: "absolute",
            top: "-10%", // Adjust this value as needed to control the distance above the input
            left: 0, // You can adjust left and right to control horizontal positioning
            right: 0,
          }),
        }}
        onChange={handleSelectChange} // Set the onChange callback
      />
    </>
  );
};
