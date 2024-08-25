import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Image,
} from "react-native";
import React, { useEffect } from "react";
import { bookslist } from "@/api/fetch";
import { useQuery } from "@tanstack/react-query";

export default function search() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["books"],
    queryFn: bookslist,
  });

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size={"large"} color={"red"} />
      </View>
    );
  }

  if (error) {
    return <Text>{error.message}</Text>;
  }
  return (
    <View style={styles.container}>
      <Text>books</Text>
      <FlatList
        data={data?.data.data.data}
        numColumns={2}
        contentContainerStyle={styles.content}
        columnWrapperStyle={styles.column}
        style={{ width: "100%" }}
        renderItem={({ item }) => {
          return (
            <Image
              style={{ width: "49%", height: 300, borderRadius: 10 }}
              source={{ uri: item.volumeInfo.imageLinks.thumbnail }}
            ></Image>
          );
        }}
      />
    </View>
  );
}

// <View>
//   <Text>{item.volumeInfo.title}</Text>
//   <Image
//     style={{ width: 100, height: 100 }}
//     source={{ uri: item.volumeInfo.imageLinks.thumbnail }}
//   ></Image>
// </View>

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    // padding: 20,
    paddingTop: 30,
  },
  content: {
    gap: 10,
    padding: 10,
  },
  column: {
    gap: 10,
  },
});
