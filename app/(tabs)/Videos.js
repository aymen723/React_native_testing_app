import * as React from "react";
import { View, StyleSheet, Button, FlatList } from "react-native";
import { Video, ResizeMode } from "expo-av";
import VideoPost from "@/components/VideoPost";
import RNVideoPost from "@/components/rnVideoPost";
import { useEffect, useState, useRef } from "react";

const dummyPosts = [
  {
    id: "1",
    video:
      "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/vertical-videos/2.mp4",
    caption: "first video",
  },
  {
    id: "2",
    video:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    caption: "second video",
  },
  {
    id: "3",
    video:
      "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/vertical-videos/2.mp4",
    caption: "third video",
  },
];
export default function Videos() {
  const [activePostId, setActivePostId] = useState(dummyPosts[0].id);
  const [listvideo, setlistvideo] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      setlistvideo(dummyPosts);
    };

    fetchPosts();
  }, []);

  const viewabilityConfigCallbackPairs = useRef([
    {
      viewabilityConfig: { itemVisiblePercentThreshold: 50 },
      onViewableItemsChanged: ({ changed, viewableItems }) => {
        if (viewableItems.length > 0 && viewableItems[0].isViewable) {
          setActivePostId(viewableItems[0].item.id);
        }
      },
    },
  ]);

  const onEndReached = () => {
    setlistvideo((currentPosts) => [...currentPosts, ...dummyPosts]);
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={listvideo}
        renderItem={({ item }) => (
          <RNVideoPost post={item} activePostId={activePostId} />
        )}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        pagingEnabled
        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
        showsVerticalScrollIndicator={false}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.5}
        initialNumToRender={3} // Render more items initially to prevent loading during scroll
        maxToRenderPerBatch={3} // Control how many items to render at once
        windowSize={5} // Control how many items should be kept in memory outside of the visible area
        removeClippedSubviews={true} // Unmount components that are outside of the visible area
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
  },
  video: {
    alignSelf: "center",
    width: 320,
    height: 200,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
