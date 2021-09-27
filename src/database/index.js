import Realm from 'realm';
import Track from './tracks';
import TrackDefinition from './trackdefinition';
import TrackData from './trackdata';

let realm;

let restart = true;

async function Bootstrap() {
  realm = await Realm.open({
    path: 'tracker',
    deleteRealmIfMigrationNeeded: true,
    schemaVersion: 1,
    schema: [Track.Schema, TrackData.Schema, TrackDefinition.Schema],
  });

  Collections.Tracks = new Track(realm);
  Collections.TrackDefinition = new TrackDefinition(realm);
  Collections.TrackData = new TrackData(realm);

  if (restart === true) {
    console.log('Updating TrackerList');

    Collections.TrackDefinition.purge();
    Collections.Tracks.purge();

    Collections.TrackDefinition.insert({
      title: 'BMW S1000RR',
      unit: 'rides',
      value: 1,
      dayLimit: 0,
    });

    Collections.TrackDefinition.insert({
      title: 'Dogs',
      unit: 'walks',
      value: 1,
      dayLimit: 0,
    });

    Collections.TrackDefinition.insert({
      title: 'Work',
      unit: 'days',
      value: 1,
      dayLimit: 0,
    });

    Collections.TrackDefinition.insert({
      title: 'Drinking Water',
      unit: 'ml',
      value: 100,
      dayLimit: 0,
    });

    console.log(
      'TrackDefinition',
      Collections.TrackDefinition.fetch().map(track => {
        return {
          _id: track._id,
          title: track.title,
          unit: track.unit,
          value: track.value,
          dayLimit: track.dayLimit,
        };
      }),
    );

    console.log(
      'Tracks',
      Collections.Tracks.fetch().map(track => {
        return { id: track._id, date: track.date };
      }),
    );

    console.log('Insert single track');

    const ID = Collections.Tracks.createTrack();

    console.log(
      'Tracks at start',
      Collections.Tracks.fetch().map(track => track.toJSON()),
    );

    const TrackWork = Collections.TrackDefinition.filter("title = 'Work'");

    Collections.Tracks.addRecord(ID, {
      trackDefinitionId: TrackWork[0]._id,
      timestamp: new Date().getTime(),
      value: 1,
    });

    Collections.Tracks.addRecord(ID, {
      trackDefinitionId: TrackWork[0]._id,
      timestamp: new Date().getTime(),
      value: 1,
    });

    console.log(
      'Tracks After',
      Collections.Tracks.fetch().map(track => {
        return track.toJSON();
      }),
    );
  }
}

Bootstrap().catch(error => {
  console.log(`An error occurred: ${error}`);
});

export let Collections = {};
