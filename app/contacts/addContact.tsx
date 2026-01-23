import { commonStyles } from "@/constants/styles";
import { initDB, insertContact } from "@/services/database";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function addContact() {
  const [textInput, setTextInput] = useState({
    name: "",
    email: "",
    contact_no: "",
  });
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    (async () => {
      await initDB();
    })();
  }, []);

  const handleSave = async () => {
    try {
      const validInputs = checkInputs();

      const storedUser = await AsyncStorage.getItem("currentUser");

      if (validInputs && storedUser) {
        const { id } = JSON.parse(storedUser);

        const response = await insertContact(
          id,
          textInput.name,
          textInput.email,
          textInput.contact_no,
        );

        if (response) {
          router.back();
        }
      }
    } catch (error) {
      console.error("error: ", error);
    }
  };

  const checkInputs = (): boolean => {
    if (
      textInput.name == "" ||
      textInput.email == "" ||
      textInput.contact_no == ""
    ) {
      // setError("")
      Alert.alert("Error", "Please fill in all fields");
    } else if (textInput.contact_no.length !== 11) {
      Alert.alert("Error", "Please input valid contact");
    } else {
      return true;
    }
    return false;
  };

  return (
    <SafeAreaView style={commonStyles.pageContainer}>
      <View
        style={[
          commonStyles.contentFormContainer,
          {
            borderWidth: 1,
            justifyContent: "flex-start",
            alignItems: "center",
          },
        ]}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            borderWidth: 1,
            width: "100%",
          }}
        >
          <Text
            style={{
              color: "red",
            }}
          >
            Add Contacts
          </Text>
          <Pressable
            style={{
              backgroundColor: "#3260a8",
              width: 100,
              padding: 10,
              alignItems: "center",
            }}
            onPress={handleSave}
          >
            <Text
              style={{
                color: "white",
              }}
            >
              Save
            </Text>
          </Pressable>
        </View>

        <TextInput
          style={[commonStyles.textInput, { width: "100%" }]}
          placeholder="Name"
          onChangeText={(text) =>
            setTextInput((prev) => ({ ...prev, name: text }))
          }
        />
        <TextInput
          style={[commonStyles.textInput, { width: "100%" }]}
          placeholder="Email"
          onChangeText={(text) =>
            setTextInput((prev) => ({ ...prev, email: text }))
          }
        />
        <TextInput
          style={[commonStyles.textInput, { width: "100%" }]}
          placeholder="Contact No."
          keyboardType="number-pad"
          onChangeText={(text) =>
            setTextInput((prev) => ({ ...prev, contact_no: text }))
          }
        />
        {/* <View>
        </View> */}
      </View>
    </SafeAreaView>
  );
}
