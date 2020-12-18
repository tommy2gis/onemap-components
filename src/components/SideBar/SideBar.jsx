import React from 'react'
import { Drawer } from "antd";
import "./style.less";

const SideBar = props => {
    return (
        <Drawer
          {...props}
          className={`${props.className||''} sidebar_containtcard`}
          mask={false}
        >
         {props.children}
        </Drawer>
    )
}



export default SideBar
