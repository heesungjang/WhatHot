//REACT
import React from "react";

import { View, Text, FlatList, ScrollView, RefreshControl } from "react-native";
import { useQuery, useQueryClient } from "react-query";
import { tvApi } from "../api";
import HList, { HListSeparator } from "../components/HList";
import { Loader } from "../components/Loader";
import VMedia from "../components/VMedia";

const Tv: React.FC = () => {
  const queryClient = useQueryClient();
  const {
    isLoading: airingTodayLoading,
    data: airingTodayData,
    isRefetching: todayRefetching,
  } = useQuery(["tv", "today"], tvApi.airingToday);
  const {
    isLoading: topRatedLoading,
    data: topRatedData,
    isRefetching: topRefetching,
  } = useQuery(["tv", "top"], tvApi.topRated);
  const {
    isLoading: trendingLoading,
    data: trendingData,
    isRefetching: trendingRefetching,
  } = useQuery(["tv", "trending"], tvApi.trending);

  const loading = airingTodayLoading || topRatedLoading || trendingLoading;

  const refreshing = todayRefetching || topRefetching || trendingRefetching;

  const onRefresh = () => {
    queryClient.refetchQueries(["tv"]);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <ScrollView
      contentContainerStyle={{ paddingVertical: 30 }}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <HList title="Trending TV" data={trendingData.results} />
      <HList title="Airing Today" data={airingTodayData.results} />
      <HList title="Top Rated TV" data={topRatedData.results} />
    </ScrollView>
  );
};

export default Tv;
