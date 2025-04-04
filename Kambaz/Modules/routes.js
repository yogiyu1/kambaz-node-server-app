import * as modulesDao from "./dao.js";
export default function ModuleRoutes(app) {

app.delete("/api/modules/:moduleId", async (req, res) => {
    const { moduleId } = req.params;
    const status = modulesDao.deleteModule(moduleId);
    res.send(status);
});

app.put("/api/modules/:moduleId", (req, res) => {
    const { moduleId } = req.params;
    const moduleUpdates = req.body;
    
    console.log("module updates", moduleUpdates);
    const updateModule = modulesDao.updateModule(moduleId, moduleUpdates);
    res.send(updateModule);
    });
    



}
