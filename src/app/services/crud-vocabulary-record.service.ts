import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, Observable } from 'rxjs';

import { IRecordFormData } from '../types/record-property-form.type';

@Injectable({
  providedIn: 'root'
})
export class CrudVocabularyRecordService {

  private DB_NAME = 'personal-vocabulary';
  private DB_VERSION = 1;
  private DB_RECORD_STORE_NAME = 'vocabulary-records';

  private db?: IDBDatabase;

  private _isDbReady$ = new BehaviorSubject<boolean>(false);
  isDbReady$ = this._isDbReady$.asObservable().pipe(filter(Boolean));

  constructor() {
    this.openDB();
  }

  private openDB() {
    // TODO: It would be better to use some library to manage records in IndexedDB.
    // But for beginning I prefer to use native objects/methods to learn the db at lowest level.
    var req = indexedDB.open(this.DB_NAME, this.DB_VERSION);
    req.onsuccess = (evt) => {
      this.db = req.result;
      this._isDbReady$.next(true);
      console.log("openDb DONE");
    };
    req.onerror = (evt) => {
      console.error("openDb err:", evt);
    };

    req.onupgradeneeded = (evt) => {
      var recordsStore = req.result.createObjectStore(this.DB_RECORD_STORE_NAME, { keyPath: 'id', autoIncrement: true });

      recordsStore.createIndex('keyPropertyValue', ['key', 'propertyValue'], { unique: false });
      recordsStore.createIndex('translationPropertyValue', ['translation', 'propertyValue'], { unique: false });
      recordsStore.createIndex('closePrononsiationPropertyValue', ['closePrononsiation', 'propertyValue'], { unique: false });
      recordsStore.createIndex('descriptionPropertyValue', ['description', 'propertyValue'], { unique: false });
    };
  }

  private getRecordStore(): IDBObjectStore {
    if (!this.db) {
      throw new Error('DB is not yet ready.');
    }

    const transaction = this.db.transaction([this.DB_RECORD_STORE_NAME], 'readwrite');
    const recordStore = transaction.objectStore(this.DB_RECORD_STORE_NAME);

    transaction.oncomplete = (event) => {
      console.log("All done! Transaction completed.");
    };

    transaction.onerror = (event) => {
      console.error('Transaction has an error.');
    };

    return recordStore;
  }

  // TODO: Need to add saving into memory/variable if IndexedDB is not availalble.
  fetchVocabulary(): Observable<any[]> {
    return new Observable(subscriber => {
      const recordStore = this.getRecordStore();

      const getAllReq = recordStore.getAll();
      getAllReq.onsuccess = () => {
        subscriber.next(getAllReq.result);
        subscriber.complete();
      };
      getAllReq.onerror = () => {
        subscriber.error(getAllReq.error);
      };
    });
  }

  fetchRecord(id: number): Observable<IRecordFormData> {
    return new Observable(subscriber => {
      const recordStore = this.getRecordStore();

      const recordGetReq = recordStore.get(id);
      recordGetReq.onsuccess = () => {
        subscriber.next(recordGetReq.result);
        subscriber.complete();
      };
      recordGetReq.onerror = () => {
        subscriber.error(recordGetReq.error);
      };
    });
  }

  saveRecord(value: IRecordFormData): Observable<number> {
    return new Observable(subscriber => {
      const recordStore = this.getRecordStore();

      const recordSaveReq = Boolean(value.id)
        ? recordStore.put(value)
        : recordStore.add(value);
      recordSaveReq.onsuccess = () => {
        subscriber.next(+recordSaveReq.result);
        subscriber.complete();
      };
      recordSaveReq.onerror = () => {
        subscriber.error(recordSaveReq.error);
      };
    });
  }
}
