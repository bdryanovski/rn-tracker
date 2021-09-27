function uuid() {
  return `${Math.random().toString(16).slice(2)}`;
}

export default class Base {
  realm;
  schema;
  debug;

  constructor(db, schema, debug = false) {
    this.realm = db;
    this.schema = schema;
    this.debug = debug;

    if (debug) {
      console.log(`Init Table: ${this.schema.name}`, this.schema);
    }
  }

  toJSON(data) {
    if (Array.isArray(data)) {
      return data.map(item => item.toJSON());
    }
    return data.toJSON();
  }

  table() {
    return this.realm.objects(this.schema.name);
  }

  insert(record) {
    if (record._id === undefined) {
      record._id = uuid();
    }
    this.realm.write(() => {
      this.realm.create(this.schema.name, record);
      if (this.debug) {
        console.log(`Insert: ${this.schema.name}`, record);
      }
    });
  }

  insertBulk(records) {
    this.realm.write(() => {
      records.forEach(record => {
        this.realm.create(this.schema.name, record);
        if (this.debug) {
          console.log(`Insert Bulk: ${this.schema.name}`, record);
        }
      });
    });
  }

  update(item) {
    const original = this.filter(`_id: ${item._id}`);
    this.realm.write(() => {
      if (this.debug) {
        console.log(`Update: ${this.schema.name}`, original, item);
      }
      this.realm.create(this.schema.name, Object.assign(original, item));
    });
  }

  fetch() {
    if (this.debug) {
      console.log(`Fetch: ${this.schema.name}`);
    }
    return this.table();
  }

  fetchById(id) {
    if (this.debug) {
      console.log(`FetchById: ${this.schema.name} with id: ${id}`);
    }
    return this.table().filtered(`_id = ${id}`);
  }

  filter(rule) {
    if (this.debug) {
      console.log(`Filter: ${this.schema.name}`, rule);
    }
    return this.table().filtered(rule);
  }

  sort(rule) {
    if (this.debug) {
      console.log(`Sort: ${this.schema.name}`, rule);
    }
    return this.table().sorted(rule);
  }

  delete(item) {
    if (this.debug) {
      console.log(`Delete: ${this.schema.name}`, item);
    }
    return this.realm.write(() => {
      this.realm.delete(item);
    });
  }

  purge() {
    if (this.debug) {
      console.log(`Purge: ${this.schema.name}`);
    }
    return this.realm.write(() => {
      this.realm.delete(this.table());
    });
  }
}
