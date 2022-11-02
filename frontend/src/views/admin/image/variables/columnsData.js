export const columnsDataImageInfo = [
  {
    Header: "WorkingDir",
    accessor: "Config.WorkingDir",
  },
  {
    Header: "User",
    accessor: "Config.User",
  },
  {
    Header: "Architecture",
    accessor: "Architecture",
  },
  {
    Header: "Button",
  }
];

export const columnsDataImageID = [
  {
    Header: "ID",
    accessor: row => `${row}`
  }
];

export const columnsDataImageDockerFile = [
  {
    Header: "Dockerfile",
    accessor: row => `${row}`
  }
];

export const columnsDataImageLayer = [
  {
    Header: "Layers",
    //accessor: row => `${row}`
  }
];

