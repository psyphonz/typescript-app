import { Database } from '../Database';
import { Student } from './Student';

export class StudentDAO {
  private storeName = 'students';

  constructor(private db: Database) {}

  async addStudent(student: Omit<Student, 'id'>): Promise<number> {
    return new Promise((resolve, reject) => {
      const transaction = this.db.getDatabase().transaction(this.storeName, 'readwrite');
      const store = transaction.objectStore(this.storeName);
      const request = store.add(student);

      request.onerror = (event: Event) => {
        reject((event.target as IDBRequest).error);
      };

      request.onsuccess = () => {
        resolve(request.result as number);
      };
    });
  }

  async getStudent(id: number): Promise<Student> {
    return new Promise((resolve, reject) => {
      const transaction = this.db.getDatabase().transaction(this.storeName, 'readonly');
      const store = transaction.objectStore(this.storeName);
      const request = store.get(id);

      request.onerror = (event: Event) => {
        reject((event.target as IDBRequest).error);
      };

      request.onsuccess = () => {
        const result = request.result;
        if (result) {
          resolve(result);
        } else {
          reject(new Error(`Student with id ${id} not found`));
        }
      };
    });
  }

  async addService(studentId: number, service: string): Promise<void> {
    const student = await this.getStudent(studentId);
    student.services.push(service);
    
    return new Promise((resolve, reject) => {
      const transaction = this.db.getDatabase().transaction(this.storeName, 'readwrite');
      const store = transaction.objectStore(this.storeName);
      const request = store.put(student);

      request.onerror = (event: Event) => {
        reject((event.target as IDBRequest).error);
      };

      request.onsuccess = () => {
        resolve();
      };
    });
  }
}