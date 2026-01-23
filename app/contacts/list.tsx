import { commonStyles } from "@/constants/styles";
import { Contact, getContactsByUser, initDB } from "@/services/database";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function List() {
  const router = useRouter();
  const [contactList, setContactList] = useState<Contact[]>([]);

  const handleLogout = async () => {
    await AsyncStorage.removeItem("currentUser");
    router.replace("/");
  };

  useEffect(() => {
    (async () => {
      await initDB();
    })();

    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const storedUser = await AsyncStorage.getItem("currentUser");
      if (!storedUser) {
        throw new Error("auth user credentials not found!");
      }

      const { id } = JSON.parse(storedUser);

      const response = await getContactsByUser(id);

      if (response) {
        setContactList(response);
      } else {
        setContactList([]);
      }
    } catch (error) {
      console.error("error: ", error);
    }
  };

  interface ItemType {
    id: number;
    name: string;
  }

  const Item = ({ id, name }: ItemType) => {
    return <Text>{name}</Text>;
  };

  return (
    <SafeAreaView style={commonStyles.pageContainer}>
      <View style={commonStyles.contentContainer}>
        <Text style={{ color: "white", borderWidth: 1 }}>Contact Lists</Text>
        <FlatList
          data={contactList}
          renderItem={({ item }) => <Item id={item.id} name={item.name} />}
          keyExtractor={(item) => item.id.toString()}
        />
        <View>
          <Link href="/contacts/addContact" asChild>
            <Pressable style={{ backgroundColor: "blue" }}>
              <Text>Create Contact</Text>
            </Pressable>
          </Link>
          <Text>Contacts here...</Text>
        </View>

        <Pressable
          style={{
            backgroundColor: "red",
            // flex: 1,
            alignItems: "center",
            // justifyContent: "center",
          }}
          onPress={handleLogout}
        >
          <Text style={{ color: "white" }}>Logout</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
