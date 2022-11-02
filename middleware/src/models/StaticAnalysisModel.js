const mongoose = require("mongoose");

const VulnInfoSchema = new mongoose.Schema(
    {
        _id: { type: "String" },
        vulnerabilities: { type: ["Mixed"] },
        dependencyCount: { type: "Number" },
        org: { type: "String" },
        isPrivate: { type: "Boolean" },
        packageManager: { type: "String" },
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

const MetadataInfoSchema = new mongoose.Schema(
    {
        _id: { type: "String" },
        metadata: { type: "Object" },
    },
    { _id: false, collection: "metadata_anal", versionKey: false }
);

const DetectInfoSchema = new mongoose.Schema(
    {
        _id: { type: "String" },
        filesystem: { type: "Object" },
    },
    { _id: false, collection: "detect_anal", versionKey: false }
);

const MatchInfoSchema = new mongoose.Schema(
    {
        _id: { type: "String" },
        filesystem: { type: "Object" },
    },
    { _id: false, collection: "match_anal", versionKey: false }
);

module.exports = {
    VulnInfoModel: mongoose.model("VulnInfoSchema", VulnInfoSchema),
    MetadataInfoModel: mongoose.model("MetadataInfoSchema", MetadataInfoSchema),
    DetectInfoModel: mongoose.model("DetectInfoSchema", DetectInfoSchema),
    MatchInfoModel: mongoose.model("MatchInfoSchema", MatchInfoSchema),
};
