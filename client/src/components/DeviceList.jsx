import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Row } from "react-bootstrap";
import { Context } from "../main";
import DeviceItem from "./DeviceItem";

const DeviceList = observer(() => {
  const { device } = useContext(Context);
  return (
    <Row className="d-flex">
      {device.devices.map((dev) => (
        <DeviceItem key={dev.id} deviceItem={dev}/>
      ))}
    </Row>
  );
});

export default DeviceList;
