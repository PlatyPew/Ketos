const { ImageInfoModel, DockerfileInfoModel, LayerInfoModel } = require("../models/ImageModel");

const getImageIDs = async () => {
    const ids = await ImageInfoModel.find({}, { _id: 1 });
    return ids.map((item) => item._id);
};

const getImageInfoAll = async (id) => {
    const info = await ImageInfoModel.findById(id);
    return info;
};

module.exports = {
    getImageIDs: getImageIDs,
    getImageInfoAll: getImageInfoAll,
};
