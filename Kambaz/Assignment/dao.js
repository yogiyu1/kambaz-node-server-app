import Database from "../Database/index.js";
import { v4 as uuidv4 } from "uuid";
export function findAssignmentsForCourse(courseId) {
  const { assignments } = Database;
    return assignments.filter((assignment) => assignment.course === courseId);
   
}

export function createAssignment(assignment) {
    const newAssignment = { ...assignment, _id: uuidv4() };
    Database.assignments = [...Database.assignments, newAssignment];
    return newAssignment;
}

export function updateAssignment(assignmentId, assignment) {
    const { assignments } = Database;
    const assignmentToUpdate = assignments.find((assignment) => assignment._id === assignmentId);
    Object.assign(assignmentToUpdate, assignment);
    console.log("assignment after update", assignmentToUpdate);
    return assignmentToUpdate;
}

export function deleteAssignment(assignmentId) {
    Database.assignments = Database.assignments.filter((assignment) => assignment._id !== assignmentId);
}