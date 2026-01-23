import { StyleSheet } from "react-native";

export const commonStyles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: "lightgray",
    paddingLeft: 20,
    paddingRight: 20,
  },
  contentContainer: {
    height: "100%",
    flex: 0,
  },
  contentFormContainer: {
    height: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  formContainer: {
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "white",
    padding: 20,
    minWidth: 350,
    maxWidth: 800,
    elevation: 5,
  },
  textInput: {
    borderWidth: 1,
    paddingLeft: 10,
    paddingRight: 10,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 15,
    minHeight: 45,
  },
});
