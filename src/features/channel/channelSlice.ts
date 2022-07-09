import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { Channel } from "../../domain/type/Channel";
import { ChannelAuthority } from "../../domain/type/ChannelAuthority";

const initialState: Channel & { channelAuthList: ChannelAuthority[] } = {
  uid: '',
  description: '',
  isDefault: false,
  title: '',
  channelAuthList: [],
};

export const channelSlice = createSlice({
  name: 'channel',
  initialState: {
    channel: initialState
  },
  reducers: {
    changeChannel: (state, action: PayloadAction<{ channel: Channel, channelAuthList: ChannelAuthority[] }>) => {
      const { channel, channelAuthList } = action.payload;
      state.channel = { ...channel, channelAuthList };
    },
    updateChannel: (state, action: PayloadAction<Channel>) => {
      const preChannel = state.channel;
      const channel = action.payload;
      state.channel = { ...preChannel, ...channel };
    },
    updateChannelAuthority: (state, action: PayloadAction<ChannelAuthority[]>) => {
      const preChannel = state.channel;
      const channelAuthList = action.payload;
      state.channel = { ...preChannel, channelAuthList };
    },
    resetChannel: (state) => {
      state.channel = { ...initialState };
    },
  },
});

export const { changeChannel, updateChannel, updateChannelAuthority, resetChannel } = channelSlice.actions;

export const selectChannel = (state: RootState) => state.channel.channel;

export default channelSlice.reducer;
