import React from "react";
import classNames from "classnames/bind";
import styles from "./DefaultLayout.module.scss";
const cx = classNames.bind(styles);

interface Props {
  children: React.ReactElement;
}

const DefaultLayout: React.FC<Props> = (props: Props) => {
  const { children } = props;
  return (
    <>
      <article className={cx("main")}>{children}</article>
    </>
  );
};

export default DefaultLayout;
