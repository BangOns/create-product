import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct,
  showModals,
} from "../../../../redux/ManageProduct/ManageProduct";
export default function Modals() {
  const { modals } = useSelector((state) => state.productSystem);
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(showModals({ show: false, idProduct: "" }));
  };
  return (
    <>
      <Modal show={modals?.show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>Do you want to delete this product?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              dispatch(deleteProduct(modals?.idProduct));
              dispatch(showModals({ show: false, idProduct: "" }));
            }}
          >
            Delete Product
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
