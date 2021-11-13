import { NameScoreBase, ScoreBase } from '../components/constants/constants';
import { ForDatabase } from '../models/image-category-model';

export class Database {
  public db: IDBDatabase = null;

  init(dbName: string, version?: number): void {
    const iDB = window.indexedDB;
    const openRequest = iDB.open(dbName, version);
    openRequest.onupgradeneeded = (): void => {
      const dataBase = (openRequest as IDBOpenDBRequest).result;
      const store = dataBase.createObjectStore(NameScoreBase.ScoreBaseName, {
        keyPath: 'id',
        autoIncrement: true,
      });
      store.createIndex(ScoreBase.Name, ScoreBase.Name, { unique: false });
      store.createIndex(ScoreBase.Email, ScoreBase.Email, { unique: false });
      store.createIndex(ScoreBase.Score, ScoreBase.Score, { unique: false });
      this.db = dataBase;
    };

    openRequest.onsuccess = (): void => {
      this.db = openRequest.result;
    };
  }

  write(name: string, email: string, score: number): void {
    const transaction = this.db.transaction(NameScoreBase.ScoreBaseName, 'readwrite');
    transaction.oncomplete = () => { };
    const store = transaction.objectStore(NameScoreBase.ScoreBaseName);

    const newRecord: ForDatabase = {
      name,
      email,
      score,
    };
    store.put(newRecord);
  }

  readAll(): void {
    const transaction = this.db.transaction(NameScoreBase.ScoreBaseName, 'readonly');
    const store = transaction.objectStore(NameScoreBase.ScoreBaseName);
    store.getAll();
  }

  readFiltered(): ForDatabase[] {
    const transaction = this.db.transaction(NameScoreBase.ScoreBaseName, 'readonly');
    const store = transaction.objectStore(NameScoreBase.ScoreBaseName);
    const result = store.index(ScoreBase.Score).openCursor(null, ScoreBase.Prev);
    const resData: Array<ForDatabase> = [];
    result.onsuccess = () => {
      const cursor = result.result;
      if (cursor) {
        if (cursor.value.score > 0) {
          resData.push(cursor.value);
        }
        cursor.continue();
      }
    };
    return resData;
  }
}
