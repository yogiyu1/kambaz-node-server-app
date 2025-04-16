import * as dao from "./dao.js";
import * as courseDao from "../Courses/dao.js";
import * as enrollmentsDao from "../Enrollments/dao.js";
export default function UserRoutes(app) {
  const createUser = async (req, res) => {
    const user = await dao.createUser(req.body);
    res.json(user);
  };

  const deleteUser = async (req, res) => {
    const status = await dao.deleteUser(req.params.userId);
    res.json(status);
  };

  const findAllUsers = async (req, res) => {
    const { role, name } = req.query;
    if (role) {
      const users = await dao.findUsersByRole(role);
      res.json(users);
      return;
    }
    if (name) {
      const users = await dao.findUsersByPartialName(name);
      res.json(users);
      return;
    }
    const users = await dao.findAllUsers();
    res.json(users);
  };

  
    const findUserById =  async (req, res) => {
      const user = await dao.findUserById(req.params.userId);
      res.json(user);
    };
    const updateUser = async (req, res) => {
      const { userId } = req.params;
      const userUpdates = req.body;
      await dao.updateUser(userId, userUpdates);
      const currentUser = req.session["currentUser"];
     if (currentUser && currentUser._id === userId) {
       req.session["currentUser"] = { ...currentUser, ...userUpdates };
     }
      res.json(currentUser);
    };
  
    
    const signup = async (req, res) => {
        const user = await dao.findUserByUsername(req.body.username);
        if (user) {
            res.status(400).json({ message: "User already exists" });
            return;
        }
        const currentUser = await dao.createUser(req.body);
        req.session["currentUser"] = currentUser;
        res.json(currentUser);
     };
  
    const signin = async (req, res) => {
        const { username, password } = req.body;
        console.log("req.body:", req.body); 
        const currentUser = await dao.findUserByCredentials(username, password);
        console.log("currentUser:", currentUser);
        
        if (currentUser) {
          req.session["currentUser"] = currentUser;
          console.log("signin req.session:", req.session);
          res.json(currentUser);
        } else {
          res.status(401).json({ message: "Unable to login. Try again later." });
        }
      };
    
    const signout = (req, res) => {
        req.session.destroy();
        res.sendStatus(200);
      };
    
    const profile = (req, res) => {
        const currentUser = req.session["currentUser"];
        if (!currentUser) {
          res.sendStatus(401);
          return;
        }
        res.json(currentUser);
      };

    const findCoursesForUser = async (req, res) => {
      const currentUser = req.session["currentUser"];
      console.log("findCoursesForUser session", req.session);
      console.log("findCoursesForUser currentUser", currentUser);
      if (!currentUser) {
        res.sendStatus(401);
        return;
      }
      if (currentUser.role === "ADMIN") {
        const courses = await courseDao.findAllCourses();
        res.json(courses);
        return;
      }
      let { uid } = req.params;
      if (uid === "current") {
        uid = currentUser._id;
      }
      const courses = await enrollmentsDao.findCoursesForUser(uid);
      console.log("findCoursesForUser courses", courses);
      res.json(courses);
    };
    app.get("/api/users/:uid/courses", findCoursesForUser);
  

    app.post("/api/users", createUser);
    app.get("/api/users", findAllUsers);
    app.get("/api/users/:userId", findUserById);
    app.put("/api/users/:userId", updateUser);
    app.delete("/api/users/:userId", deleteUser);
    app.post("/api/users/signup", signup);
    app.post("/api/users/signin", signin);
    app.post("/api/users/signout", signout);
    app.post("/api/users/profile", profile);

}