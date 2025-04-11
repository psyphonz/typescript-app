import { Course } from './Course';

export abstract class CourseFactory {
  public abstract createCourse(teacher: string, room: string): Course;
}

export class MathCourseFactory extends CourseFactory {
  public createCourse(teacher: string, room: string): Course {
    return {
      name: 'Mathematics',
      teacher,
      room
    };
  }
}

export class ScienceCourseFactory extends CourseFactory {
  public createCourse(teacher: string, room: string): Course {
    return {
      name: 'Science',
      teacher,
      room
    };
  }
}

export class HistoryCourseFactory extends CourseFactory {
  public createCourse(teacher: string, room: string): Course {
    return {
      name: 'History',
      teacher,
      room
    };
  }
}

export class CourseFactoryProducer {
  public static getFactory(courseType: string): CourseFactory {
    switch (courseType.toLowerCase()) {
      case 'math':
        return new MathCourseFactory();
      case 'science':
        return new ScienceCourseFactory();
      case 'history':
        return new HistoryCourseFactory();
      default:
        throw new Error(`Unknown course type: ${courseType}`);
    }
  }
}