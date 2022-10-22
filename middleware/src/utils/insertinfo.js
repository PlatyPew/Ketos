const { ImageInfoModel, DockerfileInfoModel, LayerInfoModel } = require("../models/ImageModel");
const { ContainerInfoModel } = require("../models/ContainerModel");
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

module.exports = {
    insertImage: insertImage,
    insertContainer: insertContainer,
    insertVolume: insertVolume,
    insertNetwork: insertNetwork,
    insertDockerfile: insertDockerfile,
    insertLayer: insertLayer,
};
