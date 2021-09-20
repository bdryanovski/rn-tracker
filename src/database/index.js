import Realm from 'realm';
import Track from './tracks';

let realm;

async function Bootstrap() {
  realm = await Realm.open({
    path: 'tracker',
    schema: [Track.Schema],
  });

  console.log(
    realm.objects(Track.Schema.name).map(x => {
      console.log(x);
    }),
  );

  try {
    const track = new Track(realm, () => {});

    console.log('My trakc', track);

    track.insert({
      _id: 'he' + new Date().getTime(),
      title: 'demo',
      unit: 'cups',
      value: 0,
      dayLimit: 10,
    });

    console.log('Fetch', track.fetch());
  } catch (e) {
    console.log(e);
  }

  // Remember to close the realm
  // realm.close();
}

Bootstrap().catch(error => {
  console.log(`An error occurred: ${error}`);
});
