import React from "react";
import Buttons from "../../Components/Button";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
export default function GetProduct() {
  const id = window.location.pathname.split("/")[2];
  const { product } = useSelector((state) => state.productSystem);
  const ThisProducts = product.find((items) => items.id === id);
  const navigate = useNavigate();
  return (
    <>
      <Buttons Click={() => navigate("/")}>Go Back</Buttons>
      <Container className="mt-4">
        <Row className="w-75 mt-5 border mx-auto  border-primary rounded">
          <h1 className="text-center fw-3 mt-2">Products</h1>
          <hr className="w-75 mx-auto" />
          <Col lg={12} className="text-center">
            {ThisProducts ? (
              <>
                <p>Name of Product : {ThisProducts.nameProduct}</p>
                <p>Category : {ThisProducts.category}</p>
                <p>Freshness : {ThisProducts.freshness}</p>
                <p>Price : {ThisProducts.priceProduct}</p>
                <p>Description : {ThisProducts.descProduct}</p>
              </>
            ) : (
              "Product tidak terdaftar"
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
}
