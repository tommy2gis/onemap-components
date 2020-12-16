import React from 'react'
import PropTypes from 'prop-types'
import { Drawer } from "antd";
import "./style.less";

const SideBar = props => {
    return (
        <Drawer
          title={props.title}
          placement="right"
          className={props.className||'sidebar_containtcard'}
          mask={false}
          onClose={props.onClose}
          visible={true}
        >
         {props.children}
        </Drawer>
    )
}

SideBar.propTypes = {

}

export default SideBar
