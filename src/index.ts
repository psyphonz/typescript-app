import { SchoolManager } from './SchoolManager';
import { CourseFactoryProducer } from './models/CourseFactory';

async function main() {
  const manager = new SchoolManager();
  await manager.initialize();
  
  // Add a student
  const studentId = await manager.studentDAO.addStudent({
    name: 'John Doe',
    age: 15,
    grade: '10th',
    services: []
  });
  console.log(`Added student with ID: ${studentId}`);

  // Add a service to the student
  await manager.studentDAO.addService(studentId, 'Tutoring');
  console.log('Added tutoring service to student');

  // Create and add a math course
  const mathFactory = CourseFactoryProducer.getFactory('math');
  const mathCourse = mathFactory.createCourse('Mr. Smith', 'Room 101');
  const courseId = await manager.courseDAO.addCourse(mathCourse);
  console.log(`Added course with ID: ${courseId}`);

  // Check resource allocation
  const resourceManager = manager.resourceManager;
  if (resourceManager.allocateResource('Projector')) {
    console.log('Projector allocated successfully');
  } else {
    console.log('No projectors available');
  }

  // Display available resources
  console.log('Available resources:');
  resourceManager.getAvailableResources().forEach((value, key) => {
    console.log(`${key}: ${value}`);
  });
}

main().catch(console.error);