
import React from "react";
import * as BABYLON from "babylonjs";
import SceneComponent from "../Babylon_components/SceneComponent";
// import SceneComponent from 'babylonjs-hook'; // if you install 'babylonjs-hook' NPM.

import * as Cameras_Module from "../Modules/Cameras_Module"
import * as Lights_Module from "../Modules/Lights_Module"
import * as Materials_Module from "../Modules/Materials_Module";

import * as Babylon_Components from "../Babylon_components"


const onSceneReady = (e) => {

  const { canvas, scene, engine } = e;

  Cameras_Module.FreeCameraDefault(canvas, scene);

  Lights_Module.HemisphericLight(scene);

  Babylon_Components.PlayGround();

  var box_material = Materials_Module.MaterialRandom();



  // Our built-in 'box' shape.
  var box = BABYLON.MeshBuilder.CreateBox("box", { size: 2 }, scene);
  box.material =box_material;

  // Move the box upward 1/2 its height
  box.position = new BABYLON.Vector3(1,1,1);

  Babylon_Components.showWorldAxis(10,scene);
 
  var localAxe1 = Babylon_Components.showLocalAxes(3,scene);

  localAxe1.parent = box;

  

  scene.onBeforeRenderObservable.add(() => {
    if (box !== undefined) {
      const deltaTimeInMillis = scene.getEngine().getDeltaTime();

      const rpm = 30
      box.rotation.y += (rpm / 60) * Math.PI * 2 * (deltaTimeInMillis / 1000);
    }

  });

};


function Scene() {
  return (
    <SceneComponent antialias onSceneReady={onSceneReady} id="SceneCanvas" />
  );
}

export default Scene;
