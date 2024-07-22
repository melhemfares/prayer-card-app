import { StyleSheet } from "react-native";

import { COLOURS } from "../constants";

export const light = StyleSheet.create({
  container: {
    backgroundColor: COLOURS.white,
  },
  text: {
    color: COLOURS.black,
    fontFamily: 'DMRegular',
  },
  settingTab: {
    backgroundColor: COLOURS.whiter,
  },
});

export const dark = StyleSheet.create({
  container: {
    backgroundColor: COLOURS.black,
  },
  text: {
    color: COLOURS.white,
    fontFamily: 'DMRegular',
  },
  settingTab: {
    backgroundColor: COLOURS.blacker,
  },
});