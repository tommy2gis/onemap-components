var mapStyle={
  "version": 8,
  "metadata": {},
  "sources": {
    "openmaptiles": {
      "type": "vector",
      "scheme": "xyz",
      zoomOffset:-1,
      "minzoom": 9,
      "tiles": [
        "http://61.177.139.228:38080/vectortiles/geostar_wuxi/EPSG_4326_{z}/{dir_x_y}/{x_y}.pbf"
      ]
    },
    "poi": {
      "type": "vector",
      "scheme": "xyz",
      zoomOffset:-1,
      "minzoom": 9,
      "tiles": [
         "http://61.177.139.228:38080/vectortiles/geostar_wuxipoi/EPSG_4326_{z}/{dir_x_y}/{x_y}.pbf"
      ]
    },
    "poi_level": {
      "type": "vector",
      "scheme": "xyz",
      zoomOffset:-1,
      "minzoom": 9,
      "tiles": [
        "http://61.177.139.228:38080/vectortiles/geostar_poi_level/EPSG_4326_{z}/{dir_x_y}/{x_y}.pbf"
      ]
    },
    "citybuilding": {
      "type": "vector",
      "scheme": "xyz",
      zoomOffset:-1,
      "minzoom": 9,
      "tiles": [
        "http://61.177.139.228:38080/vectortiles/geostar_buildings/EPSG_4326_{z}/{dir_x_y}/{x_y}.pbf"
      ]
    },
    "block": {
      "type": "vector",
      "scheme": "xyz",
      "zoomOffset": -1,
      "minzoom": 10,
      "tiles": [
        "http://localhost:8089/geoserver/gwc/service/wmts?REQUEST=GetTile&SERVICE=WMTS&VERSION=1.0.0&LAYER=swsk:xwcg&STYLE=&TILEMATRIX=EPSG:4326:{z}&TILEMATRIXSET=EPSG:4326&FORMAT=application/x-protobuf;type=mapbox-vector&TILECOL={x}&TILEROW={y}"
      ]
    },
    "arealocation": {
      "type": "geojson",
      "data": {}
    },
    "routinglocation": {
      "type": "geojson",
      "data": {}
    }
  },
  "sprite": "http://localhost:8080/mapbox/sprites/sprite",
  "glyphs": "http://localhost:8080/mapbox/glyphs/{fontstack}/{range}.pbf",
  "layers": [
    {
      "id": "background",
      "type": "background",
      "layout": {"visibility": "visible"},
      "paint": {"background-color": "#FCF9F2"}
    },
    
    {
      "id": "landuse-residential",
      "type": "fill",
      "metadata": {"mapbox:group": "1444849388993.3071"},
      "source": "openmaptiles",
      "source-layer": "yuanluo",
      "minzoom": 14,
      "layout": {"visibility": "visible"},
      "paint": {
        "fill-color": {
          "base": 1,
          "stops": [
            [12, "hsla(30, 19%, 90%, 0.6)"],
            [20, "hsla(30, 19%, 90%, 0.4)"]
          ]
        },
        "fill-outline-color": "#EEECE7"
      }
    },
    {
      "id": "landuse-hospital",
      "type": "fill",
      "metadata": {"mapbox:group": "1444849388993.3071"},
      "source": "openmaptiles",
      "source-layer": "wuxilanduse",
      "minzoom": 13,
      "filter": [
        "all",
        ["==", "$type", "Polygon"],
        ["in", "用地代", "C5", "C51", "C51s", "C52"]
      ],
      "paint": {"fill-color": "#EBD8DE"}
    },
    {
      "id": "landuse-business",
      "type": "fill",
      "metadata": {"mapbox:group": "1444849388993.3071"},
      "source": "openmaptiles",
      "source-layer": "wuxilanduse",
      "minzoom": 13,
      "filter": ["all", ["==", "$type", "Polygon"], ["in", "用地代", "C21"]],
      "paint": {"fill-color": "#E9E0ED"}
    },
    {
      "id": "landuse-school",
      "type": "fill",
      "metadata": {"mapbox:group": "1444849388993.3071"},
      "source": "openmaptiles",
      "source-layer": "wuxilanduse",
      "minzoom": 13,
      "filter": [
        "all",
        ["==", "$type", "Polygon"],
        [
          "in",
          "用地代",
          "C61",
          "C62",
          "Rcj",
          "Rcj0",
          "Rcj1",
          "Rcj2",
          "Rcj3",
          "Rcj4",
          "A33",
          "A33a",
          "A33b",
          "A33c",
          "A33d"
        ]
      ],
      "paint": {"fill-color": "#DCEAF0"}
    },
    {
      "id": "green",
      "type": "fill",
      "metadata": {"mapbox:group": "1444849388993.3071"},
      "source": "openmaptiles",
      "source-layer": "wuxigreen",
      "filter": ["all", ["==", "$type", "Polygon"]],
      "layout": {"visibility": "visible"},
      "paint": {"fill-color": "#CFE8A7"}
    },
    {
      "id": "water-lake",
      "type": "fill",
      "metadata": {"mapbox:group": "1444849388993.3071"},
      "source": "openmaptiles",
      "source-layer": "water",
      "filter": ["all", ["==", "$type", "Polygon"], ["==", "CC", "1020"]],
      "paint": {"fill-color": "#ADD2FF"}
    },
    {
      "id": "water-river",
      "type": "fill",
      "metadata": {"mapbox:group": "1444849388993.3071"},
      "source": "openmaptiles",
      "source-layer": "water",
      "minzoom": 8,
      "filter": ["all", ["==", "$type", "Polygon"], ["==", "CC", "1012"]],
      "paint": {"fill-color": "#ADD2FF"}
    },
    {
      "id": "water-smalriver",
      "type": "fill",
      "metadata": {"mapbox:group": "1444849388993.3071"},
      "source": "openmaptiles",
      "source-layer": "water",
      "minzoom": 11,
      "maxzoom": 24,
      "filter": ["all", ["==", "$type", "Polygon"], ["==", "CC", "1011"]],
      "paint": {"fill-color": "#ADD2FF"}
    },
    {
      "id": "subwayzwb2",
      "type": "fill",
      "metadata": {"mapbox:group": "1444849388993.3071"},
      "source": "openmaptiles",
      "source-layer": "subwayzwb",
      "minzoom": 14,
      "filter": ["all", ["==", "$type", "Polygon"], [">", "OBJECTID", 60]],
      "layout": {"visibility": "visible"},
      "paint": {"fill-color": "#A7D7A9"}
    },
    {
      "id": "subwayzwb1",
      "type": "fill",
      "metadata": {"mapbox:group": "1444849388993.3071"},
      "source": "openmaptiles",
      "source-layer": "subwayzwb",
      "minzoom": 14,
      "maxzoom": 24,
      "filter": ["all", ["==", "$type", "Polygon"], ["<=", "OBJECTID", 60]],
      "layout": {"visibility": "visible"},
      "paint": {"fill-color": "#F1BFBB"}
    },
    {
      "id": "landuse-commercial",
      "type": "fill",
      "metadata": {"mapbox:group": "1444849388993.3071"},
      "source": "openmaptiles",
      "source-layer": "landuse",
      "filter": [
        "all",
        ["==", "$type", "Polygon"],
        ["==", "type", "commercial"]
      ],
      "layout": {"visibility": "visible"},
      "paint": {"fill-color": "hsla(0, 60%, 87%, 0.23)"}
    },
    {
      "id": "3d-buildings",
      "type": "fill-extrusion",
      "source": "citybuilding",
      "source-layer": "buildings",
      "minzoom": 16,
      "layout": {"visibility": "visible"},
      "paint": {
        "fill-extrusion-color": "rgba(216, 216, 216, 1)",
        "fill-extrusion-height": [
          "interpolate",
          ["linear"],
          ["zoom"],
          15,
          0,
          15.05,
          ["*", 3, ["get", "FWCS"]]
        ],
        "fill-extrusion-base": [
          "interpolate",
          ["linear"],
          ["zoom"],
          15,
          0,
          15.05,
          ["get", "DXFWCS"]
        ],
        "fill-extrusion-opacity": 0.3,
        "fill-extrusion-vertical-gradient": false
      }
    },
    {
      "id": "bounds",
      "type": "line",
      "metadata": {
        "mapbox:group": "1444849388993.3071"
      },
      "source": "openmaptiles",
      "source-layer": "wuxipolygon",
      "minzoom": 10,
      "layout": {
        "visibility": "visible"
      },
      "paint": {
        "line-color": "rgba(212, 212, 212, 1)",
        "line-width": 1.5
      }
    },
    {
      "id": "tunnel-tertiary-casing",
      "type": "line",
      "metadata": {"mapbox:group": "1444849354174.1904"},
      "source": "openmaptiles",
      "source-layer": "wuxiroads",
      "minzoom": 13,
      "filter": ["all", ["!in", "GB", 430301, 430200, 430501, 430301, 421001]],
      "layout": {"line-join": "round", "line-cap": "round"},
      "paint": {
        "line-color": "#cfcdca",
        "line-width": {
          "base": 1.2,
          "stops": [[12, 0.5], [13, 1], [14, 4], [20, 15]]
        }
      }
    },
    {
      "id": "tunnel-tertiary",
      "type": "line",
      "metadata": {"mapbox:group": "1444849354174.1904"},
      "source": "openmaptiles",
      "source-layer": "wuxiroads",
      "minzoom": 13,
      "filter": ["all", ["!in", "GB", 430301, 430200, 430501, 430301, 421001]],
      "layout": {
        "line-join": "round",
        "line-cap": "round",
        "visibility": "visible"
      },
      "paint": {
        "line-color": "#FFFFFF",
        "line-width": {"base": 1.2, "stops": [[13, 0], [14, 2.5], [20, 11.5]]}
      }
    },
    {
      "id": "tunnel-secondary-casing",
      "type": "line",
      "metadata": {"mapbox:group": "1444849354174.1904"},
      "source": "openmaptiles",
      "source-layer": "wuxiroads",
      "filter": ["all", ["in", "GB", 430301]],
      "layout": {
        "line-join": "round",
        "line-cap": "round",
        "visibility": "visible"
      },
      "paint": {
        "line-color": "#cfcdca",
        "line-width": {"base": 1.2, "stops": [[8, 1.5], [20, 17]]}
      }
    },
    {
      "id": "tunnel-secondary",
      "type": "line",
      "metadata": {"mapbox:group": "1444849354174.1904"},
      "source": "openmaptiles",
      "source-layer": "wuxiroads",
      "filter": ["all", ["in", "GB", 430301]],
      "layout": {
        "line-join": "round",
        "line-cap": "round",
        "visibility": "visible"
      },
      "paint": {
        "line-color": "rgba(255, 254, 250, 1)",
        "line-width": {"base": 1.2, "stops": [[6, 0], [8, 0.5], [20, 13]]}
      }
    },
    {
      "id": "tunnel-trunk-primary-casing",
      "type": "line",
      "metadata": {"mapbox:group": "1444849354174.1904"},
      "source": "openmaptiles",
      "source-layer": "wuxiroads",
      "filter": ["all", ["in", "GB", 430200, 430501, 430301]],
      "layout": {"line-join": "round"},
      "paint": {
        "line-color": "#e9ac77",
        "line-width": {
          "base": 1.2,
          "stops": [[5, 0.4], [6, 0.6], [7, 1.5], [20, 22]]
        }
      }
    },
    {
      "id": "tunnel-trunk-primary",
      "type": "line",
      "metadata": {"mapbox:group": "1444849354174.1904"},
      "source": "openmaptiles",
      "source-layer": "wuxiroads",
      "filter": ["all", ["in", "GB", 430200, 430501, 430301]],
      "layout": {"line-join": "round"},
      "paint": {
        "line-color": "#fea",
        "line-width": {"base": 1.2, "stops": [[6.5, 0], [7, 0.5], [20, 18]]}
      }
    },
    {
      "id": "tunnel-motorway-casing",
      "type": "line",
      "metadata": {"mapbox:group": "1444849354174.1904"},
      "source": "openmaptiles",
      "source-layer": "wuxiroads",
      "filter": ["all", ["==", "GB", 421001]],
      "layout": {
        "line-join": "round",
        "visibility": "visible",
        "line-cap": "round"
      },
      "paint": {
        "line-color": "rgba(197, 94, 5, 1)",
        "line-dasharray": [1],
        "line-width": {
          "base": 1.2,
          "stops": [[5, 0.4], [6, 0.6], [7, 1.5], [20, 34]]
        }
      }
    },
    {
      "id": "tunnel-motorway",
      "type": "line",
      "metadata": {"mapbox:group": "1444849354174.1904"},
      "source": "openmaptiles",
      "source-layer": "wuxiroads",
      "filter": ["all", ["==", "GB", 421001]],
      "layout": {
        "line-join": "round",
        "visibility": "visible",
        "line-cap": "round"
      },
      "paint": {
        "line-color": "rgba(255, 162, 92, 1)",
        "line-width": {"base": 1.2, "stops": [[6.5, 0], [7, 0.5], [20, 30]]}
      }
    },
    {
      "id": "tunnel-railway",
      "type": "line",
      "metadata": {"mapbox:group": "1444849354174.1904"},
      "source": "openmaptiles",
      "source-layer": "roads",
      "filter": ["all", ["==", "type", "rail"]],
      "paint": {
        "line-color": "#bbb",
        "line-width": {"base": 1.4, "stops": [[14, 0.4], [15, 0.75], [20, 2]]},
        "line-dasharray": [2, 2]
      }
    },
    {
      "id": "railway-copy",
      "type": "line",
      "metadata": {"mapbox:group": "1444849354174.1904"},
      "source": "openmaptiles",
      "source-layer": "railway",
      "minzoom": 13,
      "maxzoom": 24,
      "filter": ["all", ["in", "MC", "新长铁路", "城际铁路"]],
      "paint": {
        "line-color": "rgba(113, 113, 113, 1)",
        "line-width": {"stops": [[15, 3], [16, 5]]}
      }
    },
    {
      "id": "railway-copy-copy",
      "type": "line",
      "metadata": {"mapbox:group": "1444849354174.1904"},
      "source": "openmaptiles",
      "source-layer": "railway",
      "minzoom": 13,
      "maxzoom": 24,
      "filter": ["all", ["in", "MC", "新长铁路", "城际铁路"]],
      "layout": {"visibility": "visible"},
      "paint": {
        "line-color": "rgba(242, 239, 239, 1)",
        "line-width": {"stops": [[15, 3], [16, 5]]},
        "line-dasharray": [5, 5]
      }
    },
    {
      "id": "railway",
      "type": "line",
      "metadata": {"mapbox:group": "1444849354174.1904"},
      "source": "openmaptiles",
      "source-layer": "railway",
      "minzoom": 13,
      "maxzoom": 24,
      "filter": ["all", ["!in", "MC", "新长铁路", "城际铁路"]],
      "paint": {
        "line-color": "rgba(234, 147, 147, 1)",
        "line-width": {"stops": [[15, 3], [16, 5]]}
      }
    },
    {
      "id": "railway-sub",
      "type": "line",
      "metadata": {"mapbox:group": "1444849354174.1904"},
      "source": "openmaptiles",
      "source-layer": "railway",
      "minzoom": 13,
      "maxzoom": 24,
      "filter": ["all", ["!in", "MC", "新长铁路", "城际铁路"]],
      "paint": {
        "line-color": "rgba(255, 255, 255, 1)",
        "line-width": {"stops": [[15, 2], [16, 4]]},
        "line-dasharray": [5, 5]
      }
    },
    {
      "id": "subwayline1",
      "type": "line",
      "metadata": {"mapbox:group": "1444849354174.1904"},
      "source": "openmaptiles",
      "source-layer": "subwayline",
      "filter": ["all", ["==", "NAME", "地铁一号线"]],
      "paint": {
        "line-color": "rgba(218, 126, 126, 1)",
        "line-width": {"base": 1.2, "stops": [[15, 2], [20, 4]]}
      }
    },
    {
      "id": "subwayline2",
      "type": "line",
      "metadata": {"mapbox:group": "1444849354174.1904"},
      "source": "openmaptiles",
      "source-layer": "subwayline",
      "filter": ["all", ["==", "NAME", "地铁二号线"]],
      "paint": {"line-color": "rgba(101, 193, 110, 1)", "line-width": 3}
    },
    {
      "id": "highway-name-major",
      "type": "symbol",
      "source": "openmaptiles",
      "source-layer": "wuiroads",
      "minzoom": 12.2,
      "filter": ["all"],
      "layout": {
        "text-size": {"base": 1, "stops": [[13, 12], [14, 13]]},
        "text-font": ["Microsoft YaHei Regular"],
        "text-field": "{NAME}",
        "symbol-placement": "line",
        "text-rotation-alignment": "viewport",
        "visibility": "visible",
        "text-pitch-alignment": "auto"
      },
      "paint": {
        "text-halo-blur": 0.5,
        "text-color": "#765",
        "text-halo-width": 1
      }
    },
    {
      "id": "landuse-industrial",
      "type": "fill",
      "metadata": {"mapbox:group": "1444849388993.3071"},
      "source": "openmaptiles",
      "source-layer": "landuse",
      "filter": [
        "all",
        ["==", "$type", "Polygon"],
        ["==", "type", "industrial"]
      ],
      "layout": {"visibility": "visible"},
      "paint": {"fill-color": "hsla(49, 100%, 88%, 0.34)"}
    },
    {
      "id": "poi-level-20",
      "type": "symbol",
      "source": "poi",
      "source-layer": "wuxipoi",
      "minzoom": 19,
      "filter": [
        "all",
        ["==", "WEIGHTINES", "level20"],
        ["==", "符号名", "地铁出入口"]
      ],
      "layout": {
        "text-padding": 2,
        "text-font": ["Microsoft YaHei Regular"],
        "text-anchor": "left",
        "icon-image": "{iconname}-11",
        "text-field": "{DOMAINNAME}",
        "text-offset": [0.6, 0],
        "text-size": 13,
        "text-max-width": 6,
        "icon-offset": [6, 0],
        "icon-anchor": "right"
      },
      "paint": {
        "icon-opacity": 1,
        "text-halo-blur": 0.5,
        "text-color": "#4D4D4D",
        "text-halo-width": 1,
        "text-halo-color": "#ffffff"
      }
    },
    {
      "id": "poi-level-19",
      "type": "symbol",
      "source": "poi",
      "source-layer": "wuxipoi",
      "minzoom": 18,
      "maxzoom": 24,
      "filter": ["all", ["==", "WEIGHTINES", "level19"]],
      "layout": {
        "text-padding": 2,
        "text-font": ["Microsoft YaHei Regular"],
        "text-anchor": "left",
        "icon-image": "{符号名}",
        "text-field": "{DOMAINNAME}",
        "text-offset": [0.6, 0],
        "text-size": 13,
        "text-max-width": 6,
        "icon-offset": [6, 0],
        "icon-anchor": "right"
      },
      "paint": {
        "icon-opacity": 1,
        "text-halo-blur": 0.5,
        "text-color": "#4D4D4D",
        "text-halo-width": 1,
        "text-halo-color": "#ffffff"
      }
    },
    {
      "id": "poi-level-18-subway",
      "type": "symbol",
      "source": "poi",
      "source-layer": "wuxipoi",
      "minzoom": 16,
      "filter": [
        "all",
        ["==", "WEIGHTINES", "level18"],
        ["==", "符号名", "地铁出入口"]
      ],
      "layout": {
        "text-padding": 0,
        "text-font": {"stops": [[6, ["Microsoft YaHei Regular"]], [10, ["Microsoft YaHei Regular"]]]},
        "text-anchor": "center",
        "icon-image": "{符号名}",
        "text-field": "{DOMAINNAME}",
        "text-offset": [0, 0],
        "text-size": 13,
        "text-max-width": 6,
        "visibility": "visible",
        "icon-offset": [0, 0],
        "icon-anchor": "center",
        "text-justify": "center",
        "icon-text-fit": "both",
        "icon-text-fit-padding": [8, 12, 8, 12]
      },
      "paint": {
        "icon-opacity": 1,
        "text-halo-blur": 0.5,
        "text-color": "#ffffff",
        "text-halo-width": 0,
        "text-halo-color": "#ffffff"
      }
    },
    {
      "id": "poi-level-18-subwaystation-small",
      "type": "symbol",
      "source": "poi",
      "source-layer": "wuxipoi",
      "minzoom": 11,
      "maxzoom": 13,
      "filter": [
        "all",
        ["==", "WEIGHTINES", "level18"],
        ["==", "符号名", "无锡地铁站点"]
      ],
      "layout": {
        "text-padding": 2,
        "text-font": ["Microsoft YaHei Regular"],
        "text-anchor": "left",
        "icon-image": "其他",
        "text-field": "",
        "text-offset": [0.6, 0],
        "text-size": 13,
        "text-max-width": 6,
        "visibility": "visible",
        "icon-offset": [0, 0],
        "icon-anchor": "center"
      },
      "paint": {
        "icon-opacity": 1,
        "text-halo-blur": 0.5,
        "text-color": "#4D4D4D",
        "text-halo-width": 1,
        "text-halo-color": "#ffffff"
      }
    },
    {
      "id": "poi-level-18-subwaystation",
      "type": "symbol",
      "source": "poi",
      "source-layer": "wuxipoi",
      "minzoom": 13,
      "filter": [
        "all",
        ["==", "WEIGHTINES", "level18"],
        ["==", "符号名", "无锡地铁站点"]
      ],
      "layout": {
        "text-padding": 2,
        "text-font": ["Microsoft YaHei Regular"],
        "text-anchor": "left",
        "icon-image": "{符号名}",
        "text-field": "{DOMAINNAME}",
        "text-offset": [0.6, 0],
        "text-size": 13,
        "text-max-width": 6,
        "visibility": "visible",
        "icon-offset": [6, 0],
        "icon-anchor": "right"
      },
      "paint": {
        "icon-opacity": 1,
        "text-halo-blur": 0.5,
        "text-color": "#4D4D4D",
        "text-halo-width": 1,
        "text-halo-color": "#ffffff"
      }
    },
    {
      "id": "poi-level-18",
      "type": "symbol",
      "source": "poi",
      "source-layer": "wuxipoi",
      "minzoom": 16,
      "filter": [
        "all",
        ["==", "WEIGHTINES", "level18"],
        ["!in", "符号名", "地铁出入口", "无锡地铁站点"]
      ],
      "layout": {
        "text-padding": 2,
        "text-font": ["Microsoft YaHei Regular"],
        "text-anchor": "left",
        "icon-image": "{符号名}",
        "text-field": "{DOMAINNAME}",
        "text-offset": [0.6, 0],
        "text-size": 13,
        "text-max-width": 6,
        "visibility": "visible",
        "icon-offset": [6, 0],
        "icon-anchor": "right"
      },
      "paint": {
        "icon-opacity": 1,
        "text-halo-blur": 0.5,
        "text-color": "#4D4D4D",
        "text-halo-width": 1,
        "text-halo-color": "#ffffff"
      }
    },
    {
      "id": "poi-level-16",
      "type": "symbol",
      "source": "poi",
      "source-layer": "wuxipoi",
      "minzoom": 14,
      "maxzoom": 16,
      "filter": [
        "all",
        ["==", "WEIGHTINES", "level18"],
        ["!=", "iconname", "bus"],
        ["!=", "iconname", "circle"]
      ],
      "layout": {
        "text-padding": 2,
        "text-font": ["Microsoft YaHei Regular"],
        "text-anchor": "left",
        "icon-image": "{符号名}",
        "text-field": "{DOMAINNAME}",
        "text-offset": [0.6, 0],
        "text-size": 13,
        "text-max-width": 6,
        "visibility": "visible",
        "icon-offset": [-4, 0]
      },
      "paint": {
        "icon-opacity": 1,
        "text-halo-blur": 0.5,
        "text-color": "#4D4D4D",
        "text-halo-width": 1,
        "text-halo-color": "#ffffff"
      }
    },
    {
      "id": "poi-level-15",
      "type": "symbol",
      "source": "poi_level",
      "source-layer": "poi_level",
      "minzoom": 14,
      "maxzoom": 15,
      "filter": ["all", ["!=", "L15", ""]],
      "layout": {
        "text-padding": 2,
        "text-font": ["Microsoft YaHei Regular"],
        "text-anchor": "left",
        "icon-image": "{符号名}",
        "text-field": "{简称NEW}",
        "text-offset": [0.6, 0],
        "text-size": 13,
        "text-max-width": 6,
        "visibility": "visible",
        "icon-offset": [-4, 0]
      },
      "paint": {
        "icon-opacity": 1,
        "text-halo-blur": 0.5,
        "text-color": "#4D4D4D",
        "text-halo-width": 1,
        "text-halo-color": "#ffffff"
      }
    },
    {
      "id": "poi-level-14",
      "type": "symbol",
      "source": "poi_level",
      "source-layer": "poi_level",
      "minzoom": 13,
      "maxzoom": 14,
      "filter": ["all", ["!=", "L14", ""]],
      "layout": {
        "text-padding": 2,
        "text-font": ["Microsoft YaHei Regular"],
        "text-anchor": "left",
        "icon-image": "{符号名}",
        "text-field": "{简称NEW}",
        "text-offset": [0.6, 0],
        "text-size": 13,
        "text-max-width": 6,
        "visibility": "visible",
        "icon-offset": [-4, 0]
      },
      "paint": {
        "icon-opacity": 1,
        "text-halo-blur": 0.5,
        "text-color": "#4D4D4D",
        "text-halo-width": 1,
        "text-halo-color": "#ffffff"
      }
    },
    {
      "id": "poi-level-13",
      "type": "symbol",
      "source": "poi_level",
      "source-layer": "poi_level",
      "minzoom": 12,
      "maxzoom": 13,
      "filter": ["all", ["!=", "L13", ""]],
      "layout": {
        "text-padding": 2,
        "text-font": ["Microsoft YaHei Regular"],
        "text-anchor": "left",
        "icon-image": "{符号名}",
        "text-field": "{简称NEW}",
        "text-offset": [0.6, 0],
        "text-size": 13,
        "text-max-width": 6,
        "visibility": "visible",
        "icon-offset": [-4, 0]
      },
      "paint": {
        "icon-opacity": 1,
        "text-halo-blur": 0.5,
        "text-color": "#4D4D4D",
        "text-halo-width": 1,
        "text-halo-color": "#ffffff"
      }
    },
    {
      "id": "poi-level-12",
      "type": "symbol",
      "source": "poi_level",
      "source-layer": "poi_level",
      "minzoom": 11,
      "maxzoom": 12,
      "filter": ["all", ["!=", "L12", ""]],
      "layout": {
        "text-padding": 2,
        "text-font": ["Microsoft YaHei Regular"],
        "text-anchor": "left",
        "icon-image": "{符号名}",
        "text-field": "{简称NEW}",
        "text-offset": [0.6, 0],
        "text-size": 13,
        "text-max-width": 6,
        "visibility": "visible",
        "icon-offset": [-4, 0]
      },
      "paint": {
        "icon-opacity": 1,
        "text-halo-blur": 0.5,
        "text-color": "#4D4D4D",
        "text-halo-width": 1,
        "text-halo-color": "#ffffff"
      }
    },
    {
      "id": "poi-level-11",
      "type": "symbol",
      "source": "poi_level",
      "source-layer": "poi_level",
      "minzoom": 0,
      "maxzoom": 11,
      "filter": [
        "any",
        ["!=", "L11", ""],
        ["!=", "L10", ""],
        ["!=", "L9", ""],
        ["!=", "L8", ""],
        ["!=", "L7", ""]
      ],
      "layout": {
        "text-padding": 2,
        "text-font": ["Microsoft YaHei Regular"],
        "text-anchor": "left",
        "icon-image": "{符号名}",
        "text-field": "{简称NEW}",
        "text-offset": [0.6, 0],
        "text-size": 13,
        "text-max-width": 6,
        "visibility": "visible",
        "icon-offset": [-4, 0]
      },
      "paint": {
        "icon-opacity": 1,
        "text-halo-blur": 0.5,
        "text-color": "#4D4D4D",
        "text-halo-width": 1,
        "text-halo-color": "#ffffff"
      }
    },
    {
      "id": "新吴区边框-深",
      "type": "line",
      "source": "block",
      "source-layer": "XW",
      "layout": {
        "line-join": "round",
        "line-cap": "round",
        "visibility": "visible",
        "line-round-limit": 0,
        "line-miter-limit": 0
      },
      "paint": {
        "line-color": "rgba(47, 107, 164, 1)",
        "line-width": 4,
        "line-opacity": 1,
        "line-blur": 1,
        "line-offset": -1
      }
    },
    {
      "id": "新吴区街道",
      "type": "fill",
      "source": "block",
      "source-layer": "JD",
      "filter": ["all"],
      "paint": {
        "fill-color": {
          "property": "name",
          "type": "categorical",
          "stops": [
            ["江溪街道", "#f9fbea"],
            ["梅村街道", "#eafbe9"],
            ["区属直管", "#f5eefa"],
            ["硕放街道", "#fbebec"],
            ["旺庄街道", "#eef2f8"],
            ["新安街道", "#f1fbf9"],
            ["鸿山街道", "#fbf3e8"]
          ],
          "default": "rgba(177, 133, 133, 1)"
        },
        "fill-opacity": 0.8
      }
    },
    {
      id: "CGBJEx",
      type: "raster",
      source: "CGBJEx"
    },
    {
      "id": "新吴区街道边框",
      "type": "line",
      "source": "block",
      "layout": {
        "line-join": "round",
        "line-cap": "round",
        "visibility": "visible",
        "line-round-limit": 0,
        "line-miter-limit": 0
      },
      "paint": {
        "line-color": "rgba(4, 132, 247, 1)",
        "line-width": 2,
        "line-opacity": 1,
        "line-blur": 1,
        "line-offset": 0
      },
      "source-layer": "JD"
    },
    {
      "id": "新吴区社区边框",
      "type": "line",
      "source": "block",
      "source-layer": "WG",
      "layout": {
        "line-join": "round",
        "line-cap": "round",
        "visibility": "visible",
        "line-round-limit": 0,
        "line-miter-limit": 0
      },
      "paint": {
        "line-color": "rgba(47, 107, 164, 1)",
        "line-width": 2,
        "line-opacity": 1,
        "line-blur": 1,
        "line-offset": 0
      },
      "minzoom": 13
    },
    {
      "id": "新吴区街道标注",
      "type": "symbol",
      "source": "block",
      "source-layer": "JDPOINT",
      "layout": {
        "text-field": "{街道名}",
        "text-font": ["Microsoft YaHei Regular"],
        "symbol-z-order": "auto",
        "symbol-avoid-edges": false,
        "symbol-spacing": 250,
        "text-pitch-alignment": "auto",
        "text-rotation-alignment": "auto",
        "text-keep-upright": false,
        "symbol-placement": "point"
      },
      "maxzoom": 13,
      "paint": {
        "text-color": "rgba(61, 61, 61, 1)",
        "text-halo-width": 1,
        "text-halo-color": "rgba(222, 222, 222, 1)",
        "text-halo-blur": 1
      }
    },
    {
      "id": "新吴区社区标注",
      "type": "symbol",
      "source": "block",
      "source-layer": "WGPOINT",
      "layout": {
        "text-field": "{单元__13}",
        "text-font": ["Microsoft YaHei Regular"],
        "symbol-z-order": "auto",
        "symbol-avoid-edges": false,
        "symbol-spacing": 250,
        "text-pitch-alignment": "auto",
        "text-rotation-alignment": "auto",
        "text-keep-upright": false,
        "symbol-placement": "point",
        "text-justify": "center",
        "text-anchor": "center",
        "text-max-angle": 45,
        "text-size": {
          "stops": [[13, 12], [20, 20]]
        }
      },
      "maxzoom": 24,
      "minzoom": 13,
      "paint": {
        "text-color": "rgba(16, 26, 175, 1)",
        "icon-halo-width": 0,
        "icon-halo-blur": 0,
        "text-halo-width": 1,
        "text-halo-color": "rgba(212, 212, 212, 1)",
        "text-opacity": {
          "stops": [[13, 0.8], [20, 1]]
        }
      }
    },
    {
      "id": "arealocation-outline",
      "source": "arealocation",
      "type": "fill",
      "filter": ["all", ["==", "name", ""]],
      "paint": {
          "fill-color": "#088",
          "fill-opacity": 0.1,
          "fill-outline-color": "#088"
          }
    },{
      "id": "routinglocation-line",
      "type": "line",
      "source": "routinglocation",
      "paint": {"line-color": "#4DA9E5", "line-width": 6}
    }
  ],
  "id": "hrmq9na14"
}