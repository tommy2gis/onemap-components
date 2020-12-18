import React, { Component } from 'react'
import { Drawer } from "antd";
import "./style.less";

export default class SideBar extends Component {
    render() {
        return (
            <Drawer
          title={this.props.title}
          placement="left"
          className={this.props.className||'sidebar_containtcard'}
          mask={false}
          onClose={this.props.onClose}
          visible={true}
        >
         {this.props.children}
        </Drawer>
        )
    }
}
