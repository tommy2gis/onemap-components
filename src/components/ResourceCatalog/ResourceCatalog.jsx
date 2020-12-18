import React from 'react'
import ResourcesList from './ResourcesList'
import SideBar from '../SideBar/SideBar'

const ResourceCatalog = props => {
    return (
        <SideBar {...props.sideprops}>
            <ResourcesList list={props.data} onSelect={props.onSelect} ></ResourcesList>
        </SideBar>
    )
}


export default ResourceCatalog
