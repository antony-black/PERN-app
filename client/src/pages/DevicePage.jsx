import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Col, Row, Image, Button, Card } from "react-bootstrap";

import bigStar from "../assets/big-star.png";
import { fetchOneDevice } from "../http/deviceAPI";

export default function DevicePage() {
  const {id} = useParams();
  const [device, setDevice] = useState({info: []});
  
  useEffect(() => {
    fetchOneDevice(id).then(data => setDevice(data))
  },[]);

  return (
    <Container className="mt-3">
      <Row>
        <Col md={4}>
          <Image src={process.env.REACT_APP_API_URL + device.img} width={300} height={300} />
        </Col>
        <Col md={4}>
          <Row className="d-flex flex-column align-items-center text-center">
            <h2>{device.name}</h2>
            <div
              className="d-flex align-items-center justify-content-center"
              style={{
                background: `url(${bigStar}) no-repeat center center`,
                width: 240,
                height: 240,
                backgroundSize: "cover",
                fontSize: 64,
              }}
            >
              {device.rating}
            </div>
          </Row>
        </Col>
        <Col md={4}>
          <Card
            className="d-flex flex-column align-items-center justify-content-around"
            style={{
              width: 300,
              height: 300,
              fontSize: 32,
              border: "5px solid lightgray",
            }}
          >
            <h3>from: {device.price}$</h3>
            <Button variant={"outline-dark"}>Add to cart</Button>
          </Card>
        </Col>
      </Row>
      <Row className="d-flex flex-column mt-3">
        <h2 style={{ fontWeight: 700, fontSize: 32 }}>Characters:</h2>
        {device.info.map((info, index) => (
          <Row
            key={info.id}
            style={{ background: index % 2 ? "lightgray" : "tranparent", padding: 10 }}
          >
            {info.title}: {info.description}
          </Row>
        ))}
      </Row>
    </Container>
  );
}
