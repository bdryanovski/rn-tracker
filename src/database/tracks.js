import Base from './base';

import { dateToday, dateYesterday } from '../utils/date';

const Schema = {
  name: 'Track',
  properties: {
    _id: 'string',
    date: 'string',
    data: 'TrackData[]',
  },
  primaryKey: '_id',
};

function uuid() {
  return `${Math.random().toString(16).slice(2)}`;
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
    super(db, Schema, true);
  }

  async fetchTimeline() {
    await this.createIfNotExist(dateToday());
    await this.createIfNotExist(dateYesterday());

    console.log('fetchtimeline body');

    return this.realm.objects(this.schema.name).sorted('date', true);
  }

  createTrack(timestamp = new Date().getTime()) {
    const track = {
      _id: uuid(),
      date: formateDate(setDateTimeZero(timestamp)),
      data: [],
    };

    this.insert(track);

    return track._id;
  }

  createIfNotExist(timestamp) {
    return new Promise(resolve => {
      const dateKey = formateDate(setDateTimeZero(timestamp));
      this.realm.write(() => {
        const item = this.table().filtered(`date = '${dateKey}'`);

        if (item[0]) {
          resolve(item[0]);
          return;
        }

        const newItem = this.realm.create(this.schema.name, {
          _id: uuid(),
          date: dateKey,
          data: [],
        });

        resolve(newItem);
      });
    });
  }

  addRecord(
    id,
    Track = { _id: 'xxx-yyy', timestamp: new Date().getTime(), value: 0 },
  ) {
    this.realm.write(() => {
      const item = this.table().filtered(`_id = '${id}'`);
      Track._id = `${id}-${uuid()}`;

      if (item[0]) {
        item[0].data.push(Track);
      } else {
        this.realm.create(this.schema.name, {
          _id: uuid(),
          date: formateDate(setDateTimeZero(new Date().getTime())),
          data: [Track],
        });
      }
    });
  }

  removeRecord(id, TrackId) {
    this.realm.write(() => {
      const item = this.table().filtered(`_id = ${id}`);

      if (item) {
        item.data = item.data.filter(item => item._id !== TrackId);
      }
    });
  }
}
