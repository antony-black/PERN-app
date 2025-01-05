import React, { useContext, useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Modal, Button, Form, Dropdown, Row, Col } from "react-bootstrap";

import { Context } from "../../main";
import { fetchTypes, fetchBrands, fetchDevices, createDevice } from "../../http/deviceAPI";

const CreateDevice = observer(({ show, onHide }) => {
  const { device } = useContext(Context);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [file, setFile] = useState(null);
  const [info, setInfo] = useState([]);

  useEffect(() => {
    fetchTypes().then(data => device.setTypes(data));
    fetchBrands().then(data => device.setBrands(data));
    // fetchDevices().then(data => device.setDevices(data.rows));
  },[]);

  const addInfo = () => {
    setInfo([...info, { title: "", description: "", number: Date.now() }]);
  };

  const cancelInfo = (number) => {
    setInfo(info.filter((i) => i.number !== number));
  };

  const changeInfo = (keyId, value, number) => {
    setInfo(
      info.map((i) => (i.number === number ? { ...i, [keyId]: value } : i))
    );
  };

  const addDevice = () => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('img', file);
    formData.append('brandId', device.selectedBrand.id);
    formData.append('typeId', device.selectedType.id);
    formData.append('info', JSON.stringify(info));
    createDevice(formData).then(data => onHide());
  }

  const selectFile = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add new device
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Dropdown className="mt-2 mb-2">
            <Dropdown.Toggle>{device.selectedType?.name || "Choose type"}</Dropdown.Toggle>
            <Dropdown.Menu>
              {device.types.map((type) => (
                <Dropdown.Item
                  key={type.id}
                  onClick={() => device.setSelectedType(type)}
                >
                  {type.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown className="mt-2 mb-2">
            <Dropdown.Toggle>{device.selectedBrand?.name || "Choose brand"}</Dropdown.Toggle>
            <Dropdown.Menu>
              {device.brands.map((brand) => (
                <Dropdown.Item
                  key={brand.id}
                  onClick={() => device.setSelectedBrand(brand)}
                >
                  {brand.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Form.Control
            className="mt-3"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Print device name"
          ></Form.Control>
          <Form.Control
            className="mt-3"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            placeholder="Print device price"
            type="number"
          ></Form.Control>
          <Form.Control
            className="mt-3"
            placeholder="Print device name"
            type="file"
            onChange={(e) => selectFile(e)}
          ></Form.Control>
          <hr />
          <Button variant="outline-dark" onClick={addInfo}>
            Add new feature
          </Button>
          {info.map((i) => (
            <Row className="mt-4" key={i.number}>
              <Col md={4}>
                <Form.Control
                  value={i.title}
                  onChange={(e) =>
                    changeInfo("title", e.target.value, i.number)
                  }
                  placeholder="Print feature name"
                />
              </Col>
              <Col md={4}>
                <Form.Control
                  value={i.description}
                  onChange={(e) =>
                    changeInfo("description", e.target.value, i.number)
                  }
                  placeholder="Print feature description"
                />
              </Col>
              <Col md={4}>
                <Button
                  variant="outline-danger"
                  onClick={() => cancelInfo(i.number)}
                >
                  Cancel
                </Button>
              </Col>
            </Row>
          ))}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={onHide}>
          Close
        </Button>
        <Button variant="outline-success" onClick={addDevice}>
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
});

export default CreateDevice;
