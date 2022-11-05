  // Chakra imports
import ColumnsTable from "views/admin/image/components/ColumnsTable";
import ImageModal from "views/admin/image/components/ImageModal";

import React from "react";
import { useState, useEffect } from "react";

import axios from "axios";

const API = "127.0.0.1:3000"

const columnsData = [
  {
    Header: "IMAGE ID",
    accessor: "id",
  },
  {
    Header: "IMAGE NAME",
    accessor: "name",
  },
  {
    Header: "ARCHITECTURE",
    accessor: "arch",
  },
  {
    Header: "INFO",
    accessor: "info",
  },

];

export default function ImageInfo() {
  const [truncInfo, setTruncInfo] = useState([{id: "", name: "", arch: ""}]);

  useEffect(async () => {
    const imageIDs = (await axios.get(`http://${API}/api/image/id`)).data.response;

    const imageInfo = (await Promise.all(
      imageIDs.map((id) => {
        return axios.get(`http://${API}/api/image/info/${id}`)
      })
    )).map((response) => {
      return response.data.response;
    });

    const truncImageInfo = imageInfo.map((info) => {
      return {
        id: info.Id.slice(7),
        name: info.RepoTags === [] ? "NIL" : info.RepoTags[0],
        arch: info.Architecture,
        info: <ImageModal id={info.Id} />,
      };
    });

    setTruncInfo(truncImageInfo);

  }, []);


  return (
    <>
      <ColumnsTable header="Information" columnsData={columnsData} tableData={truncInfo} />
    </>
  );
}
