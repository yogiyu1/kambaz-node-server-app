import * as enrollmentsDao from "./dao.js";
export default function EnrollmentsRoutes(app) {
    app.get("/api/allEnrollments", async (req, res) => {
        const enrollments = await enrollmentsDao.getAll();
        res.json(enrollments);
    }
    );

    app.post("/api/enrollments/:userId/:courseId", async (req, res) => {
        const { userId, courseId } = req.params;
        const newEnrollment = await enrollmentsDao.enrollUserInCourse(userId, courseId);
        res.json(newEnrollment);
    }
    );

    app.delete("/api/enrollments/:userId/:courseId", async (req, res) => {
        const { userId, courseId } = req.params;
        const result = await enrollmentsDao.unenrollUserInCourse(userId, courseId);
        console.log("result", result);
        res.sendStatus(200);
    });
    app.get("/api/enrollments/course/:courseId", async (req, res) => {
        const { courseId } = req.params;
        const enrollments = await enrollmentsDao.findUsersForCourse(courseId);
        res.json(enrollments);
    }
    );
}