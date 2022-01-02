import { useNavigation } from "@react-navigation/native";
import React from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { Movie, TV } from "../api";
import Poster from "./Poster";
import Votes from "./Votes";

const VMovie = styled.View`
  align-items: center;
`;

const Title = styled.Text`
  color: white;
  font-weight: 600;
  margin-top: 7px;
  margin-bottom: 5px;
`;

interface VMediaProps {
  posterPath: string;
  originalTitle: string;
  voteAverage: number;
  fullData: Movie | TV;
}

const VMedia: React.FC<VMediaProps> = ({ posterPath, originalTitle, voteAverage, fullData }) => {
  const navigation = useNavigation();
  const goToDetail = () => {
    navigation.navigate("Stack" as never, { screen: "Detail", params: { ...fullData } } as never);
  };
  return (
    <TouchableOpacity onPress={goToDetail}>
      <VMovie>
        <Poster path={posterPath} />
        <Title>
          {originalTitle.slice(0, 12)}
          {originalTitle.length > 12 ? "..." : null}
        </Title>
        <Votes votes={voteAverage} />
      </VMovie>
    </TouchableOpacity>
  );
};

export default VMedia;
