import React from 'react';
import styled from '@emotion/styled';

const Footer = () => {
  return (
    <Foot>
      <Row>
        <Colimg>
          <a href="mailto:alexisdealmeyda@gmail.com">
            <img src="/images/envelope.svg" alt="E-mail" />
          </a>
        </Colimg>
        <Col>
          <p>ALEXIS DE ALMEYDA © 2022</p>
        </Col>
        <Colimg>
          <a href="https://github.com/AlexisTercero">
            <img src="/images/github.svg" alt="GitHubLogo" />
          </a>
        </Colimg>
      </Row>
    </Foot>
  );
};

export default Footer;

const Foot = styled.div`
  color: white;
  font-size: 13px;
  font-weight: bolder;
  letter-spacing: 0.5px;

  background-color: black;
  padding-top: 0.3em;
  padding-left: 9px;
  padding-right: 9px;
  position: relative;
  bottom: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 50px;
  position: fixed;
  box-shadow: 0px 0px 10px 1px #2a2a2a29;

  @media (max-width: 500px) {
    font-size: 10px;
  }
`;

const Row = styled.footer`
  width: 935px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 1020px) {
    width: 704px;
  }
  @media (max-width: 710px) {
    width: 400px;
  }
`;
const Colimg = styled.div`
  width: 27px;
  opacity: 96%;
  &:hover {
    opacity: 80%;
  }
  @media (max-width: 500px) {
    width: 20px;
  }
`;

const Col = styled.div`
  p {
    margin: 10px;
  }
`;
