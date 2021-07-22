import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from "./index";
import { StyleSheet } from "react-native";
import { MlsInfo, Neighborhood, Path } from "../types";

// Define a type for state
interface UserState {
  uid: string,
  userEmail: string,
  profileImageUrl: string,
  path: Path,
  favoritePostals: string[],
  favoriteCities: string[]
  favoriteNeighborhoods: Neighborhood[],
  mlsInfo: MlsInfo,
}

// Define the initial state using that type

const initialState: UserState = {
  uid: '',
  userEmail: '',
  profileImageUrl: '',
  path: {
    mls: '',
    state: ''
  },
  favoritePostals: [],
  favoriteCities: [],
  favoriteNeighborhoods: [],
  mlsInfo: {
    createdAt: 0,
    mlsId: '',
    mlsSubscription: '',
    firstName: '',
    lastName: '',
    officeName: '',
  },
}

export const userSlice = createSlice({
  name: 'user',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setUid: (state, action: PayloadAction<string>) => {
      state.uid = action.payload
    },
    setSetMlsInfo: (state, action: PayloadAction<MlsInfo>) => {
      state.mlsInfo = action.payload
    },

  },
})

export const { setUid, setSetMlsInfo } = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectUid = (state: RootState) => state.user.uid
export const selectMlsInfo = (state: RootState) => state.user.mlsInfo

export default userSlice.reducer