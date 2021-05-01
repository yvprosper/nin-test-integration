/* eslint-disable class-methods-use-this */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-underscore-dangle */
class MongooseDataPopulate {
  constructor(data) {
    this._data = data;
  }

  extractIds(...args) {
    const ids = [];
    for (const id of args) {
      const _ids = [];
      for (const item of this._data) {
        if (!_ids.includes(item[id].toString())) {
          _ids.push(item[id].toString());
        }
      }
      ids.push(_ids);
    }
    return ids;
  }

  select(data, criteria) {
    if (criteria.length === 0) {
      return data;
    }
    const newData = {};
    for (let criterion of criteria) {
      criterion = criterion.trim();
      newData[criterion] = data[criterion];
    }
    if (criteria.indexOf("-_id") === -1 && data._id) {
      newData._id = data._id;
    }
    return newData;
  }

  populate(map, data, ...args) {
    // can be called multiple times
    const path = map.path || map;
    const ref = map.ref || map;
    if (Array.isArray(data)) {
      const dataMap = {};
      for (const item of data) {
        dataMap[item.id] = item;
      }

      // get item in data such that item[ref] = dataMap[item[ref]]
      for (let i = 0; i < this._data.length; i += 1) {
        const sourceData = (this._data[i].toJSON && this._data[i].toJSON()) || this._data[i];
        this._data[i] = {
          ...sourceData,
          [path]: this.select(dataMap[this._data[i][ref].toString()], args),
        };
      }
    } else {
      this._data[path] = this.select(data, args);
    }
    return this;
  }

  exec() {
    return this._data;
  }
}

export default MongooseDataPopulate;
