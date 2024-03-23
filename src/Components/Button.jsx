import React from "react";
import { Button } from "react-bootstrap";
export default function Buttons({ children, Click }) {
  return (
    <Button variant="primary" type="button" className="m-4" onClick={Click}>
      {children}
    </Button>
  );
}
