import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { useEffect } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Linking,
  TouchableOpacity,
  Share,
  Platform,
} from "react-native";

import styled from "styled-components/native";
import { Movie, moviesApi, TV, tvApi } from "../api";
import Poster from "../components/Poster";
import { makeImgPath } from "../utils";
import { LinearGradient } from "expo-linear-gradient";
import { BLACK_COLOR } from "../colors";
import { useQuery } from "react-query";
import { Loader } from "../components/Loader";
import { Ionicons } from "@expo/vector-icons";
import * as WebBrowser from "expo-web-browser";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Container = styled.ScrollView`
  background-color: ${(props) => props.theme.mainBgColor};
`;

const Header = styled.View`
  height: ${SCREEN_HEIGHT / 4}px;
  justify-content: flex-end;
  padding: 0px 20px;
`;

const Background = styled.Image``;

const Column = styled.View`
  flex-direction: row;
  width: 80%;
`;

const Title = styled.Text`
  color: white;
  font-size: 36px;
  align-self: flex-end;
  margin-left: 15px;
  font-weight: 500;
`;

const Overview = styled.Text`
  color: ${(props) => props.theme.textColor};
  margin-top: 20px;
  padding: 20px 0px;
`;

const VideoButton = styled.TouchableOpacity`
  flex-direction: row;
`;

const BtnText = styled.Text`
  color: white;
  font-weight: 600;
  margin-bottom: 10px;
  line-height: 24px;
  margin-left: 10px;
`;

const Data = styled.View`
  padding: 0px 20px;
`;

type RootStackParamList = {
  Detail: Movie | TV;
};

type DetailScreenProps = NativeStackScreenProps<RootStackParamList, "Detail">;

const Detail: React.FC<DetailScreenProps> = ({ navigation: { setOptions }, route: { params } }) => {
  const isMovie = "original_title" in params;
  const { isLoading, data } = useQuery(
    [isMovie ? "movies" : "tv", params.id],
    isMovie ? moviesApi.detail : tvApi.detail
  );
  const shareMedia = async () => {
    const isAndroid = Platform.OS === "android";
    if (isAndroid) {
    }
    await Share.share({
      url: isMovie ? `https://www.imdb.com/title/${data?.imdb_id}/` : data?.homepage,
      message: params.overview,
      title: isMovie ? params.original_title : params.original_name,
    });
  };
  const ShareButton = () => (
    <TouchableOpacity onPress={shareMedia}>
      <Ionicons name="share-outline" color="white" size={24} />
    </TouchableOpacity>
  );

  useEffect(() => {
    setOptions({
      title: "original_title" in params ? "Movie" : "TV Show",
    });
  }, []);

  useEffect(() => {
    if (data) {
      setOptions({
        headerRight: () => <ShareButton />,
      });
    }
  }, [data]);

  const openYLink = async (videoId: string) => {
    const baseUrl = `http://m.youtube.com/watch?v=${videoId}`;
    // await Linking.openURL(baseUrl);
    await WebBrowser.openBrowserAsync(baseUrl);
  };
  return (
    <Container>
      <Header>
        <Background
          style={StyleSheet.absoluteFill}
          source={{ uri: makeImgPath(params.backdrop_path || "") }}
        />
        <LinearGradient colors={["transparent", BLACK_COLOR]} style={StyleSheet.absoluteFill} />
        <Column>
          <Poster path={params.poster_path || ""} />
          <Title>{"original_title" in params ? params.original_title : params.original_name}</Title>
        </Column>
      </Header>
      <Data>
        <Overview>{params.overview}</Overview>
        {isLoading ? <Loader /> : null}
        {console.log(data?.videos)}
        {data?.videos?.results?.map((video) => (
          <VideoButton key={video.key} onPress={() => openYLink(video.key)}>
            <Ionicons name="logo-youtube" size={24} color="white" />
            <BtnText>{video.name}</BtnText>
          </VideoButton>
        ))}
      </Data>
    </Container>
  );
};
export default Detail;
