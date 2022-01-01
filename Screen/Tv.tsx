//REACT
import React from "react";

import { View, Text, FlatList, ScrollView } from "react-native";
import { useQuery } from "react-query";
import { tvApi } from "../api";
import HList, { HListSeparator } from "../components/HList";
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
    <ScrollView contentContainerStyle={{ paddingVertical: 30 }}>
      <HList title="Trending TV" data={trendingData.results} />
      <HList title="Airing Today" data={airingTodayData.results} />
      <HList title="Top Rated TV" data={topRatedData.results} />
    </ScrollView>
  );
};

export default Tv;
