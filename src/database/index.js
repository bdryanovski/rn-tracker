import Realm from 'realm';
import Track from './tracks';
import TrackList from './tracklist';

let realm;

let restart = true;

async function Bootstrap() {
  realm = await Realm.open({
    path: 'tracker',
    schemaVersion: 1,
    schema: [Track.Schema, TrackList.Schema],
  });

  Collections.Tracks = new Track(realm);
  Collections.TrackLists = new TrackList(realm);

  if (restart === true) {
    console.log('Updating TrackerList');

    Collections.TrackLists.purge();

    Collections.TrackLists.insert({
      title: 'BMW S1000RR',
      unit: 'rides',
      dayLimit: 0,
    });

    Collections.TrackLists.insert({
      title: 'Dogs',
      unit: 'walks',
      dayLimit: 0,
    });

    Collections.TrackLists.insert({
      title: 'Work',
      unit: 'days',
      dayLimit: 0,
    });

    console.log(
      'TrackerList',
      Collections.TrackLists.fetch().map(track => track.title),
    );
  }
}

Bootstrap().catch(error => {
  console.log(`An error occurred: ${error}`);
});

export let Collections = {};
