import React, { useState, useEffect } from "react";
import axios from "axios";

import styled from "./home.module.css";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  useDisclosure,
  ModalFooter,
  Button,
  Box,
} from "@chakra-ui/react";

const Home = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [data, setData] = useState([]);

  const getdata = () => {
    axios
      .get("http://localhost:8080/post")
      .then((res) => setData(res.data))
      .catch((errr) => console.log(errr));
  };

  useEffect(() => {
    getdata();
  }, []);
  console.log(data);

  return (
    <div className={styled.maindiv}>
      {data.map((item) => (
        <div key={item.id} className={styled.mapMaindiv}>
          <div>
            <div>
              <img
                onClick={onOpen}
                className={styled.firstChildImg}
                src={item.thumbnail.small}
                alt=""
              />
            </div>

            <div className={styled.dotMainBox}>
              <div className={styled.dotFirstChild}></div>
              <div className={styled.dotLastChild}></div>
            </div>

            <b className={styled.title}>{item.title}</b>
            <p style={{ marginLeft: "3%" }}>{item.content}</p>
          </div>

          <div className={styled.authorMaindiv}>
            <div style={{ marginLeft: "3%" }}>
              {item.author.name} - {item.author.role}
            </div>
            <div style={{ marginRight: "3%" }}>Nov 25 2020</div>
          </div>

          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader></ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <img src={item.thumbnail.large} alt="" />
                <b className={styled.title}>{item.title}</b>
                <p className={styled.content}>{item.content}</p>
                <div style={{ display: "flex" }}>
                  <div>
                    {" "}
                    <img
                      className={styled.userImg}
                      src={item.author.avatar}
                      alt=""
                    />
                  </div>
                  <div className={styled.authorNameRole}>
                    {item.author.name}-{item.author.role}
                  </div>
                </div>
              </ModalBody>
            </ModalContent>
          </Modal>
        </div>
      ))}
    </div>
  );
};

export default Home;
