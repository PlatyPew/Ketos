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
    let macrobberNew = {};
    Object.keys(macrobber).forEach((element) => {
        macrobberNew[element.replace(/\$/g, "\\u0024").replace(/\./g, "\\u002e")] =
            macrobber[element];
    });
    await MetadataInfoModel.insertMany([{ _id: id, metadata: macrobberNew }]);
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
