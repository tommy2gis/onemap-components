const mapConfigJson={
  "systemtitle":"如皋市生态功能区空间信息管理系统",
  "tdtserverurl": "http://api.tianditu.gov.cn",
  "tdttk":"56e2ef8967b3a0dbb746b7a40b7faa94",
  "cadtojsonserver":"http://222.184.244.132:8088/cadtojson-server/Request/RequestServicesCAD.ashx",
  "cadpath":"D://Deploy/file/rghb/cad/",
  //"serverurl":"http://localhost:8089",
  "serverurl":"http://222.184.244.132:8088/rghb-server",
  "solrurl1":"http://61.177.139.228/gateway/solr/solr_poi_core/select",
  "solrurl":"http://2.20.101.190:8081/wx-cloud-webserver/rest/onlie_map/poi_query/find",
  "mapserverurl":"http://192.168.101.201:6080/arcgis/rest/services/rugao/ep/MapServer",
  "sprites_bj":"http://localhost:8080/mapbox/sprites_bj/sprite",
  "map3d": {
    "viewport": {
      "latitude":  32.38799580,
      "longitude": 120.588,
      "zoom": 12,
      "maxZoom": 20,
      "minZoom": 10,
      "bearing": 0,
      "pitch": 0
    }
  },

  "map": {
    "projection": "EPSG:4326",  
    "units": "m",
    "center": {
      "x": 120.588,
      "y": 32.38799580,
      "crs": "EPSG:4326"
    },
    "zoom": 11,
    "maxZoom": 20,
    "layers": []
  }
}
