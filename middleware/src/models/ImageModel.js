const mongoose = require("mongoose");

const ImageInfoSchema = new mongoose.Schema(
    {
        _id: { type: "String" },
        Id: { type: "String" },
        RepoTags: { type: ["String"] },
        RepoDigests: { type: "Array" },
        Parent: { type: "String" },
        Comment: { type: "String" },
        Created: { type: "Date" },
        Container: { type: "String" },
        ContainerConfig: {
            Hostname: { type: "String" },
            Domainname: { type: "String" },
            User: { type: "String" },
            AttachStdin: { type: "Boolean" },
            AttachStdout: { type: "Boolean" },
            AttachStderr: { type: "Boolean" },
            Tty: { type: "Boolean" },
            OpenStdin: { type: "Boolean" },
            StdinOnce: { type: "Boolean" },
            Env: { type: "Mixed" },
            Cmd: { type: "Mixed" },
            Image: { type: "String" },
            Volumes: { type: "Mixed" },
            WorkingDir: { type: "String" },
            Entrypoint: { type: "Mixed" },
            OnBuild: { type: "Mixed" },
            Labels: { type: "Mixed" },
        },
        DockerVersion: { type: "String" },
        Author: { type: "String" },
        Config: {
            Hostname: { type: "String" },
            Domainname: { type: "String" },
            User: { type: "String" },
            AttachStdin: { type: "Boolean" },
            AttachStdout: { type: "Boolean" },
            AttachStderr: { type: "Boolean" },
            ExposedPorts: { type: "Object" },
            Tty: { type: "Boolean" },
            OpenStdin: { type: "Boolean" },
            StdinOnce: { type: "Boolean" },
            Env: { type: ["String"] },
            Cmd: { type: ["String"] },
            ArgsEscaped: { type: "Boolean" },
            Image: { type: "String" },
            Volumes: { type: "Mixed" },
            WorkingDir: { type: "String" },
            Entrypoint: { type: "Mixed" },
            OnBuild: { type: "Mixed" },
            Labels: { type: "Mixed" },
        },
        Architecture: { type: "String" },
        Variant: { type: "String" },
        Os: { type: "String" },
        Size: { type: "Number" },
        VirtualSize: { type: "Number" },
        GraphDriver: {
            Data: {
                LowerDir: { type: "String" },
                MergedDir: { type: "String" },
                UpperDir: { type: "String" },
                WorkDir: { type: "String" },
            },
            Name: { type: "String" },
        },
        RootFS: { Type: { type: "String" }, Layers: { type: ["String"] } },
        Metadata: { LastTagTime: { type: "Date" } },
    },
    { _id: false, collection: "image_info", versionKey: false }
);

const DockerfileInfoSchema = new mongoose.Schema(
    {
        _id: { type: "String" },
        Id: { type: "String" },
        layers: { type: "Array" },
    },
    { _id: false, collection: "dockerfile_info", versionKey: false }
);

module.exports = {
    ImageInfoModel: mongoose.model("ImageInfoModel", ImageInfoSchema),
    DockerfileInfoModel: mongoose.model("DockerfileInfoModel", DockerfileInfoSchema),
};
