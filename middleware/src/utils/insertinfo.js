const { ImageInfoModel } = require("../models/ImageModel.js");

const insertImage = async (imageInfo) => {
    imageInfo.forEach((element) => {
        element._id = element.Id.split(":")[1];
    });

    return await ImageInfoModel.insertMany(imageInfo);
};

const insertImage = async (imageInfo) => {
    imageInfo = getId(imageInfo);
    return await ImageInfoModel.insertMany(imageInfo);
};

module.exports = {
    insertImage: insertImage,
};
