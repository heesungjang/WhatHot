import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Dimensions, StyleSheet, useColorScheme } from "react-native";

import styled from "styled-components/native";
import { BlurView } from "expo-blur";
import { makeImgPath } from "../utils";
import Swiper from "react-native-swiper";

const API_KEY = "10923b261ba94d897ac6b81148314a3f";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = () => {
  const isDark = useColorScheme();
  const [loading, setLoading] = useState(true);
  const [nowPlaying, setNowPlaying] = useState([]);
  const getNowPlaying = async () => {
    const { results } = await (
      await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1&region=KR`)
    ).json();
    setNowPlaying(results);
    setLoading(false);
  };
  useEffect(() => {
    getNowPlaying();
  }, []);
  return loading ? (
    <Loader>
      <ActivityIndicator />
    </Loader>
  ) : (
    <Container>
      <Swiper
        loop
        horizontal
        autoplayTimeout={3.5}
        showsButtons={false}
        showsPagination={false}
        containerStyle={{ width: "100%", height: SCREEN_HEIGHT / 4 }}
      >
        {nowPlaying.map((movie) => (
          <View key={movie.id}>
            <BgImg style={StyleSheet.absoluteFill} source={{ uri: makeImgPath(movie.backdrop_path) }} />
            <BlurView intensity={80} tint={isDark ? "dark" : "light"} style={StyleSheet.absoluteFill}>
              <Wrapper>
                <Poster source={{ uri: makeImgPath(movie.poster_path) }} />
                <Column>
                  <Title>{movie.original_title}</Title>
                  <Overview>{movie.overview.slice(0, 90)}...</Overview>
                  {movie.vote_average > 0 ? <Votes>⭐️{movie.vote_average}/10</Votes> : null}
                </Column>
              </Wrapper>
            </BlurView>
          </View>
        ))}
      </Swiper>
    </Container>
  );
};

const Container = styled.ScrollView``;

const Wrapper = styled.View`
  flex-direction: row;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

const Column = styled.View`
  width: 40%;
  margin-left: 15px;
`;

const View = styled.View`
  flex: 1;
`;

const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const BgImg = styled.Image``;

const Poster = styled.Image`
  width: 100px;
  height: 160px;
  border-radius: 5px;
`;

const Title = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: white;
`;

const Overview = styled.Text`
  margin-top: 10px;
  color: rgba(255, 255, 255, 0.8);
`;

const Votes = styled(Overview)`
  font-size: 12px;
  margin-top: 5px;
`;

export default Movies;
