import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { Channel } from "../../domain/type/Channel";

const initialState: Channel = {
  uid: '',
  description: '',
  isDefault: false,
  title: '',
};

export const channelSlice = createSlice({
  name: 'channel',
  initialState: {
    channel: initialState
  },
  reducers: {
    changeChannel: (state, action: PayloadAction<Channel>) => {
      const channel = action.payload;
      state.channel = { ...channel };
    },
  },
});

export const { changeChannel } = channelSlice.actions;

export const selectChannel = (state: RootState) => state.channel.channel;

export default channelSlice.reducer;
