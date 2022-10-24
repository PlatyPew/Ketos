const { VulnInfoModel } = require("../models/StaticAnalysisModel");

const insertVuln = async (id, vuln) => {
    vuln._id = id;
    return await VulnInfoModel.insertMany([vuln])
};

module.exports = {
    insertVuln: insertVuln,
};
