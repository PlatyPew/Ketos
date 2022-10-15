const mongoose = require("mongoose");

const VolumeInfoSchema = new mongoose.Schema(
    {
        _id: { type: "String" },
        CreatedAt: { type: "Date" },
        Driver: { type: "String" },
        Labels: { type: "Mixed" },
        Mountpoint: { type: "String" },
        Name: { type: "String" },
        Options: { type: "Mixed" },
        Scope: { type: "String" },
    },
    { _id: false, collection: "volume_info", versionKey: false }
);

module.exports = {
    VolumeInfoModel: mongoose.model("VolumeInfoModel", VolumeInfoSchema),
};
