const { ImageInfoModel } = require("../models/ImageModel");
const { ContainerInfoModel } = require("../models/ContainerModel");
const { VolumeInfoModel } = require("../models/VolumeModel");

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

module.exports = {
    insertImage: insertImage,
    insertContainer: insertContainer,
    insertVolume: insertVolume,
};
