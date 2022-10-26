const { VulnInfoModel } = require("../models/StaticAnalysisModel");
const { FilesOnlyInfoModel } = require("../models/ContainerModel");

const getVulnBrief = async (id) => {
    let vuln = await VulnInfoModel.findById(id, {
        _id: 0,
        vulnerabilities: 1,
        dependencyCount: 1,
        summary: 1,
    });

    vuln.vulnerabilities = vuln.vulnerabilities.map((element) => {
        return {
            id: element.id,
            title: element.title,
            severity: element.severity,
            cvssScore: element.cvssScore,
            description: element.description,
            packageName: element.packageName,
            disclosureTime: element.disclosureTime,
            packageManger: element.packageManger,
            name: element.name,
            version: element.version,
        };
    });

    return vuln;
};

const getVulnAll = async (id) => {
    const vuln = await VulnInfoModel.findById(id, { _id: 0 });
    return vuln;
};

const getMetadata = async (id, file) => {
    const metadata = await FilesOnlyInfoModel.findById(id, {
        _id: 0,
        filesystem: {
            [file]: 1,
        },
    });

    return metadata;
};

module.exports = {
    getVulnBrief: getVulnBrief,
    getVulnAll: getVulnAll,
    getMetadata: getMetadata,
};
