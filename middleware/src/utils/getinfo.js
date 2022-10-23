const { ImageInfoModel, DockerfileInfoModel, LayerInfoModel } = require("../models/ImageModel");

const getImageIDs = async () => {
    const ids = await ImageInfoModel.find({}, { _id: 1 });
    return ids.map((item) => item._id);
};

module.exports = {
    getImageIDs: getImageIDs,
};
