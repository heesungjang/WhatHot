import React, { useState } from "react";
import AppLoading from "expo-app-loading";

import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";

import { useAssets } from "expo-asset";
import Tabs from "./navigation/Tabs";
import { NavigationContainer } from "@react-navigation/native";
import Stack from "./navigation/Stack";
import Root from "./navigation/Root";
import { useColorScheme } from "react-native";
import { darkTheme, lightTheme } from "./styled";
import { ThemeProvider } from "styled-components/native";

export default function App() {
  const [assets] = useAssets([require("./test.jpeg")]);
  const [loaded] = Font.useFonts(Ionicons.font);

  const isDark = useColorScheme() === "dark";

  if (!assets || !loaded) {
    return <AppLoading />;
  }

  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <NavigationContainer>
        <Root />
      </NavigationContainer>
    </ThemeProvider>
  );
}
