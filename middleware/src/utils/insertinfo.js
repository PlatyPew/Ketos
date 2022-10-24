const { ImageInfoModel, DockerfileInfoModel, LayerInfoModel } = require("../models/ImageModel");
const {
    ContainerInfoModel,
    DiffInfoModel,
    FilesystemInfoModel,
} = require("../models/ContainerModel");
const { VolumeInfoModel } = require("../models/VolumeModel");
const { NetworkInfoModel } = require("../models/NetworkModel");

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

const insertDockerfile = async (id, dockerfile) => {
    dockerfile._id = id;
    return await DockerfileInfoModel.insertMany([dockerfile]);
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
    return await FilesystemInfoModel.insertMany([{ _id: id, filesystem: files }]);
};

module.exports = {
    insertImage: insertImage,
    insertContainer: insertContainer,
    insertVolume: insertVolume,
    insertNetwork: insertNetwork,
    insertDockerfile: insertDockerfile,
    insertLayer: insertLayer,
    insertDiff: insertDiff,
    insertFiles: insertFiles,
};
