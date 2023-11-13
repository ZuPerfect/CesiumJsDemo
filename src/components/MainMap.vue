<template>
  <div id="cesiumContainer"></div>
  <div class="buttons">
    <div class="button" @click="drawPoint">绘点</div>
    <div class="button" @click="drawLine">绘线</div>
    <div class="button" @click="drawPolygon">绘面</div>
  </div>
</template>

<script>
import { onMounted } from "vue";

// 需要将node_modules下面的cesium文件夹拷贝到public文件夹下面
window.CESIUM_BASE_URL = "/static/Cesium/";
window.currentTool = null;
window.viewer = null;

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

      window.viewer = viewer;

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

    const drawPoint = () => {
      if (window.currentTool) {
        window.currentTool.shutDown();
      }
      window.currentTool = new navi3d.Tool.DrawPointTool(Cesium, {
        isRemain: true, // 保留绘制的要素
      });
      window.currentTool.addToViewer(window.viewer).startUp({
        onFinish: editResult => {},
      });
    };

    const drawLine = () => {
      if (window.currentTool) {
        window.currentTool.shutDown();
      }
      window.currentTool = new navi3d.Tool.DrawLineTool(Cesium, {
        isRemain: true, // 不保留绘制的要素
      });
      window.currentTool.addToViewer(window.viewer).startUp({
        onFinish: editResult => {},
      });
    };

    const drawPolygon = () => {
      if (window.currentTool) {
        window.currentTool.shutDown();
      }
      window.currentTool = new navi3d.Tool.DrawPolygonTool(Cesium, {
        isRemain: true, // 不保留绘制的要素
      });
      window.currentTool.addToViewer(window.viewer).startUp({
        onFinish: editResult => {},
      });
    };

    onMounted(() => {
      initViewer();
    });
    return {
      drawPoint,
      drawLine,
      drawPolygon,
    };
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
.buttons {
  position: absolute;
  margin: 10px;
  display: flex;
}
.button {
  background-color: rgba(0, 0, 0, 0.8);
  padding: 5px 20px;
  margin: 5px;
  cursor: pointer;
  border-radius: 3px;
}
</style>
