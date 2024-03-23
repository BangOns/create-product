import { Container, Row, Col } from "react-bootstrap";
import ImgBootstrap from "../../assets/img/bootstrap-logo.svg";
import Buttons from "../../../../Components/Button";
import { Article } from "../../data";
import { useState } from "react";
export default function Header() {
  const LanguagePage = Article;
  const [language, languageSet] = useState(false);
  function ClickRandomNumber() {
    console.log(Math.floor(Math.random() * 100));
  }
  function ClickToChangeLanguage() {
    languageSet(!language);
  }
  return (
    <Container>
      <Row className=" mt-4">
        <Col lg={12} className=" text-center">
          <img src={ImgBootstrap} alt="" />
        </Col>
        <Col lg={12} className=" text-center pb-2 pt-3">
          <h1 className="fs-4 fw-medium">
            {language ? LanguagePage.title.id : LanguagePage.title.en}
          </h1>
        </Col>
        <Col lg={12} className=" text-center px-5">
          <p className="description">
            {language
              ? LanguagePage.description.id
              : LanguagePage.description.en}
          </p>
        </Col>
        <Col lg={12} className="d-flex justify-content-center ">
          <Buttons Click={ClickToChangeLanguage}>
            {language
              ? LanguagePage.buttonLanguage.id
              : LanguagePage.buttonLanguage.en}
          </Buttons>
          <Buttons Click={ClickRandomNumber}>
            {language
              ? LanguagePage.buttonRandomNumber.id
              : LanguagePage.buttonRandomNumber.en}
          </Buttons>
        </Col>
      </Row>
    </Container>
  );
}
