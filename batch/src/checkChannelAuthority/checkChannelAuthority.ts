import 'dotenv/config';
import { myFirestoreKitChannel } from './firestore/FirestoreChannel';
import { myFirestoreKitChannelAuthority } from './firestore/FirestoreChannelAuthority';
import { myFirestoreKitUser } from './firestore/FirestoreUser';

const checkChannelAuthority = async () => {

  const allChannel = await myFirestoreKitChannel.find({});
  const allUser = await myFirestoreKitUser.find({});
  const allChannelAuthority = (await Promise.all(allChannel.map(async (channel) => myFirestoreKitChannelAuthority.find({ channel })))).reduce((p, c) => [...p, ...c], []);
  for (let user of allUser) {
    const accessibleChannel = allChannelAuthority
      .filter((channelAuth) => channelAuth.user.uid === user.uid)
      .map((channelAuth) => channelAuth.channel.uid);
    await myFirestoreKitUser.set({}, user.uid, {
      ...user, accessibleChannel,
    });
  }
  for (let channel of allChannel) {
    const adminUserUid = allChannelAuthority
      .filter((auth) => auth.channel.uid === channel.uid && auth.type === 'admin')
      .map((auth) => auth.user.uid);
    console.log({ channel, adminUserUid });
  }
};

checkChannelAuthority();
