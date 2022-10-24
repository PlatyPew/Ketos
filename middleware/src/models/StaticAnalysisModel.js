const mongoose = require("mongoose");

const VulnInfoSchema = new mongoose.Schema(
    {
        _id: { type: "String" },
        vulnerabilities: { type: "Array" },
        dependencyCount: { type: "Number" },
        org: { type: "String" },
        isPrivate: { type: "Boolean" },
        packageManager: { type: "String" },
        docker: { type: "Object" },
        summary: { type: "String" },
        filesystemPolicy: { type: "Boolean" },
        filtered: { ignore: { type: "Array" }, patch: { type: "Array" } },
        uniqueCount: { type: "Number" },
        projectName: { type: "String" },
        platform: { type: "String" },
        hasUnknownVersions: { type: "Boolean" },
        path: { type: "String" },
    },
    { _id: false, collection: "vuln_anal", versionKey: false }
);

module.exports = {
    VulnInfoModel: mongoose.model("VulnInfoSchema", VulnInfoSchema),
};
