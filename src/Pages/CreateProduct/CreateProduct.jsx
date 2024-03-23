import React, { useState } from "react";
import Header from "./Component/Header/Header";
import { Container } from "react-bootstrap";
import Forms from "./Component/Form/Form";
import Tables from "./Component/Table/Tables";
import Modals from "./Component/Modals/Modals";
import "../../styles/CreateProduct.css";

export default function CreateProduct() {
  return (
    <>
      <Header />
      <Container className="mt-4">
        <Forms />
        <Tables />
      </Container>
      <Modals />
    </>
  );
}
