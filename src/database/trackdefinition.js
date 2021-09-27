import Base from './base';

const Schema = {
  name: 'TrackDefinition',
  properties: {
    _id: 'string',
    title: 'string',
    value: 'int',
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
