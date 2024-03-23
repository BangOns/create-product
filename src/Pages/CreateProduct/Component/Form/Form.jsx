import React, { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";
import { Row, Col, Form, Button, Alert } from "react-bootstrap";
import ImgError from "../../assets/img/error.png";
import {
  addProducts,
  editProduct,
  setProductEdit,
} from "../../../../redux/ManageProduct/ManageProduct";
const dataProduct = {
  nameProduct: "",
  descProduct: "",
  priceProduct: "",
  category: "",
  freshness: "",
};
import { useSelector } from "react-redux";
export default function Forms() {
  const { productEdit, messageError, isLoading } = useSelector(
    (state) => state.productSystem
  );
  const [product, productSet] = useState(dataProduct);
  const dispatch = useDispatch();
  const [nameProductValid, nameProducValidtSet] = useState(false);
  //
  const [descProductValid, descProductValidSet] = useState(false);
  //
  const [priceProductValid, priceProductValidSet] = useState(false);
  //
  const [categoryValid, categoryValidSet] = useState(false);
  //
  const [freshnessValid, freshnessValidSet] = useState(false);
  //
  // Uncontrolled Component
  const fileRefs = useRef(null);
  const [imgProductValid, imgProductValidSet] = useState(false);
  //
  const [edit, editSet] = useState(false);
  //Regex
  const regex = {
    nameProductLength10: /^[a-zA-Z0-9]{10,24}$/gm,
    nameProductLength25: /^[a-zA-Z0-9]{25,100}$/gm,
    notEmpty: /^.+$/gm,
  };
  // Controlled Component
  function handleOnchange(e) {
    const { name, value } = e.target;
    productSet({ ...product, [name]: value });
  }
  // Controlled Component
  function handleRadionButton(e) {
    const { name, value } = e.target;
    productSet({ ...product, [name]: value });
  }

  //  Mengirimkan data product ke tables dan melakukan beberapa validasi jika input tidak ada yang ada kosong maka input diterima
  function handleSubmit(e) {
    e.preventDefault();

    let validateSuccess = HandlEmptyInput();
    const imgProduct = fileRefs.current.value;
    if (validateSuccess) {
      if (!edit) {
        const NewProduct = {
          id: uuidv4(),
          ...product,
          imgProduct,
        };
        dispatch(addProducts(NewProduct));
      } else {
        const ProductEdit = {
          id: productEdit.id,
          ...product,
          imgProduct,
        };
        dispatch(editProduct(ProductEdit));
        dispatch(setProductEdit({}));

        editSet(false);
      }
    }
  }

  // Melakukan Validasi terhadap inputan dan memberikan alert jika inputan kosong
  function HandlEmptyInput() {
    if (!product.nameProduct.match(regex.notEmpty)) nameProducValidtSet(true);
    if (!product.descProduct.match(regex.notEmpty)) descProductValidSet(true);
    if (!product.priceProduct.match(regex.notEmpty)) priceProductValidSet(true);
    if (!product.freshness.match(regex.notEmpty)) freshnessValidSet(true);
    if (!product.category.match(regex.notEmpty)) categoryValidSet(true);
    if (!fileRefs.current.value.match(regex.notEmpty)) imgProductValidSet(true);

    let valid =
      product.nameProduct.length &&
      product.descProduct.length &&
      product.priceProduct.length &&
      product.freshness.length &&
      product.category.length &&
      fileRefs.current.value.length;
    return valid;
  }

  // Mengambil data product yang ingin di update

  function getProductEdit(productEdits) {
    if (productEdits.id) {
      productSet({
        nameProduct: productEdits?.nameProduct,
        descProduct: productEdits?.descProduct,
        priceProduct: productEdits?.priceProduct,
        freshness: productEdits?.freshness,
        category: productEdits?.category,
      });
      editSet(true);
    }
  }

  // Membatalkan Edit Product
  function CancelEdit(e) {
    e.preventDefault();
    productSet(dataProduct);
    dispatch(setProductEdit({}));
    editSet(false);
  }

  // Mengambil data props product yang ingin di update

  useEffect(() => {
    getProductEdit(productEdit);
  }, [productEdit]);

  // Menghapus seluruh inputan jika success
  useEffect(() => {
    if (!messageError.length && !edit) {
      fileRefs.current.value = "";
      productSet(dataProduct);
    }
  }, [messageError, edit]);
  return (
    <Row className=" justify-content-center">
      <Col lg={8} className=" d-flex justify-content-center">
        <Form className="myForm" onSubmit={handleSubmit}>
          <h3 className="fs-5">Detail Product</h3>
          <Row className=" gx-1 my-3">
            <Col lg={7} className=" Wrap-Product_Name">
              <Form.Label
                htmlFor="product_name"
                className=" fw-semibold LabelForm"
              >
                Product Name
              </Form.Label>
              <div className="d-flex">
                <Form.Control
                  type="text"
                  className={nameProductValid && "border border-danger"}
                  id="product_name"
                  maxLength={
                    product.nameProduct.match(regex.nameProductLength25)
                      ? "25"
                      : "50"
                  }
                  name="nameProduct"
                  size="sm"
                  value={product.nameProduct || ""}
                  onChange={(e) => {
                    handleOnchange(e);
                    nameProducValidtSet(false);
                  }}
                />
                <img
                  src={ImgError}
                  style={{
                    objectFit: "contain",
                    display: nameProductValid ? "block" : "none",
                  }}
                  alt="error"
                  className="px-2"
                />
              </div>
              {product.nameProduct.match(regex.nameProductLength25) ? (
                <Alert variant={"danger"} className="LabelForm">
                  Last Name must not exceed 25 characters.
                </Alert>
              ) : product.nameProduct.match(regex.nameProductLength10) ? (
                <Alert variant={"danger"} className="LabelForm">
                  input has exceeded 10 characters
                </Alert>
              ) : nameProductValid ? (
                <Alert variant={"danger"} className="LabelForm">
                  Please enter a valid product name.
                </Alert>
              ) : (
                messageError && (
                  <Alert variant={"danger"} className="LabelForm">
                    {messageError}
                  </Alert>
                )
              )}
            </Col>
          </Row>
          <Row className="gx-1 my-2">
            <Col lg={6} data-id="Product-Category">
              <Form.Label className="form-label fw-semibold LabelForm">
                Product Category
              </Form.Label>
              <Form.Select
                className="form-select selected"
                aria-label="Default select example"
                name="category"
                size="sm"
                value={product.category || ""}
                onChange={(e) => {
                  categoryValidSet(false);
                  handleOnchange(e);
                }}
              >
                <option value="">Choose...</option>
                <option value="Shirt">Shirt</option>
                <option value="Electronics">Electronics</option>
                <option value="Trousers">Trousers</option>
              </Form.Select>
              {categoryValid && (
                <Alert variant={"danger"} className="LabelForm">
                  Please enter a valid Category.
                </Alert>
              )}
            </Col>
          </Row>
          <Row className="row gx-1 my-3">
            <Col lg={5} data-id="Image-of-Product">
              <Form.Label
                htmlFor="formFile"
                className="form-label fw-semibold LabelForm"
              >
                Image of Product
              </Form.Label>
              <Form.Control
                className="form-control outline-primary text-primary border border-primary"
                type="file"
                id="formFile"
                name="imageProduct"
                size="sm"
                ref={fileRefs}
                onChange={(e) => imgProductValidSet(false)}
              />
            </Col>
            {imgProductValid && (
              <Alert variant={"danger"} className="LabelForm">
                Please enter a valid Image Product.
              </Alert>
            )}
          </Row>
          <div className="mb-2">
            <Form.Label className=" fw-semibold LabelForm">
              Product Freshness
            </Form.Label>
            <Form.Check
              type="radio"
              name="freshness"
              id="Brand_New"
              value="Brand New"
              label="Brand New"
              className="LabelForm"
              checked={product.freshness === "Brand New"}
              onChange={(e) => {
                freshnessValidSet(false);
                handleRadionButton(e);
              }}
            />

            <Form.Check
              type="radio"
              name="freshness"
              id="Second_Hand"
              value="Second Hand"
              label="Second Hand"
              className="LabelForm"
              checked={product.freshness === "Second Hand"}
              onChange={(e) => {
                freshnessValidSet(false);
                handleRadionButton(e);
              }}
            />

            <Form.Check
              type="radio"
              name="freshness"
              id="Refufbished"
              value="Refufbished"
              label="Refufbished"
              className="LabelForm"
              checked={product.freshness === "Refufbished"}
              onChange={(e) => {
                freshnessValidSet(false);
                handleRadionButton(e);
              }}
            />
            {freshnessValid && (
              <Alert variant={"danger"} className="LabelForm">
                Please enter a valid Freshness.
              </Alert>
            )}
          </div>
          <Form.Group className="mb-2" data-id="Additional-Description">
            <Form.Label
              htmlFor="exampleFormControlTextarea1"
              className="form-label LabelForm"
            >
              Addition Description
            </Form.Label>
            <div className="d-flex">
              <Form.Control
                as="textarea"
                size="sm"
                className={descProductValid && "border border-danger"}
                id="exampleFormControlTextarea1"
                rows="5"
                name="descProduct"
                onChange={(e) => {
                  descProductValidSet(false);
                  handleOnchange(e);
                }}
                value={product.descProduct || ""}
              ></Form.Control>
              <img
                src={ImgError}
                style={{
                  objectFit: "contain",
                  display: descProductValid ? "block" : "none",
                }}
                alt="error"
                className="px-2"
              />
            </div>

            {descProductValid && (
              <Alert variant={"danger"} className="LabelForm">
                Please enter a valid Additional Description.
              </Alert>
            )}
          </Form.Group>
          <Form.Group className="my-5 Wrap-product_price">
            <Form.Label
              htmlFor="product_price"
              className="form-label fw-semibold LabelForm"
            >
              Product Price
            </Form.Label>
            <div className="d-flex">
              <Form.Control
                type="number"
                className={descProductValid && "border border-danger"}
                id="product_price"
                placeholder="$ 1"
                name="priceProduct"
                size="sm"
                onChange={(e) => {
                  priceProductValidSet(false);
                  handleOnchange(e);
                }}
                value={product.priceProduct || ""}
              />
              <img
                src={ImgError}
                style={{
                  objectFit: "contain",
                  display: priceProductValid ? "block" : "none",
                }}
                alt="error"
                className="px-2"
              />
            </div>
            {priceProductValid && (
              <Alert variant={"danger"} className="LabelForm">
                Please enter a valid product price.
              </Alert>
            )}
          </Form.Group>
          <div className="w-100">
            <Button
              type="submit"
              disabled={isLoading ? true : false}
              variant="primary"
              className="w-100   mt-3 Mysubmit"
            >
              {edit ? "Edit" : isLoading ? "Loading..." : "Submit"}
            </Button>
            {edit && (
              <Button
                type="button"
                variant="danger"
                className="w-100  mt-3 "
                onClick={CancelEdit}
              >
                Cancel
              </Button>
            )}
          </div>
        </Form>
      </Col>
    </Row>
  );
}
