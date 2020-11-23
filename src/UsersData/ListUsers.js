import React from "react";
import { Table, Button, Modal } from "antd";

import "./ListUsers.css";

const ListUsers = (props) => {
  console.log(props);
  return (
    <div>
      <Table
        columns={props.columns}
        dataSource={props.data}
        rowKey="id"
        pagination={{ position: ["topRight"] }}
      ></Table>
    </div>
  );
};

export default ListUsers;
