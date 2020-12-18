const imageStyle = {
  version: 8,
  sources: {
    img_c: {
      type: "raster",
      tiles: [
        "http://t0.tianditu.gov.cn/DataServer?T=img_c&x={x}&y={y}&l={z}&tk=e90d56e5a09d1767899ad45846b0cefd",
      ],
      tileSize: 256,
    },
    cia_c: {
      type: "raster",
      tiles: [
        "http://t0.tianditu.gov.cn/DataServer?T=cia_c&x={x}&y={y}&l={z}&tk=e90d56e5a09d1767899ad45846b0cefd",
      ],
      tileSize: 256,
    },
    vec_c: {
      type: "raster",
      tiles: [
        "http://t0.tianditu.gov.cn/DataServer?T=vec_c&x={x}&y={y}&l={z}&tk=e90d56e5a09d1767899ad45846b0cefd",
      ],
      tileSize: 256,
    },
    cva_c: {
      type: "raster",
      tiles: [
        "http://t0.tianditu.gov.cn/DataServer?T=cva_c&x={x}&y={y}&l={z}&tk=e90d56e5a09d1767899ad45846b0cefd",
      ],
      tileSize: 256,
    },

    arealocation: {
      type: "geojson",
      data: {},
    },
    routinglocation: {
      type: "geojson",
      data: {},
    },
  },
  layers: [
    {
      id: "img_c",
      type: "raster",
      source: "img_c",
      minzoom: 0,
      maxzoom: 17.5,
    },
    {
      id: "cia_c",
      type: "raster",
      source: "cia_c",
      minzoom: 0,
      maxzoom: 17.5,
    },
    
    {
      id: "arealocation-outline",
      source: "arealocation",
      type: "fill",
      filter: ["all", ["==", "NAME", ""]],
      paint: {
        "fill-color": "rgba(97, 87, 204, 0.1)",
        "fill-opacity": 1,
        "fill-outline-color": "rgb(97, 87, 204)"
      },
    },

  ],
};

const roadStyle = {
  version: 8,
  sources: {
    img_c: {
      type: "raster",
      tiles: [
        "http://t6.tianditu.gov.cn/DataServer?T=img_c&x={x}&y={y}&l={z}&tk=e90d56e5a09d1767899ad45846b0cefd",
      ],
      tileSize: 256,
    },
    cia_c: {
      type: "raster",
      tiles: [
        "http://t6.tianditu.gov.cn/DataServer?T=cia_c&x={x}&y={y}&l={z}&tk=e90d56e5a09d1767899ad45846b0cefd",
      ],
      tileSize: 256,
    },
    vec_c: {
      type: "raster",
      tiles: [
        "http://t0.tianditu.gov.cn/DataServer?T=vec_c&x={x}&y={y}&l={z}&tk=e90d56e5a09d1767899ad45846b0cefd",
        "http://t1.tianditu.gov.cn/DataServer?T=vec_c&x={x}&y={y}&l={z}&tk=e90d56e5a09d1767899ad45846b0cefd",
        "http://t2.tianditu.gov.cn/DataServer?T=vec_c&x={x}&y={y}&l={z}&tk=e90d56e5a09d1767899ad45846b0cefd",
        "http://t3.tianditu.gov.cn/DataServer?T=vec_c&x={x}&y={y}&l={z}&tk=e90d56e5a09d1767899ad45846b0cefd",
        "http://t4.tianditu.gov.cn/DataServer?T=vec_c&x={x}&y={y}&l={z}&tk=e90d56e5a09d1767899ad45846b0cefd",
        "http://t6.tianditu.gov.cn/DataServer?T=vec_c&x={x}&y={y}&l={z}&tk=e90d56e5a09d1767899ad45846b0cefd",
      ],
      tileSize: 256,
    },
    cva_c: {
      type: "raster",
      tiles: [
        "http://t0.tianditu.gov.cn/DataServer?T=cva_c&x={x}&y={y}&l={z}&tk=e90d56e5a09d1767899ad45846b0cefd",
        "http://t1.tianditu.gov.cn/DataServer?T=cva_c&x={x}&y={y}&l={z}&tk=e90d56e5a09d1767899ad45846b0cefd",
        "http://t2.tianditu.gov.cn/DataServer?T=cva_c&x={x}&y={y}&l={z}&tk=e90d56e5a09d1767899ad45846b0cefd",
        "http://t3.tianditu.gov.cn/DataServer?T=cva_c&x={x}&y={y}&l={z}&tk=e90d56e5a09d1767899ad45846b0cefd",
        "http://t4.tianditu.gov.cn/DataServer?T=cva_c&x={x}&y={y}&l={z}&tk=e90d56e5a09d1767899ad45846b0cefd",
        "http://t6.tianditu.gov.cn/DataServer?T=cva_c&x={x}&y={y}&l={z}&tk=e90d56e5a09d1767899ad45846b0cefd",
      ],
      tileSize: 256,
    },
   
    arealocation: {
      type: "geojson",
      data: {},
    },
    routinglocation: {
      type: "geojson",
      data: {},
    },
  },
  "sprite": "http://localhost:8080/mapbox/sprites/sprite",
  "glyphs": "http://localhost:8080/mapbox/glyphs/{fontstack}/{range}.pbf",
  layers: [
    {
      id: "vec_c",
      type: "raster",
      source: "vec_c",
      minzoom: 0,
      maxzoom: 18,
    },
    {
      id: "cva_c",
      type: "raster",
      source: "cva_c",
      minzoom: 0,
      maxzoom: 18,
    },
    {
      id: "arealocation-outline",
      source: "arealocation",
      type: "fill",
      filter: ["all", ["==", "NAME", ""]],
      paint: {
        "fill-color": "rgba(97, 87, 204, 0.1)",
        "fill-opacity": 1,
        "fill-outline-color": "rgb(97, 87, 204)"
      },
    },
  ],
};
