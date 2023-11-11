<template>
  <div id="cesiumContainer"></div>
</template>

<script>
import { onMounted } from "vue";

// 需要将node_modules下面的cesium文件夹拷贝到public文件夹下面
window.CESIUM_BASE_URL = "/static/Cesium/";

import * as Cesium from "cesium";
import "cesium/Build/Cesium/Widgets/widgets.css";
// 需要申请cesium账号，在官网拿token
Cesium.Ion.defaultAccessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI1MTNiZDI4Ny1lMThmLTQ3YjQtOThiNS1iNzAxZGUyZDljMTQiLCJpZCI6MTc3MzczLCJpYXQiOjE2OTk2MDQ3Nzh9.4kfVf4DgbCiyjGC5CUC4yFZgVQXKEaTnNQpb1UMYEPM";

export default {
  name: "MainMap",
  setup() {
    const initViewer = () => {
      const viewer = new Cesium.Viewer("cesiumContainer", {
        terrain: Cesium.Terrain.fromWorldTerrain(),
      });

      viewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(-122.4175, 37.655, 400),
        orientation: {
          heading: Cesium.Math.toRadians(0.0),
          pitch: Cesium.Math.toRadians(-15.0),
        },
      });
      Cesium.createOsmBuildingsAsync().then(buildingTileset => {
        viewer.scene.primitives.add(buildingTileset);
      });
    };
    onMounted(() => {
      initViewer();
    });
    return {};
  },
};
</script>
<style scoped>
/* 占满屏幕 */
#cesiumContainer {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>
