import model from "./model.js";
import courseModel from "../Courses/model.js";

export async function findCoursesForUser(userId) {
  console.log("userId", userId);
  const enrollments = await model.find({ user: userId }).populate("course");
  console.log("enrollments populated", enrollments);
  console.log("enrollments courses", enrollments.map((enrollment) => enrollment.course));
  return enrollments
    .map((enrollment) => enrollment.course)
    .filter((course) => course !== null);
}

export async function findUnenrolledCoursesForUser(userId) {
  console.log("userId", userId);
  const allCourses = await courseModel.find({});
  console.log("allCourses", allCourses);
  const userEnrolledCourses = await model.find({ user: userId }).populate("course")
  const enrolledCourses = userEnrolledCourses
    .map((enrollment) => enrollment.course)
    .filter((course) => course !== null);
 
  console.log("enrolledCourses", enrolledCourses);
  const unenrolledCourses = allCourses.filter(
    (course) => !enrolledCourses.some((enrolledCourse) => enrolledCourse._id === course._id)
  );

  console.log("unenrolledCourses", unenrolledCourses);

  return unenrolledCourses;
}

export async function findUsersForCourse(courseId) {
  const enrollments = await model.find({ course: courseId }).populate("user");
  console.log("findUsersForCourse enrollments populated", enrollments);
  console.log("findUsersForCourse enrollments users", enrollments.map((enrollment) => enrollment.user));
  return enrollments.map((enrollment) => enrollment.user);
}
 
export function enrollUserInCourse(user, course) {
  return model.create({ user, course, _id: `${user}-${course}` });
}


export function unenrollUserInCourse(user, course) {
  return model.deleteOne({ user:user, course:course });
}
