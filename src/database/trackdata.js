import Base from './base';

const Schema = {
  name: 'TrackData',
  properties: {
    _id: 'string',
    trackDefinitionId: 'string',
    timestamp: 'int',
    value: 'int',
  },
  primaryKey: '_id',
};

export default class TrackData extends Base {
  static Schema = Schema;
  constructor(db) {
    super(db, Schema, true);
  }
}
