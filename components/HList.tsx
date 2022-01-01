import React from "react";
import { FlatList } from "react-native";

import styled from "styled-components/native";
import VMedia from "./VMedia";

interface HListProps {
  title: string;
  data: any[];
}

const ListTitle = styled.Text`
  color: white;
  font-size: 18px;
  font-weight: 600;
  margin-left: 30px;
  margin-bottom: 20px;
`;

const ListContainer = styled.View`
  margin-bottom: 40px;
`;

export const HListSeparator = styled.View`
  width: 20px;
`;

const HList: React.FC<HListProps> = ({ title, data }) => {
  return (
    <ListContainer>
      <ListTitle>{title}</ListTitle>
      <FlatList
        horizontal
        keyExtractor={(item) => item.id + ""}
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={HListSeparator}
        contentContainerStyle={{ paddingHorizontal: 30 }}
        data={data}
        renderItem={({ item }) => (
          <VMedia
            posterPath={item.poster_path}
            originalTitle={item.original_title ?? item.original_name}
            voteAverage={item.vote_average}
          />
        )}
      />
    </ListContainer>
  );
};

export default HList;
