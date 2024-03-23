import React from "react";
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  setProductEdit,
  showModals,
} from "../../../../redux/ManageProduct/ManageProduct";
export default function Tables({}) {
  const { product } = useSelector((state) => state.productSystem);

  const dispatch = useDispatch();
  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col lg={8} className="  text-center">
          <h1 style={{ color: "#212529" }} className="fs-4 fw-medium">
            List Product
          </h1>
        </Col>
      </Row>
      <Table striped className="col-12">
        <thead>
          <tr>
            <th scope="col" className="fs-6">
              No
            </th>
            <th scope="col" className="fs-6">
              Product Name
            </th>
            <th scope="col" className="fs-6">
              Product Category
            </th>
            <th scope="col" className="fs-6">
              Image Product
            </th>
            <th scope="col" className="fs-6">
              Product Freshness
            </th>

            <th scope="col" className="fs-6">
              Product Price
            </th>
            <th scope="col" className="fs-6">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {product?.map((items, index) => (
            <tr key={index}>
              <td>
                <Link
                  className="text-decoration-none text-black cursor-pointer"
                  to={`/get/${items?.id}`}
                >
                  {items?.id}
                </Link>
              </td>
              <td>{items?.nameProduct}</td>
              <td>{items?.category}</td>
              <td>{items?.imgProduct}</td>
              <td>{items?.freshness}</td>
              <td>{items?.priceProduct}</td>
              <td
                className="d-md-grid d-lg-flex gap-2 text-center"
                style={{ "--bs-columns": "3" }}
              >
                <Button
                  type="button"
                  variant="danger"
                  size="sm"
                  onClick={() => {
                    dispatch(showModals({ show: true, idProduct: items?.id }));
                  }}
                >
                  Deletion
                </Button>
                <Button
                  type="button"
                  variant="outline-secondary"
                  size="sm"
                  onClick={() => dispatch(setProductEdit(items))}
                >
                  Edit
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
