import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { useEffect } from "react";
import { Text, View } from "react-native";

import styled from "styled-components/native";

const Container = styled.ScrollView`
  background-color: ${(props) => props.theme.mainBgColor};
`;

type RootStackParamList = {
  Detail: { originalTitle: string };
};

type DetailScreenProps = NativeStackScreenProps<RootStackParamList, "Detail">;

const Detail: React.FC<DetailScreenProps> = ({
  navigation: { setOptions },
  route: {
    params: { originalTitle },
  },
}) => {
  useEffect(() => {
    setOptions({ title: originalTitle });
  }, []);
  return (
    <Container>
      <Text>Detail</Text>
    </Container>
  );
};
export default Detail;
