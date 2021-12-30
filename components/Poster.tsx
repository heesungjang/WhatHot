import React from "react";

import styled from "styled-components/native";
import { makeImgPath } from "../utils";

interface IPosterProps {
  path: string;
}

const Poster: React.FC<IPosterProps> = ({ path }) => {
  return <Image source={{ uri: makeImgPath(path) }} />;
};

export default Poster;

const Image = styled.Image`
  width: 100px;
  height: 160px;
  border-radius: 5px;
`;
