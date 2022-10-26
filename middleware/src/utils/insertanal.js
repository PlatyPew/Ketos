const { VulnInfoModel } = require("../models/StaticAnalysisModel");
const { FilesOnlyInfoModel } = require("../models/ContainerModel");

const insertVuln = async (id, vuln) => {
    vuln._id = id;
    return await VulnInfoModel.insertMany([vuln]);
};

const insertMetadata = async (id, file, metadata) => {
    await FilesOnlyInfoModel.updateOne({
        $set: {
            [`filesystem.${file}`]: { hashsum: metadata.hashsum, type: metadata.type },
        },
    });
};

module.exports = {
    insertVuln: insertVuln,
    insertMetadata: insertMetadata,
};
