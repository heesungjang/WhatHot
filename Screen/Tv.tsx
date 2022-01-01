//REACT
import React, { useState } from "react";

import { View, Text, FlatList, ScrollView, RefreshControl } from "react-native";
import { useQuery, useQueryClient } from "react-query";
import { tvApi } from "../api";
import HList, { HListSeparator } from "../components/HList";
import { Loader } from "../components/Loader";
import VMedia from "../components/VMedia";

const Tv: React.FC = () => {
  const queryClient = useQueryClient();
  const [refreshing, setRefreshing] = useState(false);
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

  const onRefresh = async () => {
    setRefreshing(true);
    await queryClient.refetchQueries(["tv"]);
    setRefreshing(false);
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
