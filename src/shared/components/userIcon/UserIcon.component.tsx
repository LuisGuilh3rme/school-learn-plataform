import Feather from "@expo/vector-icons/Feather";
import React, { useState } from "react";
import {
  StyleSheet,
  Pressable,
  View,
  Image,
  GestureResponderEvent,
  PanResponderGestureState,
} from "react-native";
import Draggable from "react-native-draggable";

import { useAppDispatch, useAppSelector } from "../../../../hooks";
import { NavigationProps } from "../../../types/Shared.types";
import {
  resetCoordinate,
  setCoordinate,
} from "../../reducers/Coordinates.reducer";

export default function UserIcon(props: NavigationProps) {
  const userAvatar = useAppSelector((state) => state.avatar.value);
  const coordinates = useAppSelector((state) => state.coordinates.value);
  const dispatch = useAppDispatch();

  const handleDrag = (
    _e: GestureResponderEvent,
    gestureState: PanResponderGestureState,
  ) => {
    try {
      const { moveX, moveY } = gestureState;
      dispatch(setCoordinate({ x: moveX, y: moveY }));
    } catch (error) {
      dispatch(resetCoordinate());
    }
  };

  return (
    <View style={styles.absoluteIcon}>
      <Draggable x={coordinates.x} y={coordinates.y} onDrag={handleDrag}>
        <Pressable
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? "rgb(220, 220, 220)" : "#f0f0f0",
            },
            styles.icon,
          ]}
          onPress={() => {
            props.navigation.navigate("User");
          }}
        >
          {userAvatar && (
            <Image style={styles.avatar} source={{ uri: userAvatar }} />
          )}
          {!userAvatar && <Feather name="user" size={30} color="black" />}
        </Pressable>
      </Draggable>
    </View>
  );
}

const styles = StyleSheet.create({
  absoluteIcon: {
    zIndex: 100,
    position: "absolute",
  },
  icon: {
    padding: 2,
    borderRadius: 25,
    marginBottom: "2%",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 25,
  },
});
