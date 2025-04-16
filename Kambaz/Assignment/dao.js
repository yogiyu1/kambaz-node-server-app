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
    console.log("assignmentId", assignmentId);
    console.log("updateassignment", assignment);
    return model.updateOne({ _id: assignmentId }, assignment);
}

export function deleteAssignment(assignmentId) {
    return model.deleteOne({ _id: assignmentId });
}