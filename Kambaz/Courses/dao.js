// import Database from "../Database/index.js";
import model from "./model.js";
import { v4 as uuidv4 } from "uuid";
import * as enrollmentsDao from "../Enrollments/dao.js";
export function findAllCourses() {
  return model.find();
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
    enrollmentsDao.enrollUserInCourse(currentUser._id, newCourse._id);
    return model.create(newCourse);
}
  
export function deleteCourse(courseId) {
    return model.deleteOne({ _id: courseId });


}

export function updateCourse(courseId, courseUpdates) {
    return model.updateOne({ _id: courseId }, { $set: courseUpdates });
  
}