const Schema = {
  name: 'Tracks',
  properties: {
    _id: 'string',
    title: 'string',
    unit: 'string',
    value: 'int',
    dayLimit: 'int',
  },
  primaryKey: '_id',
};

export default class Track {
  db;

  static Schema = Schema;

  constructor(db, listener = (list, changes) => {}) {
    this.db = db;
    // this.db.addListener(listener);
  }

  insert(record) {
    this.db.write(() => {
      this.db.create(Schema.name, record);
    });
  }

  insertBulk(records) {
    this.db.write(() => {
      records.forEach(record => {
        this.db.create(Schema.name, record);
      });
    });
  }

  fetch() {
    return this.db.objects(Schema.name);
  }

  filter(rule) {
    return this.db.filtered(rule);
  }

  sort(rule) {
    return this.db.sorted(rule);
  }

  delete(item) {
    return this.db.write(() => {
      this.db.delete(item);
    });
  }
}
