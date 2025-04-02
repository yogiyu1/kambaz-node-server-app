import * as dao from"./dao.js";
import * as courseDao from "../Courses/dao.js";
import * as enrollmentsDao from "../Enrollments/dao.js";
import * as modulesDao from "../Modules/dao.js";
import * as assignmentDao from "../Assignment/dao.js";

export default function CourseRoutes(app) {
    app.get("/api/courses", (req, res) => {
        const courese = dao.findAllCourses();
        res.json(courese);
    })

    const findCoursesForEnrolledUser = (req, res) => {
        let { userId } = req.params;
        if ( userId === "current") {
            const currentUser = req.session["currentUser"];
            if (!currentUser) {
                res.sendStatus(401);
                return;
            }
            userId = currentUser._id;
        }
        const courses = courseDao.findCoursesForEnrolledUser(userId);
        res.json(courses);
    };
    app.get("/api/users/:userId/courses", findCoursesForEnrolledUser);

    const createCourse = (req, res) => {
        const currentUser = req.session["currentUser"];
        console.log("currentuser", currentUser);
        const newCourse = courseDao.createCourse(req.body);
        enrollmentsDao.enrollUserInCourse(currentUser._id, newCourse._id);
        res.json(newCourse);
    };
    app.post("/api/users/current/courses", createCourse);

    app.delete("/api/courses/:courseId", (req, res) => {
        const { courseId } = req.params;
        const status = courseDao.deleteCourse(courseId);
        res.sendStatus(200);
    });

    app.put("/api/courses/:courseId", (req, res) => {
        const { courseId } = req.params;
        const courseUpdates = req.body;
        const updatedCourse = dao.updateCourse(courseId, courseUpdates);
        res.send(updatedCourse);
    });

    app.get("/api/courses/:courseId/modules", (req, res) => {
        const { courseId } = req.params;
        const modules = modulesDao.findModulesForCourse(courseId);
        res.json(modules);
    });
    
    app.post("/api/courses/:courseId/modules", (req, res) => {
        const { courseId } = req.params;
        const module = {
          ...req.body,
          course: courseId,
        };
        const newModule = modulesDao.createMoudle(module);
        res.send(newModule);
      });
    
    app.get("/api/courses/:courseId/assignments", (req, res) => {
        const { courseId } = req.params;
        const assignments = assignmentDao.findAssignmentsForCourse(courseId);
        
        res.json(assignments);
    });
    
}