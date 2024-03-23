import { Fragment, useEffect } from "react";
import { Container, Nav, Navbar, Button } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import { checkLocalStorage } from "../routes/route";
export default function Navbars() {
  const Storage = checkLocalStorage();

  function Logout() {
    let Users = JSON.parse(Storage);
    let checkUsers = Users.find((users) => users.isLogin === true);
    checkUsers.isLogin = false;
    localStorage.setItem("user", JSON.stringify(Users));
    window.location.reload();
  }

  useEffect(() => {
    checkLocalStorage();
  }, [Storage]);
  return (
    <Fragment>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container fluid>
          <Navbar.Brand className="fw-bold TextBrand" href="#">
            Simple Header
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse className=" justify-content-end" id="navbarNav">
            <Nav variant="pills">
              <Nav.Link href="/" className="text-primary fontLink">
                Home
              </Nav.Link>
              <Nav.Link href="/create" className="text-primary fontLink">
                Create Product
              </Nav.Link>
              {Storage ? (
                <Button
                  variant="light"
                  onClick={Logout}
                  className="text-primary fontLink"
                >
                  Logout
                </Button>
              ) : (
                <Button
                  href="/login"
                  variant="light"
                  className="text-primary fontLink"
                >
                  Login
                </Button>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </Fragment>
  );
}
