const mongoose = require("mongoose");

const NetworkInfoSchema = new mongoose.Schema(
    {
        _id: { type: "String" },
        Name: { type: "String" },
        Id: { type: "String" },
        Created: { type: "Date" },
        Scope: { type: "String" },
        Driver: { type: "String" },
        EnableIPv6: { type: "Boolean" },
        IPAM: {
            Driver: { type: "String" },
            Options: { type: "Mixed" },
            Config: { type: ["Mixed"] },
        },
        Internal: { type: "Boolean" },
        Attachable: { type: "Boolean" },
        Ingress: { type: "Boolean" },
        ConfigFrom: { Network: { type: "String" } },
        ConfigOnly: { type: "Boolean" },
        Containers: { type: "Object" },
        Options: { type: "Object" },
    },
    { _id: false, collection: "network_info", versionKey: false }
);

module.exports = {
    NetworkInfoModel: mongoose.model("NetworkInfoModel", NetworkInfoSchema),
};
