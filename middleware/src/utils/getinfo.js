const { ImageInfoModel, DockerfileInfoModel, LayerInfoModel } = require("../models/ImageModel");

const getImageIDs = async () => {
    const ids = await ImageInfoModel.find({}, { _id: 1 });
    return ids.map((item) => item._id);
};

const getImageInfoBrief = async (id) => {
    const info = await ImageInfoModel.findById(id, {
        _id: 0,
        Id: 1,
        RepoTags: 1,
        Created: 1,
        Author: 1,
        Config: {
            Hostname: 1,
            User: 1,
            ExposedPorts: 1,
            Env: 1,
            Cmd: 1,
            Volumes: 1,
            WorkingDir: 1,
            Entrypoint: 1,
        },
        Architecture: 1,
        Variant: 1,
        Size: 1,
        RootFS: 1,
        Metadata: { LastTagTime: 1 },
    });
    return info;
};

const getImageInfoAll = async (id) => {
    const info = await ImageInfoModel.findById(id, { _id: 0 });
    return info;
};

module.exports = {
    getImageIDs: getImageIDs,
    getImageInfoBrief: getImageInfoBrief,
    getImageInfoAll: getImageInfoAll,
};
