//REACT
import React, { useEffect, useState } from "react";
//REACT NATIVE
import { ActivityIndicator, Dimensions, useColorScheme } from "react-native";
//STYLE
import styled from "styled-components/native";
//HELPER
import Swiper from "react-native-swiper";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
//COMPONENTS
import Slide from "../components/Slide";
import Poster from "../components/Poster";

const API_KEY = "10923b261ba94d897ac6b81148314a3f";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = () => {
  const isDark = useColorScheme() === "dark";
  const [loading, setLoading] = useState(true);
  const [nowPlaying, setNowPlaying] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [trending, setTrending] = useState([]);

  const getTrending = async () => {
    const { results } = await (
      await fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}&language=en-US&page=1&region=KR`)
    ).json();
    setTrending(results);
  };
  const getUpcoming = async () => {
    const { results } = await (
      await fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1&region=KR`)
    ).json();
    setUpcoming(results);
  };
  const getNowPlaying = async () => {
    const { results } = await (
      await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1&region=KR`)
    ).json();
    setNowPlaying(results);
  };

  const getData = async () => {
    await Promise.all([getTrending(), getUpcoming(), getNowPlaying()]);
    setLoading(false);
  };

  useEffect(() => {
    getData();
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
        containerStyle={{ marginBottom: 30, width: "100%", height: SCREEN_HEIGHT / 4 }}
      >
        {nowPlaying.map((movie) => {
          if (!movie.overview) return;
          return (
            <Slide
              key={movie.id}
              backdropPath={movie.backdrop_path}
              posterPath={movie.poster_path}
              originalTitle={movie.original_title}
              voteAverage={movie.vote_average}
              overview={movie.overview}
            />
          );
        })}
      </Swiper>
      <ListTitle>Trending Movies</ListTitle>
      <TrendingScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingLeft: 30 }}>
        {trending.map((movie) => (
          <Movie key={movie.id}>
            <Poster path={movie.poster_path} />
            <Title>
              {movie.original_title.slice(0, 13)} {movie.original_title.length > 13 ? "..." : null}
            </Title>
            <Votes isDark={isDark}>⭐️ {movie.vote_average ? `${movie.vote_average}/10` : "Coming soon"}</Votes>
          </Movie>
        ))}
      </TrendingScrollView>
    </Container>
  );
};

const Container = styled.ScrollView``;

const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const ListTitle = styled.Text`
  color: white;
  font-size: 18px;
  font-weight: 600;
  margin-left: 30px;
`;

const TrendingScrollView = styled.ScrollView`
  margin-top: 20px;
`;

const Movie = styled.View`
  margin-right: 20px;
  align-items: center;
`;

const Title = styled.Text`
  color: white;
  font-weight: 600;
  margin-top: 7px;
  margin-bottom: 5px;
`;
const Votes = styled.Text<{ isDark: boolean }>`
  color: ${(props) => (props.isDark ? "rgba(255, 255, 255, 0.8)" : "rgba(0, 0, 0, 0.8)")};
  font-size: 10px;
`;

export default Movies;
