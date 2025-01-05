import React from "react";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import {Col, Card, Image } from "react-bootstrap";

import star from "../assets/star.png";
import { DEVICE_ROUTE } from "../utils/constants";

const DeviceItem = observer(({deviceItem}) => {
  const navigate = useNavigate();
  
  return (
    <Col md={3} onClick={() => navigate(DEVICE_ROUTE + '/' + deviceItem.id)}>
      <Card className="mt-4" style={{width: 150, cursor: "pointer"}} border={"light"}>
        <Image width={150} height={150} src={process.env.REACT_APP_API_URL + deviceItem.img}/>
          <div className="text-black-50 d-flex justify-content-between align-items-center mt-1">
              <div>Samsung...</div>
              <div className="d-flex align-items-center">
                <div>{deviceItem.rating}</div>
                <Image width={13} height={13} src={star}/>
              </div>
          </div>
          <div>{deviceItem.name}</div>
      </Card>
    </Col>
  );
});

export default DeviceItem;
