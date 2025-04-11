import { Database } from './Database';
import { StudentDAO } from './models/StudentDAO';
import { CourseDAO } from './models/CourseDAO';
import { ResourceManager } from './models/ResourceManager';

export class SchoolManager {
  private db: Database;
  public studentDAO: StudentDAO;
  public courseDAO: CourseDAO;
  public resourceManager: ResourceManager;

  constructor() {
    // Initialize with default values
    this.db = new Database('SchoolDB');
    this.studentDAO = new StudentDAO(this.db);
    this.courseDAO = new CourseDAO(this.db);
    this.resourceManager = ResourceManager.getInstance();
  }

  async initialize() {
    this.db = new Database('SchoolDB');
    await this.db.open();
    
    this.studentDAO = new StudentDAO(this.db);
    this.courseDAO = new CourseDAO(this.db);
    this.resourceManager = ResourceManager.getInstance();
  }
}