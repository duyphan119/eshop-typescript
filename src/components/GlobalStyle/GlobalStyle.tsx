import React from "react";
import "./GlobalStyle.scss";
interface Props {
  children: React.ReactElement;
}
const GlobalStyle: React.FC<Props> = ({ children }: Props) => {
  return children;
};

export default GlobalStyle;
