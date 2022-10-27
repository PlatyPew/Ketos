const { VulnInfoModel } = require("../models/StaticAnalysisModel");
const { FilesOnlyInfoModel } = require("../models/ContainerModel");

const insertVuln = async (id, vuln) => {
    vuln._id = id;
    return await VulnInfoModel.insertMany([vuln]);
};

const insertMetadata = async (id, file, metadata) => {
    await FilesOnlyInfoModel.updateOne(
        { _id: id },
        {
            $set: {
                [`filesystem.${file}`]: {
                    hashsum: metadata.hashsum,
                    type: metadata.type,
                    strings: metadata.strings,
                },
            },
        }
    );
};

module.exports = {
    insertVuln: insertVuln,
    insertMetadata: insertMetadata,
};
