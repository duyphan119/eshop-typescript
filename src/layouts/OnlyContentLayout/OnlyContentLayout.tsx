import React from "react";

interface Props {
  children: React.ReactElement;
}
const OnlyContentLayout: React.FC<Props> = (props: Props) => {
  const { children } = props;
  return children;
};

export default OnlyContentLayout;
