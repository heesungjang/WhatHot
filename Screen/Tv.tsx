//REACT
import React from "react";

import { View, Text, FlatList, ScrollView } from "react-native";
import { useQuery } from "react-query";
import { tvApi } from "../api";
import { Loader } from "../components/Loader";
import VMedia from "../components/VMedia";

const Tv: React.FC = () => {
  const { isLoading: airingTodayLoading, data: airingTodayData } = useQuery(
    ["tv", "today"],
    tvApi.airingToday
  );
  const { isLoading: topRatedLoading, data: topRatedData } = useQuery(
    ["tv", "top"],
    tvApi.topRated
  );
  const { isLoading: trendingLoading, data: trendingData } = useQuery(
    ["tv", "trending"],
    tvApi.trending
  );

  const loading = airingTodayLoading || topRatedLoading || trendingLoading;

  if (loading) {
    return <Loader />;
  }

  return (
    <ScrollView>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={airingTodayData.results}
        renderItem={({ item }) => (
          <VMedia
            posterPath={item.poster_path}
            originalTitle={item.original_name}
            voteAverage={item.vote_average}
          />
        )}
      />
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={topRatedData.results}
        renderItem={({ item }) => (
          <VMedia
            posterPath={item.poster_path}
            originalTitle={item.original_name}
            voteAverage={item.vote_average}
          />
        )}
      />
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={trendingData.results}
        renderItem={({ item }) => (
          <VMedia
            posterPath={item.poster_path}
            originalTitle={item.original_name}
            voteAverage={item.vote_average}
          />
        )}
      />
    </ScrollView>
  );
};

export default Tv;
