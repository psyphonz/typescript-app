import { Database } from '../Database';
import { Course } from './Course';

export class CourseDAO {
  private storeName = 'courses';

  constructor(private db: Database) {}

  async addCourse(course: Omit<Course, 'id'>): Promise<number> {
    return new Promise((resolve, reject) => {
      const transaction = this.db.getDatabase().transaction(this.storeName, 'readwrite');
      const store = transaction.objectStore(this.storeName);
      const request = store.add(course);

      request.onerror = (event: Event) => {
        reject((event.target as IDBRequest).error);
      };

      request.onsuccess = () => {
        resolve(request.result as number);
      };
    });
  }

  async getCourse(id: number): Promise<Course> {
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
          reject(new Error(`Course with id ${id} not found`));
        }
      };
    });
  }
}