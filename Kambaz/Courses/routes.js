import * as dao from"./dao.js";
import * as courseDao from "../Courses/dao.js";
// import * as enrollmentsDao from "../Enrollments/dao.js";
import * as modulesDao from "../Modules/dao.js";
import * as assignmentDao from "../Assignment/dao.js";
import * as enrollmentsDao from "../Enrollments/dao.js";

export default function CourseRoutes(app) {
    app.get("/api/courses", async (req, res) => {
        const courese = await dao.findAllCourses();
        res.send(courese);
    })


    const findUnenrolledCoursesForUser = async (req, res) => {
        let { userId } = req.params;
        // console.log("req", req);
        if ( userId === "current") {
            const currentUser = req.session["currentUser"];
            if (!currentUser) {
                res.sendStatus(401);
                return;
            }
            userId = currentUser._id;
        }
        const courses =  await enrollmentsDao.findUnenrolledCoursesForUser(userId);
        console.log("routes unenrolled courses", courses);
        res.json(courses);
    };
    app.get("/api/users/:userId/unenrolledCourses", findUnenrolledCoursesForUser);

    app.post("/api/courses", async (req, res) => {
        const currentUser = req.session["currentUser"];
        const course = await dao.createCourse(req.body);
        enrollmentsDao.enrollUserInCourse(currentUser._id, newCourse._id);
        res.json(course);
      });
     
    app.delete("/api/courses/:courseId", async (req, res) => {
        const { courseId } = req.params;
        const status = await dao.deleteCourse(courseId);
        // res.sendStatus(200);
        res.send(status);
    });

    app.put("/api/courses/:courseId", async (req, res) => {
        const { courseId } = req.params;
        const courseUpdates = req.body;
        await dao.updateCourse(courseId, courseUpdates);
        const courses = await dao.findAllCourses()
        console.log("after update", courses);
        res.json(courses);
      });
     

    app.get("/api/courses/:courseId/modules", async (req, res) => {
        const { courseId } = req.params;
        const modules = await modulesDao.findModulesForCourse(courseId);
        res.json(modules);
    });
    
    app.post("/api/courses/:courseId/modules", async (req, res) => {
        const { courseId } = req.params;
        const module = {
          ...req.body,
          course: courseId,
        };
        const newModule = await modulesDao.createMoudle(module);
        res.send(newModule);
      });
    
    app.get("/api/courses/:courseId/assignments", async (req, res) => {
        const { courseId } = req.params;
        const assignments = await assignmentDao.findAssignmentsForCourse(courseId);
        
        res.json(assignments);
    });
    
}