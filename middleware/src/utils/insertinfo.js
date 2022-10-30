const { ImageInfoModel, LayerInfoModel } = require("../models/ImageModel");
const {
    ContainerInfoModel,
    DiffInfoModel,
    FilesystemInfoModel,
    FilesOnlyInfoModel,
} = require("../models/ContainerModel");
const { VolumeInfoModel } = require("../models/VolumeModel");
const { NetworkInfoModel } = require("../models/NetworkModel");
const { DetectInfoModel } = require("../models/StaticAnalysisModel");

const insertImage = async (id, imageInfo) => {
    imageInfo._id = id;
    return await ImageInfoModel.insertMany([imageInfo]);
};

const insertContainer = async (id, containerInfo) => {
    containerInfo._id = id;
    return await ContainerInfoModel.insertMany([containerInfo]);
};

const insertVolume = async (id, volumeInfo) => {
    volumeInfo._id = id;
    return await VolumeInfoModel.insertMany([volumeInfo]);
};

const insertNetwork = async (id, networkInfo) => {
    networkInfo._id = id;
    return await NetworkInfoModel.insertMany([networkInfo]);
};

const insertLayer = async (id, layer) => {
    const layers = {
        _id: id,
        layers: layer,
    };

    return await LayerInfoModel.insertMany([layers]);
};

const insertDiff = async (id, diff) => {
    const diffs = {
        _id: id,
        diff: diff,
    };

    return await DiffInfoModel.insertMany([diffs]);
};

const insertFiles = async (id, files) => {
    files = _escapeChars(files);
    await _insertOnlyFiles(id, files);
    return await FilesystemInfoModel.insertMany([{ _id: id, filesystem: files }]);
};

const _escapeChars = (files) => {
    const escapedFiles = files.map((element) => {
        return element.replace(/\$/g, "\\u0024").replace(/\./g, "\\u002e");
    });

    return escapedFiles;
};

const _insertOnlyFiles = async (id, files) => {
    let onlyFiles = {};
    let onlyFilesDetect = {};
    files.forEach((element) => {
        if (element.charAt(element.length - 1) !== "/") {
            onlyFiles[element] = { hashsum: "", type: "", strings: "" };
            onlyFilesDetect[element] = null;
        }
    });

    const fileData = { _id: id, filesystem: onlyFiles };
    const fileDataDetect = { _id: id, filesystem: onlyFilesDetect };

    await FilesOnlyInfoModel.insertMany([fileData]);
    await DetectInfoModel.insertMany([fileDataDetect]);
};

module.exports = {
    insertImage: insertImage,
    insertContainer: insertContainer,
    insertVolume: insertVolume,
    insertNetwork: insertNetwork,
    insertLayer: insertLayer,
    insertDiff: insertDiff,
    insertFiles: insertFiles,
};
