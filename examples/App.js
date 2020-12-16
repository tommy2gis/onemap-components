import React from "react";
import ResourceCatalog,{ResourcesList} from "../components/ResourceCatalog/index";
import { Button, Space, Upload, Popconfirm } from 'antd';
import "./App.less";
const data = [
  {
    id: 39,
    pid: 1,
    name: "市政管理",
    type: 1,
    sort: 7,
    code: "01",
    servicetype: null,
    url: null,
    layers: null,
    opacity: null,
    userid: 1,
    status: 1,
    create_date: null,
    modify_date: null,
  },
  {
    id: 2156,
    pid: 1,
    name: "如皋环保",
    type: 1,
    sort: 12,
    code: "012",
    servicetype: null,
    url: null,
    layers: null,
    opacity: null,
    userid: 1,
    status: 1,
    create_date: null,
    modify_date: null,
  },
  {
    id: 2157,
    pid: 2156,
    name: "生态空间管控区域",
    type: 2,
    sort: 1,
    code: "012001",
    servicetype: "map",
    url: "http://geowork.wicp.vip/arcgis/rest/services/rugao/ep/MapServer",
    layers: "2",
    opacity: 1,
    userid: 1,
    status: 1,
    create_date: null,
    modify_date: null,
  },
  {
    id: 2158,
    pid: 2156,
    name: "国家级生态保护红线",
    type: 2,
    sort: 2,
    code: "012002",
    servicetype: "map",
    url: "http://geowork.wicp.vip/arcgis/rest/services/rugao/ep/MapServer",
    layers: "3",
    opacity: 1,
    userid: 1,
    status: 1,
    create_date: null,
    modify_date: null,
  },
  {
    id: 2159,
    pid: 2156,
    name: "界桩点位",
    type: 2,
    sort: 3,
    code: "012003",
    servicetype: "map",
    url: "http://geowork.wicp.vip/arcgis/rest/services/rugao/ep/MapServer",
    layers: "0",
    opacity: 1,
    userid: 1,
    status: 1,
    create_date: null,
    modify_date: null,
  },
  {
    id: 2160,
    pid: 2156,
    name: "告示牌点位",
    type: 2,
    sort: 4,
    code: "012004",
    servicetype: "map",
    url: "http://geowork.wicp.vip/arcgis/rest/services/rugao/ep/MapServer",
    layers: "1",
    opacity: 1,
    userid: 1,
    status: 1,
    create_date: null,
    modify_date: null,
  },
];
const onSelect=()=>{}
const App = () => (
  <>
  {/* <ResourcesList list={data}></ResourcesList> */}
  <ResourceCatalog data={data} onSelect={onSelect}></ResourceCatalog>

   
   
  </>
);

export default App;
