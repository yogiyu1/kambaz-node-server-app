import * as assignmentDao from "./dao.js";
export default function AssignmentRoutes(app) {
    app.post("/api/courses/:courseId/assignments", (req, res) => {
        const { courseId } = req.params;
        const assignment = {
            ...req.body,
            course: courseId,
        };
        console.log("assignment", assignment);
        const newAssignment = assignmentDao.createAssignment(assignment);
        res.json(newAssignment);
    }
    );

    app.put("/api/courses/:courseId/assignment/:assignmentId", (req, res) => {
        const { courseId, assignmentId} = req.params;
        const assignmentUpdates = req.body;
        
        console.log("assignmentUpdates", courseId, assignmentId, assignmentUpdates);
        const updatedAssignment = assignmentDao.updateAssignment(assignmentId, assignmentUpdates);
        res.send(updatedAssignment);
        });

    app.delete("/api/courses/:courseId/assignment/:assignmentId", (req, res) => {
        const { courseId, assignmentId} = req.params;
        
        console.log("assignmentDelete", courseId, assignmentId);
        assignmentDao.deleteAssignment(assignmentId);
        res.sendStatus(200);
        });

}