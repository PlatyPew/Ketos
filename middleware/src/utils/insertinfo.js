const { ImageInfoModel, DockerfileInfoModel } = require("../models/ImageModel");
const { ContainerInfoModel } = require("../models/ContainerModel");
const { VolumeInfoModel } = require("../models/VolumeModel");
const { NetworkInfoModel } = require("../models/NetworkModel");

const insertImage = async (imageInfo) => {
    imageInfo.forEach((element) => {
        element._id = element.Id.split(":")[1];
    });

    return await ImageInfoModel.insertMany(imageInfo);
};

const insertContainer = async (containerInfo) => {
    containerInfo.forEach((element) => {
        element._id = element.Id;
    });

    return await ContainerInfoModel.insertMany(containerInfo);
};

const insertVolume = async (volumeInfo) => {
    volumeInfo.forEach((element) => {
        element._id = element.Name;
    });

    return await VolumeInfoModel.insertMany(volumeInfo);
};

const insertNetwork = async (networkInfo) => {
    networkInfo.forEach((element) => {
        element._id = element.Id;
    });

    return await NetworkInfoModel.insertMany(networkInfo);
};

const insertDockerfile = async (dockerfile) => {
    dockerfile.forEach((element) => {
        element._id = element.Id;
    });

    return await DockerfileInfoModel.insertMany(dockerfile);
};

module.exports = {
    insertImage: insertImage,
    insertContainer: insertContainer,
    insertVolume: insertVolume,
    insertNetwork: insertNetwork,
    insertDockerfile: insertDockerfile,
};
