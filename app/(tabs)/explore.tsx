import { initDB, insertUser } from "@/services/database";
import {
  DateTimePickerAndroid,
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type AndroidMode = "date" | "time";

interface textInputType {
  name: string;
  birthdate?: Date;
  email: string;
  password: string;
}

export default function HomeScreen() {
  const router = useRouter();
  const [textInput, setTextInput] = useState<textInputType>({
    name: "",
    birthdate: new Date(),
    email: "",
    password: "",
  });

  useEffect(() => {
    (async () => {
      await initDB();
    })();
  }, []);

  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate;
    if (selectedDate) {
      setTextInput((prev) => ({ ...prev, birthdate: currentDate }));
    }
  };

  const showMode = (currentMode: AndroidMode) => {
    DateTimePickerAndroid.open({
      value: textInput.birthdate ?? new Date(),
      onChange,
      mode: currentMode,
      is24Hour: true,
    });
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const handleRegister = async () => {
    try {
      const birthdate = textInput.birthdate;
      if (!birthdate) {
        throw new Error("Birthdate is required");
      }
      const birthDateString = birthdate.toISOString();

      await insertUser(
        textInput.name,
        textInput.email,
        textInput.password,
        birthDateString,
      );

      router.replace("/contacts/list");
    } catch (error) {
      console.error("error: ", error);
    }
  };

  return (
    <SafeAreaView style={styles.pageContainer}>
      <View style={styles.contentContainer}>
        <View style={styles.formContainer}>
          <Text style={styles.areaLabel}>Register</Text>
          <TextInput
            onChangeText={(text) =>
              setTextInput((prev) => ({ ...prev, name: text }))
            }
            style={styles.textInput}
            placeholder="Name"
          />
          <View style={styles.datePickerContainer}>
            <TextInput
              style={[styles.textInput, { flexGrow: 1, marginBottom: 0 }]}
              value={textInput.birthdate?.toLocaleDateString()}
              editable={false}
              pointerEvents="none"
              placeholder="date"
            />
            <Pressable style={styles.datePickerButton} onPress={showDatepicker}>
              <Text style={{ color: "white" }}>Change</Text>
            </Pressable>
          </View>
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

          <Pressable style={styles.primaryButton} onPress={handleRegister}>
            <Text
              style={{
                color: "white",
              }}
            >
              Register
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
  datePickerContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    minHeight: 45,
    maxHeight: 45,
    gap: 10,
    width: "100%",
  },
  datePickerButton: {
    backgroundColor: "#2196F3",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    height: "100%",
  },
});
