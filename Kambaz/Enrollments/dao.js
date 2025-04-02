import { data } from "react-router";
import Database from "../Database/index.js";
import { v4 as uuidv4 } from "uuid";


export function enrollUserInCourse(userId, courseId) {
  const { enrollments } = Database;
  const newEnrollment = { _id: uuidv4(), user: userId, course: courseId };
  enrollments.push(newEnrollment);
  return newEnrollment;
}


export function unenrollUserInCourse(userId, courseId) {
  Database.enrollments = Database.enrollments.filter(
    (enrollment) => !(enrollment.user === userId && enrollment.course === courseId)
  );
}

export function getAll() {
  return Database.enrollments;
}