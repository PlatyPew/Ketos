const {
    VulnInfoModel,
    MetadataInfoModel,
    DetectInfoModel,
} = require("../models/StaticAnalysisModel");
const { FilesOnlyInfoModel } = require("../models/ContainerModel");

const insertVuln = async (id, vuln) => {
    vuln._id = id;
    return await VulnInfoModel.insertMany([vuln]);
};

const insertFiledata = async (id, file, metadata) => {
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

const insertMetadata = async (id, macrobber) => {
    await MetadataInfoModel.insertMany([{ _id: id, metadata: macrobber }]);
};

const insertDetect = async (id, file, detection) => {
    const detect = await DetectInfoModel.updateOne(
        { _id: id },
        {
            $set: {
                [`filesystem.${file}`]: detection,
            },
        }
    );

    return detect;
};

module.exports = {
    insertVuln: insertVuln,
    insertFiledata: insertFiledata,
    insertMetadata: insertMetadata,
    insertDetect: insertDetect,
};
