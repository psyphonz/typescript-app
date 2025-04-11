import 'fake-indexeddb/auto';

export class Database {
  private db: IDBDatabase | null = null;

  constructor(private dbName: string) {}

  async open(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, 1);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };

      request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
        const db = (event.target as IDBOpenDBRequest).result;

        // Create object stores if they don't exist
        if (!db.objectStoreNames.contains('students')) {
          db.createObjectStore('students', { keyPath: 'id', autoIncrement: true });
        }
        if (!db.objectStoreNames.contains('courses')) {
          db.createObjectStore('courses', { keyPath: 'id', autoIncrement: true });
        }
      };
    });
  }

  getDatabase(): IDBDatabase {
    if (!this.db) throw new Error('Database not initialized');
    return this.db;
  }
}