import styled from "styled-components";
import Select from "react-select";
export const StyledButton = styled.button`
  background-color: ${(props) => props.$backColor || "#BF4F74"};
  color: ${(props) => props.$color || "white"};
  padding: 6px 6px;
  font-size: 12px;
  text-transform: uppercase;
  font-weight: 500;
  font-family: "inter", sans-serif;
  transition: background-color 0.3s ease; /* Add a smooth transition */

  // &:hover {
  //   background-color: darkblue; /* Change the background color on hover */
  &:hover {
    filter: brightness(1.5); /* Increase brightness on hover */
  }
`;

export const SelectContainer = styled(Select)`
  z-index: 100 !important; //fix opacity problem of select dropdown
`;
export default StyledButton;
