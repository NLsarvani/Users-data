import React from 'react'
import { Table, Button, Modal } from 'antd';

import UserModal from './UserModal';
import './UsersData.css';

const UsersData = (props) => {
    console.log(props)
    // constructor() {
    //     this.validator = new SimpleReactValidator();
    //   }
    // componentWillMount = () => {
    //     this.validator = new SimpleReactValidator();
    // }
    return (
        <div>
            {/* <>
            <Button className="adduser" type="primary" onClick={props.showModal}  >
                    Add User
        </Button>
                <UserModal showModal={props.showModal}
                    handleOk={props.handleOk}
                    handleCancel={props.handleCancel}
                    visible = {props.visible} />

            </> */}
            <Table columns={props.columns} dataSource={props.data} rowKey="_id"
                pagination={{ position: ['topRight'] }} >
            </Table>
        </div>
    )
}

export default UsersData;
