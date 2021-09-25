function uuid() {
  return `id-${Math.random().toString(16).slice(2)}`;
}

export default class Base {
  db;
  schema;

  constructor(db, schema) {
    this.db = db;
    this.schema = schema;
  }

  insert(record) {
    if (record._id === undefined) {
      record._id = uuid();
    }
    this.db.write(() => {
      this.db.create(this.schema.name, record);
    });
  }

  insertBulk(records) {
    this.db.write(() => {
      records.forEach(record => {
        this.db.create(this.schema.name, record);
      });
    });
  }

  fetch() {
    return this.db.objects(this.schema.name);
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

  purge() {
    return this.db.write(() => {
      this.db.deleteAll();
    });
  }
}
