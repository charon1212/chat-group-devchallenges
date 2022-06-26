import { useEffect, useState } from 'react';
import { useAppSelector } from '../../app/hooks';
import { ChannelAuthority, ChannelAuthType } from '../../domain/type/ChannelAuthority';
import { selectChannel } from '../../features/channel/channelSlice';

export const useFetchChannelAuthority = () => {
  const channel = useAppSelector(selectChannel);
  const [authList, setAuthList] = useState<ChannelAuthority[]>([]);
  useEffect(() => {
    const channelAuthorityList: ChannelAuthority[] = ['admin', 'readwrite', 'readwrite', 'readonly', 'readonly'].map((type, i) => ({
      channel,
      uid: `uid-authority-${i}`,
      type: type as ChannelAuthType,
      user: { uid: `uid-user-${i}`, photoUrl: 'https://image.flaticon.com/icons/png/512/147/147144.png', displayName: `Test User ${i + 1}` },
    }));
    setAuthList(channelAuthorityList);
  }, [channel]);
  return authList;
};
