import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from "./index";
import { StyleSheet } from "react-native";
import { MlsInfo, Neighborhood, Path } from "../types";

// Define a type for state
interface UserState {
  uid: string,
  userEmail: string,
  profileImageUrl: string,
  createdAt: number,
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
  createdAt: null,
  path: {
    mls: '',
    state: ''
  },
  favoritePostals: [],
  favoriteCities: [],
  favoriteNeighborhoods: [],
  mlsInfo: {
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
    setEmail: (state, action: PayloadAction<string>) => {
      state.userEmail = action.payload
    },
    setMlsInfo: (state, action: PayloadAction<MlsInfo>) => {
      state.mlsInfo = action.payload
    },
  },
})

export const { setUid, setMlsInfo, setEmail } = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectUid = (state: RootState) => state.user.uid
export const selectMlsInfo = (state: RootState) => state.user.mlsInfo

export default userSlice.reducer
