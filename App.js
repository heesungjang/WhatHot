//REACT
import React, { useState } from "react";
//REACT NATIVE
import { useColorScheme } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
//EXPO
import * as Font from "expo-font";
import { useAssets } from "expo-asset";
import AppLoading from "expo-app-loading";
import { Ionicons } from "@expo/vector-icons";
//STYLE
import { darkTheme, lightTheme } from "./styled";
import { ThemeProvider } from "styled-components/native";
//COMPONENTS
import Root from "./navigation/Root";
import Tabs from "./navigation/Tabs";
import Stack from "./navigation/Stack";

//HELPER
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

export default function App() {
  const [assets] = useAssets([require("./test.jpeg")]);
  const [loaded] = Font.useFonts(Ionicons.font);

  const isDark = useColorScheme() === "dark";

  if (!assets || !loaded) {
    return <AppLoading />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <NavigationContainer>
          <Root />
        </NavigationContainer>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
