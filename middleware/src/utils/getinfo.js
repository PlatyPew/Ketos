const { ImageInfoModel, DockerfileInfoModel, LayerInfoModel } = require("../models/ImageModel");
const { ContainerInfoModel, DiffInfoModel } = require("../models/ContainerModel");
const { NetworkInfoModel } = require("../models/NetworkModel");

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

const getDockerfile = async (id) => {
    const dockerfile = await DockerfileInfoModel.findById(id, { _id: 0 });
    return dockerfile.dockerfile;
};

const getLayer = async (id) => {
    const layers = await LayerInfoModel.findById(id, { _id: 0 });
    return layers.layers;
};

const getContainerIDs = async () => {
    const ids = await ContainerInfoModel.find({}, { _id: 1 });
    return ids.map((item) => item._id);
};

const getContainerInfoBrief = async (id) => {
    let info = await ContainerInfoModel.findById(id, {
        _id: 0,
        Id: 1,
        Created: 1,
        Path: 1,
        Args: 1,
        Image: 1,
        Name: 1,
        AppArmorProfile: 1,
        HostConfig: 1,
        Mounts: 1,
        NetworkSettings: {
            Bridge: 1,
            Ports: 1,
            Networks: 1,
        },
    });

    const hostconfig = {
        NetworkMode: info.HostConfig.NetworkMode,
        PortBindings: info.HostConfig.PortBindings,
        RestartPolicy: info.HostConfig.RestartPolicy,
        AutoRemove: info.HostConfig.AutoRemove,
        CapAdd: info.HostConfig.CapAdd,
        CapDrop: info.HostConfig.CapDrop,
        Privileged: info.HostConfig.Privileged,
        Memory: info.HostConfig.Memory,
        MemorySwap: info.HostConfig.MemorySwap,
        PidsLimit: info.HostConfig.PidsLimit,
        MaskedPaths: info.HostConfig.MaskedPaths,
        ReadonlyPaths: info.HostConfig.ReadonlyPaths,
    };

    info.HostConfig = hostconfig;

    return info;
};

const getContainerInfoAll = async (id) => {
    const info = await ContainerInfoModel.findById(id, { _id: 0 });
    return info;
};

const getNetworkIDs = async () => {
    const ids = await NetworkInfoModel.find({}, { _id: 1 });
    return ids.map((item) => item._id);
};

const getNetworkInfoAll = async (id) => {
    const info = await NetworkInfoModel.findById(id, { _id: 0 });
    return info;
};

module.exports = {
    getImageIDs: getImageIDs,
    getImageInfoBrief: getImageInfoBrief,
    getImageInfoAll: getImageInfoAll,
    getDockerfile: getDockerfile,
    getLayer: getLayer,
    getContainerIDs: getContainerIDs,
    getContainerInfoBrief: getContainerInfoBrief,
    getContainerInfoAll: getContainerInfoAll,
    getNetworkIDs: getNetworkIDs,
    getNetworkInfoAll: getNetworkInfoAll,
};
