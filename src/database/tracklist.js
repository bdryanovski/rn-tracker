import Base from './base';

const Schema = {
  name: 'TracksList',
  properties: {
    _id: 'string',
    title: 'string',
    unit: 'string',
    dayLimit: 'int',
  },
  primaryKey: '_id',
};

export default class TrackList extends Base {
  static Schema = Schema;

  constructor(db) {
    super(db, Schema);
  }
}
