//REACT
import React, { useEffect, useState } from "react";
//REACT NATIVE
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ActivityIndicator, Dimensions, FlatList, Text, View } from "react-native";
//HELPER
import Swiper from "react-native-swiper";
//STYLE
import styled from "styled-components/native";
//COMPONENTS
import Slide from "../components/Slide";
import VMedia from "../components/VMedia";
import HMedia from "../components/HMedia";
import { useQuery } from "react-query";
import { moviesApi } from "../api";

const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const ListTitle = styled.Text`
  color: white;
  font-size: 18px;
  font-weight: 600;
  margin-left: 30px;
`;

const TrendingScroll = styled.FlatList`
  margin-top: 20px;
`;

const ListContainer = styled.View`
  margin-bottom: 40px;
`;

const ComingSoonTitle = styled(ListTitle)`
  margin-bottom: 30px;
`;

const VSeparator = styled.View`
  width: 20px;
`;
const HSeparator = styled.View`
  height: 20px;
`;

const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = () => {
  const [refreshing, setRefreshing] = useState(false);

  const { data: nowPlayingData, isLoading: nowPlayingLoading } = useQuery(
    "nowPlaying",
    moviesApi.nowPlaying
  );
  const { data: upcomingData, isLoading: upcomingLoading } = useQuery(
    "upcoming",
    moviesApi.upcoming
  );
  const { data: trendingData, isLoading: trendingLoading } = useQuery(
    "trending",
    moviesApi.trending
  );

  const renderVMedia = ({ item }) => (
    <VMedia
      posterPath={item.poster_path}
      originalTitle={item.original_title}
      voteAverage={item.vote_average}
    />
  );

  const renderHMedia = ({ item }) => (
    <HMedia
      posterPath={item.poster_path}
      originalTitle={item.original_title}
      overview={item.overview}
      releaseDate={item.release_date}
    />
  );
  const onRefresh = async () => {};
  const movieKeyExtractor = (item) => item.id + "";
  const loading = nowPlayingLoading || upcomingLoading || trendingLoading;
  return loading ? (
    <Loader>
      <ActivityIndicator />
    </Loader>
  ) : (
    <FlatList
      style={{ marginBottom: 30 }}
      onRefresh={onRefresh}
      refreshing={refreshing}
      ListHeaderComponent={
        <>
          <Swiper
            horizontal
            loop
            autoplay
            autoplayTimeout={3.5}
            showsButtons={false}
            showsPagination={false}
            containerStyle={{
              marginBottom: 40,
              width: "100%",
              height: SCREEN_HEIGHT / 4,
            }}
          >
            {nowPlayingData.results.map((movie) => (
              <Slide
                key={movie.id}
                backdropPath={movie.backdrop_path}
                posterPath={movie.poster_path}
                originalTitle={movie.original_title}
                voteAverage={movie.vote_average}
                overview={movie.overview}
              />
            ))}
          </Swiper>
          <ListContainer>
            <ListTitle>Trending Movies</ListTitle>
            <TrendingScroll
              horizontal
              keyExtractor={movieKeyExtractor}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 30 }}
              ItemSeparatorComponent={VSeparator}
              data={trendingData.results}
              renderItem={renderVMedia}
            />
          </ListContainer>
          <ComingSoonTitle>Coming soon</ComingSoonTitle>
        </>
      }
      data={upcomingData.results}
      keyExtractor={movieKeyExtractor}
      ItemSeparatorComponent={HSeparator}
      renderItem={renderHMedia}
    />
  );
};

export default Movies;
