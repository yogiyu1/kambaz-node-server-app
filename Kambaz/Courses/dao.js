import Database from "../Database/index.js";
import { v4 as uuidv4 } from "uuid";
export function findAllCourses() {
  return Database.courses;
}

export function findCoursesForEnrolledUser(userId) {
    const { courses, enrollments } = Database;
    const enrolledCourses = courses.filter((course) =>
      enrollments.some((enrollment) => enrollment.user === userId && enrollment.course === course._id));
    return enrolledCourses;
  }

export function findUnenrolledCoursesForUser(userId) {
    const { courses, enrollments } = Database;
    console.log("userId", userId);
    const enrolledCourseIds = enrollments
        .filter(e => e.user === userId)
        .map(e => e.course);

    console.log("enrolledCourseIds", enrolledCourseIds);
    const coursesNotEnrolledIn = courses.filter(
        course => !enrolledCourseIds.includes(course._id)
        );

    // console.log("unenrolledCourses", coursesNotEnrolledIn);
    return coursesNotEnrolledIn;
}
  
export function createCourse(course) {
    const newCourse = { ...course, _id: uuidv4() };
    Database.courses = [...Database.courses, newCourse];
    return newCourse;
}
  
export function deleteCourse(courseId) {
    const { courses, enrollments} = Database;
    Database.courses = courses.filter((course) => course._id !== courseId);
    Database.enrollments = enrollments.filter((enrollment) => enrollment.course !== courseId);

}

export function updateCourse(courseId, courseUpdates) {
    const { courses } = Database;
    const course = courses.find((course) => course._id === courseId);
    console.log("course", course);
    Object.assign(course, courseUpdates);
    console.log("course after update", course);
    return course;
}