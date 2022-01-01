import React from "react";

import styled from "styled-components/native";
import { View, Text } from "react-native";
import { useState } from "react";

const Container = styled.ScrollView``;

const SearchBar = styled.TextInput`
  background-color: white;
  padding: 10px 15px;
  border-radius: 15px;
  width: 90%;
  margin: 10px auto;
`;
const Search = () => {
  const [query, setQuery] = useState("");

  const onChangeText = (text: string) => setQuery(text);
  console.log(query);
  return (
    <Container>
      <SearchBar
        placeholder="Search for Movie or TV Show"
        placeholderTextColor="grey"
        returnKeyType="search"
        onChangeText={onChangeText}
      />
    </Container>
  );
};
export default Search;
