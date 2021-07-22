import React, { memo, useEffect } from "react";
import { View, Text } from "react-native";
import { fetchProfile } from "../api/profile-api";
import { useAppSelector, useAppDispatch } from "../hooks";

const ProfileScreen = () => {
  const uid = useAppSelector(state => state.user.uid);

  const subscribeProfile = async () => {
    try {
      const res = await fetchProfile(uid);

    } catch (e) {

    }
  }

  useEffect(() => {
    subscribeProfile()
  }, [])

  return (
    <View>
      <Text>Profile</Text>
    </View>
  )
};

export default memo(ProfileScreen)