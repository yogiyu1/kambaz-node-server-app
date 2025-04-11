import * as assignmentDao from "./dao.js";
export default function AssignmentRoutes(app) {
    app.post("/api/courses/:courseId/assignments", async (req, res) => {
        const { courseId } = req.params;
        const assignment = {
            ...req.body,
            course: courseId,
        };
        console.log("assignment", assignment);
        const newAssignment = await assignmentDao.createAssignment(assignment);
        res.json(newAssignment);
    }
    );

    app.put("/api/courses/:courseId/assignment/:assignmentId", async (req, res) => {
        const { courseId, assignmentId} = req.params;
        const assignmentUpdates = req.body;
        console.log("routes courseId", courseId);
        console.log("routes assignmentId", assignmentId);
        console.log("routes assignment updates", assignmentUpdates);
        const updatedAssignment = await assignmentDao.updateAssignment(assignmentId, assignmentUpdates);
        console.log("assignmentUpdates", courseId, assignmentId, assignmentUpdates);
        res.send(updatedAssignment);
        });

    app.delete("/api/courses/:courseId/assignment/:assignmentId", async (req, res) => {
        const { assignmentId} = req.params;
        await assignmentDao.deleteAssignment(assignmentId);
        res.sendStatus(200);
        });

}