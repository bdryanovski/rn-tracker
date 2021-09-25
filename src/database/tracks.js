import Base from './base';

const Schema = {
  name: 'Tracks',
  properties: {
    _id: 'string',
    date: 'string',
    data: '{}',
  },
  primaryKey: '_id',
};

function uuid() {
  return `id-${Math.random().toString(16).slice(2)}`;
}

/**
 * Convert timestamp to zero hours
 *
 * @param {number} timestamp
 * @returns timestamp
 */
function setDateTimeZero(timestamp) {
  const time = new Date(timestamp);
  time.setHours(0, 0, 0, 0);
  return time.getTime();
}

/**
 * Convert timestamp to date dd-mm-yyyy
 *
 * @param {number|string} timestamp
 * @returns string
 */
function formateDate(timestamp) {
  const time = new Date(timestamp);
  const dd = time.getDate();
  const mm = time.getMonth() + 1; //January is 0!
  const yyyy = time.getFullYear();
  return `${dd < 10 ? '0' + dd : dd}-${mm < 10 ? '0' + mm : mm}-${yyyy}`;
}

export default class Track extends Base {
  static Schema = Schema;
  constructor(db) {
    super(db, Schema);
  }

  addRecord(timestamp, record) {
    const reformat = {
      _id: uuid(),
      date: formateDate(setDateTimeZero(timestamp)),
      data: {
        date: timestamp,
        ...record,
      },
    };

    this.insert(reformat);
  }
}
