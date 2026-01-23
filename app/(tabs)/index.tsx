import { initDB, loginUser, showTables } from "@/services/database";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const router = useRouter();
  const [textInput, setTextInput] = useState({
    email: "",
    password: "",
  });
  const [inputError, setInputError] = useState("");

  useEffect(() => {
    (async () => {
      await initDB();
      await showTables();
    })();
  }, []);

  const handleLogin = async () => {
    try {
      const checkCredentials = await loginUser(
        textInput.email,
        textInput.password,
      );

      if (!checkCredentials) {
        setInputError("Incorrect username or password!");
      } else {
        setInputError("");
        const user = checkCredentials;

        await AsyncStorage.setItem("currentUser", JSON.stringify(user));

        router.replace("/contacts/list");
      }
    } catch (error) {
      console.error("error: ", error);
    }
  };

  return (
    <SafeAreaView style={styles.pageContainer}>
      <View style={styles.contentContainer}>
        <View style={styles.formContainer}>
          <Text style={styles.areaLabel}>Login</Text>
          <TextInput
            onChangeText={(text) =>
              setTextInput((prev) => ({ ...prev, email: text }))
            }
            style={[styles.textInput, inputError ? styles.errorInputs : null]}
            placeholder="Email"
          />
          <TextInput
            onChangeText={(text) =>
              setTextInput((prev) => ({ ...prev, password: text }))
            }
            style={[styles.textInput, inputError ? styles.errorInputs : null]}
            secureTextEntry={true}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Password"
          />

          {inputError ? (
            <Text style={{ color: "red", marginBottom: 10 }}>{inputError}</Text>
          ) : null}

          <Pressable style={styles.primaryButton} onPress={handleLogin}>
            <Text
              style={{
                color: "white",
              }}
            >
              Login
            </Text>
          </Pressable>
          {/* </Link> */}
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
  errorInputs: {
    borderColor: "red",
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
