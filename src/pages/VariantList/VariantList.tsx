import { Col, Row } from "antd";
import config from "config";
import { useTitle } from "hooks/useTitle";
import React from "react";
import VariantPaper from "./VariantPaper";
import VariantValuePaper from "./VariantValuePaper";

const VariantList: React.FC = () => {
  useTitle(config.titles.variantList);
  return (
    <Row gutter={[8, 8]}>
      <Col xs={24} md={10}>
        <VariantPaper />
      </Col>
      <Col xs={24} md={14}>
        <VariantValuePaper />
      </Col>
    </Row>
  );
};

export default VariantList;
