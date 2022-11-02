export const columnsDataDevelopment = [
  {
    Header: "Id",
    accessor: "Id",
  },
  {
    Header: "Created",
    accessor: "Created",
  },
  {
    Header: "Path",
    accessor: "Path",
  },
  {
    Header: "Button",
  }
];

export const columnsDataContainerID = [
  {
    Header: "ID",
    accessor: row => `${row}`
  }
];

export const columnsDataContainerDiff = [
  {
    Header: "Add",
    accessor: row => `${row}`
  },
  {
    Header: "Edit",
    accessor: "2"
  },
  {
    Header: "Delete",
    accessor: "0"
  },
];
export const columnsDataContainerLogs = [
  {
    Header: "Logs",
    accessor: row => `${row}`
  }
];
