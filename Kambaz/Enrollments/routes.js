import * as enrollmentsDao from "./dao.js";
export default function EnrollmentsRoutes(app) {
    app.get("/api/allEnrollments", (req, res) => {
        const enrollments = enrollmentsDao.getAll();
        res.json(enrollments);
    }
    );

    app.post("/api/enrollments/:userId/:courseId", (req, res) => {
        const { userId, courseId } = req.params;
        const newEnrollment = enrollmentsDao.enrollUserInCourse(userId, courseId);
        res.json(newEnrollment);
    }
    );

    app.delete("/api/enrollments/:userId/:courseId", (req, res) => {
        const { userId, courseId } = req.params;
        enrollmentsDao.unenrollUserInCourse(userId, courseId);
        res.sendStatus(200);
    });

}