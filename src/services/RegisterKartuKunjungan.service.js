import app from '../config/Firebase'

const db = app.database().ref("KartuKunjungan");

class KartuKunjunganDataService {
  getAll() {
    return db;
  }

  create(kartuKunjungan) {
    return db.push(kartuKunjungan);
  }

  update(key, value) {
    return db.child(key).update(value);
  }

  delete(key) {
    return db.child(key).remove();
  }

  deleteAll() {
    return db.remove();
  }
}

export default new KartuKunjunganDataService();