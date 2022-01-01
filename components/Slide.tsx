//REACT
import { useNavigation } from "@react-navigation/native";
import { BlurView } from "expo-blur";
import React from "react";
//REACT NATIVE
import { Dimensions, StyleSheet, TouchableWithoutFeedback, useColorScheme } from "react-native";
//STYLE
import styled from "styled-components/native";
//UTILS
import { makeImgPath } from "../utils";
import Poster from "./Poster";

interface ISlideProps {
  backdropPath: string;
  posterPath: string;
  originalTitle: string;
  voteAverage: number;
  overview: string;
}

const Slide: React.FC<ISlideProps> = ({
  backdropPath,
  posterPath,
  originalTitle,
  voteAverage,
  overview,
}) => {
  const isDark = useColorScheme() === "dark";
  const navigation = useNavigation();
  const goToDetail = () => {
    navigation.navigate("Stack" as never, { screen: "Detail", params: { originalTitle } } as never);
  };

  return (
    <TouchableWithoutFeedback onPress={goToDetail}>
      <View>
        <BgImg style={StyleSheet.absoluteFill} source={{ uri: makeImgPath(backdropPath) }} />
        <BlurView intensity={80} tint={isDark ? "dark" : "light"} style={StyleSheet.absoluteFill}>
          <Wrapper>
            <Poster path={posterPath} />
            <Column>
              <Title isDark={isDark}>{originalTitle}</Title>
              {voteAverage > 0 ? <Votes isDark={isDark}>⭐️{voteAverage}/10</Votes> : null}
              <Overview isDark={isDark}>
                {overview.slice(0, 90)}
                {overview.length > 90 ? "..." : null}
              </Overview>
            </Column>
          </Wrapper>
        </BlurView>
      </View>
    </TouchableWithoutFeedback>
  );
};

const BgImg = styled.Image``;

const Title = styled.Text<{ isDark: boolean }>`
  font-size: 16px;
  font-weight: 600;
  color: ${(props) => (props.isDark ? "white" : props.theme.textColor)};
`;
const Wrapper = styled.View`
  flex-direction: row;
  height: 100%;
  width: 90%;
  margin: 0 auto;
  justify-content: space-around;
  align-items: center;
`;
const Column = styled.View`
  width: 60%;
`;

const View = styled.View`
  flex: 1;
`;

const Overview = styled.Text<{ isDark: boolean }>`
  margin-top: 10px;
  color: ${(props) => (props.isDark ? "rgba(255, 255, 255, 0.8)" : "rgba(0, 0, 0, 0.8)")};
`;

const Votes = styled(Overview)`
  font-size: 12px;
`;

export default Slide;
