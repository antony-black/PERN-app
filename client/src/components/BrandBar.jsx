import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Card, Row } from "react-bootstrap";
import { Context } from "../main";

const BrandBar = observer(() => {
  const { device } = useContext(Context);
  return (
      <Row className="d-flex">
        {device.brands.map((brand) => (
          <Card
            className="p-3"
            style={{ cursor: "pointer", maxWidth: 200}}
            border={brand.id === device.selectedBrand.id ? "danger" : "light"}
            key={brand.id}
            onClick={() => device.setSelectedBrand(brand)}
          >
            {brand.name}
          </Card>
        ))}
      </Row>
  );
});

export default BrandBar;
