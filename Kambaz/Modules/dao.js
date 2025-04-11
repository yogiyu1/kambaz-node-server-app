import Database from "../Database/index.js";
import model from "./model.js";
import { v4 as uuidv4 } from "uuid";
export function findModulesForCourse(courseId) {
  return model.find({ course: courseId });
}

export function createMoudle(module) {
    const newModule = { ...module, _id: uuidv4() };
    return model.create(newModule);
}

export function deleteModule(moduleId) {
    const { modules } = Database;
    Database.modules = modules.filter((module) => module._id !== moduleId);
    
}

export function updateModule(moduleId, moduleUpdates) {
    const { modules } = Database;
    const module = modules.find((module) => module._id === moduleId);
    console.log("module", module);
    Object.assign(module, moduleUpdates);
    return module;
  }
  
  