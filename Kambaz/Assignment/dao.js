import Database from "../Database/index.js";
import model from "./model.js";
import { v4 as uuidv4 } from "uuid";
export function findAssignmentsForCourse(courseId) {
    return model.find({ course: courseId });
   
}

export function createAssignment(assignment) {
    const newAssignment = { ...assignment, _id: uuidv4() };
    return model.create(newAssignment);
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