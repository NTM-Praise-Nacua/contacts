import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const [textInput, setTextInput] = useState({
    email: "",
    password: "",
  });

  return (
    <SafeAreaView style={styles.pageContainer}>
      <View style={styles.contentContainer}>
        <View style={styles.formContainer}>
          <Text style={styles.areaLabel}>Login</Text>
          <TextInput
            onChangeText={(text) =>
              setTextInput((prev) => ({ ...prev, email: text }))
            }
            style={styles.textInput}
            placeholder="Email"
          />
          <TextInput
            onChangeText={(text) =>
              setTextInput((prev) => ({ ...prev, password: text }))
            }
            style={styles.textInput}
            secureTextEntry={true}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Password"
          />
          <Pressable style={styles.primaryButton}>
            <Text
              style={{
                color: "white",
              }}
            >
              Login
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: "lightgray",
    paddingLeft: 20,
    paddingRight: 20,
  },
  contentContainer: {
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
  areaLabel: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 20,
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
  primaryButton: {
    borderRadius: 15,
    backgroundColor: "black",
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 20,
    minHeight: 45,
    maxHeight: 45,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
