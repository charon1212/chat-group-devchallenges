import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { Channel } from "../../domain/type/Channel";
import { ChannelAuthType } from "../../domain/type/ChannelAuthority";
import { User } from "../../domain/type/User";

type ChannelMember = { user: User, authType: ChannelAuthType };

const initialState: Channel & { members: ChannelMember[] } = {
  uid: '',
  description: '',
  isDefault: false,
  title: '',
  members: [],
};

export const channelSlice = createSlice({
  name: 'channel',
  initialState: {
    channel: initialState
  },
  reducers: {
    changeChannel: (state, action: PayloadAction<{ channel: Channel, members: ChannelMember[] }>) => {
      const { channel, members } = action.payload;
      state.channel = { ...channel, members };
    },
    updateChannel: (state, action: PayloadAction<Channel>) => {
      const preChannel = state.channel;
      const channel = action.payload;
      state.channel = { ...preChannel, ...channel };
    },
  },
});

export const { changeChannel, updateChannel } = channelSlice.actions;

export const selectChannel = (state: RootState) => state.channel.channel;

export default channelSlice.reducer;
