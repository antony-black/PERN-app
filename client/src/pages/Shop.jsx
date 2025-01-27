import React, { useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Container, Row, Col } from "react-bootstrap";

import TypeBar from "../components/TypeBar";
import BrandBar from "../components/BrandBar";
import DeviceList from "../components/DeviceList";
import Pages from "../components/Pages";
import { Context } from "../main";
import { fetchBrands, fetchDevices, fetchTypes } from "../http/deviceAPI";

  const Shop = observer(() => {
    const {device} = useContext(Context);

    useEffect(() => {
      fetchTypes().then(data => device.setTypes(data));
      fetchBrands().then(data => device.setBrands(data));
      fetchDevices(null, null, 1, 2).then(data => {
        device.setDevices(data.rows);
        device.setTotalGoodCount(data.count);
      });
    },[]);

    useEffect(() => {
      fetchDevices(device.selectedType.id, device.selectedBrand.id, device.page, 2).then(data => {
        device.setDevices(data.rows);
        device.setTotalGoodCount(data.count);
      });
    },[device.page, device.selectedType, device.selectedBrand]);

  return (
    <Container>
      <Row className="mt-2">
        <Col md={3}>
          <TypeBar />
        </Col>
        <Col md={9}>
          <BrandBar />
          <DeviceList/>
          <Pages />
        </Col>
      </Row>
    </Container>
  );
});

export default Shop;
