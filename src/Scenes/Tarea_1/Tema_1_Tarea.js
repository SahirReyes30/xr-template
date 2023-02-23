
import React from "react";
import * as BABYLON from "babylonjs";
import * as MATERIALS from "babylonjs-materials";
import SceneComponent from "C:/Users/Sahir Reyes/Desktop/MCC/Semestre 2/Temas selectos/Tarea/xr-template/src/Babylon_components/SceneComponent.jsx";
import * as earcut from "earcut";
import * as materiales from "C:/Users/Sahir Reyes/Desktop/MCC/Semestre 2/Temas selectos/Tarea/xr-template/src/Modules/Materiales_texturas/Materials.js";
import wood from "C:/Users/Sahir Reyes/Desktop/MCC/Semestre 2/Temas selectos/Tarea/xr-template/src/Modules/Materiales_texturas/wood.jpg";
import * as Lights_Custom from "C:/Users/Sahir Reyes/Desktop/MCC/Semestre 2/Temas selectos/Tarea/xr-template/src/Modules/Iluminacion/Lights_Custom"

// import SceneComponent from 'babylonjs-hook'; // if you install 'babylonjs-hook' NPM.


const onSceneReady = (e) => {

  const { canvas, scene, engine } = e;
  // This creates and positions a free camera (non-mesh)
  const camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 10, -25), scene);

  // This targets the camera to scene origin
  camera.setTarget(BABYLON.Vector3.Zero());
 
  // This attaches the camera to the canvas
  camera.attachControl(canvas, false);

  // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
  //const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
  Lights_Custom.PointLight(scene);
  // Default intensity is 1. Let's dim the light a small amount
  // light.intensity = 0.7;
  //light.diffuse = new BABYLON.Color3(1,1,1);
  

  //Display 3D axes
  const axes3D = new BABYLON.AxesViewer(scene, 2)

  

  var bottleShape = [
    
    new BABYLON.Vector3(1, 1 , 0),
    new BABYLON.Vector3(4, 1 , 0),
    new BABYLON.Vector3(4, 7 , 0),
    new BABYLON.Vector3(3, 8 , 0),
    new BABYLON.Vector3(3, 10, 0),
    new BABYLON.Vector3(4, 10, 0),
    new BABYLON.Vector3(4, 11, 0),
    new BABYLON.Vector3(1, 11, 0),
    new BABYLON.Vector3(1, 10, 0),
    new BABYLON.Vector3(2, 10, 0),
    new BABYLON.Vector3(2, 8 , 0),
    new BABYLON.Vector3(1, 7 , 0)
    
  ];

  bottleShape.push(bottleShape[0]);


  var bottleExtrusion = [
    new BABYLON.Vector3(0, 0, 0),
    new BABYLON.Vector3(0, 0, 1),

  ];

 
  //Create extrusion with updatable parameter set to true for later changes
  var extrusion2 = BABYLON.MeshBuilder.ExtrudeShape("bottle", { shape: bottleShape, path: bottleExtrusion, sideOrientation: BABYLON.Mesh.DOUBLESIDE, updatable: true }, scene);
  extrusion2.position.set(-10, 0, 0);
  extrusion2 = BABYLON.MeshBuilder.ExtrudeShape("bottle", { shape: bottleShape, path: bottleExtrusion, rotation: 0.0, sideOrientation: BABYLON.Mesh.DOUBLESIDE, instance: extrusion2 });


//Polygon shape in XoZ plane

const bottlePoligon = [
    new BABYLON.Vector3(1,0,- 1 ),
    new BABYLON.Vector3(4,0,- 1 ),
    new BABYLON.Vector3(4,0,- 7 ),
    new BABYLON.Vector3(3,0,- 8 ),
    new BABYLON.Vector3(3,0,- 10),
    new BABYLON.Vector3(4,0,- 10),
    new BABYLON.Vector3(4,0,- 11),
    new BABYLON.Vector3(1,0,- 11),
    new BABYLON.Vector3(1,0,- 10),
    new BABYLON.Vector3(2,0,- 10),
    new BABYLON.Vector3(2,0,- 8 ),
    new BABYLON.Vector3(1,0,- 7 )
];

      
//Holes in XoZ plane

  const holesBottle = [];
  holesBottle[0] = [
    new BABYLON.Vector3(1.5, 0, -1.5),
    new BABYLON.Vector3(3.5, 0, -1.5),
    new BABYLON.Vector3(3.5, 0, -7),
    new BABYLON.Vector3(2.5, 0, -8),
    new BABYLON.Vector3(1.5, 0, -7)
    
  ];
  
  const bottlePolygon = BABYLON.MeshBuilder.CreatePolygon("bottlePolygon", {shape:bottlePoligon, /*holes:holes,*/ sideOrientation: BABYLON.Mesh.DOUBLESIDE },scene,earcut);
  bottlePolygon.position.set(-10, 0, 0);
  bottlePolygon.rotation.x = Degrees_to_radians(90)

  

  var extrudepolygonBottle = BABYLON.MeshBuilder.ExtrudePolygon("polygon", {shape:bottlePoligon, holes:holesBottle, depth: 2, sideOrientation: BABYLON.Mesh.DOUBLESIDE }, scene,earcut);
  extrudepolygonBottle.position.set(3, 0, 0);
  extrudepolygonBottle.rotation.x = Degrees_to_radians(90)



  // Our built-in 'ground' shape.
  var ground = BABYLON.MeshBuilder.CreateGround("ground", { width: 30, height: 30, subdivisions: 30 }, scene);



/*
  var ground_base_color = new BABYLON.StandardMaterial("ground_base_color", scene)
  ground_base_color.diffuseColor =  new BABYLON.Color3(1,1,1);
  ground.material = ground_base_color;
*/
  var ground_material = materiales.MaterialFromTexture("ground_material", {diffuseTexture: wood}, scene)
  ground.material = ground_material;

  ground_material.diffuseTexture.uScale = 1;
  ground_material.diffuseTexture.vScale = 1;
  ground_material.diffuseTexture.uOffset = 0;
  ground_material.diffuseTexture.vOffset = 0;
  ground_material.diffuseTexture.wrapU = BABYLON.Texture.WRAP_ADDRESSMODE;
  ground_material.diffuseTexture.wrapV = BABYLON.Texture.WRAP_ADDRESSMODE;
  ground_material.diffuseTexture.hasAlpha = true;
  ground_material.diffuseTexture.getAlphaFromRGB = true;
  
//////////////ilumination/////

  //Lights_Custom.PointLight(scene);

    /**
   * funcion para convertir grados a radianes
   * @param {*} degrees 
   * @returns un mumero en radianes
   */
    function Degrees_to_radians(degrees) {

      var result_radians = degrees * (Math.PI / 180)
  
      return result_radians
    }
    bottlePolygon.position.x = -5;
    bottlePolygon.position.y = 0;
    bottlePolygon.position.z = 0;

  const axesBottle = new BABYLON.AxesViewer(scene, 1)
  axesBottle.xAxis.parent = bottlePolygon;
  axesBottle.yAxis.parent = bottlePolygon;
  axesBottle.zAxis.parent = bottlePolygon;

   scene.onBeforeRenderObservable.add(() => {
      if (bottlePoligon !== undefined) {
        const deltaTimeInMillis = scene.getEngine().getDeltaTime();
  
        const rpm = 5
        bottlePolygon.rotation.y += (rpm / 60) * Math.PI * 2 * (deltaTimeInMillis / 1000);
           
      }
    });


  engine.runRenderLoop(() => {
    if (scene) {
        //window.document.title = engine.getFps().toFixed() + " fps";
        scene.render();

    }
});

};


function Tema() {
  return (
    <React.Fragment>

    <SceneComponent antialias onSceneReady={onSceneReady} id="SceneCanvas" />

    </React.Fragment>
  );
}

export default Tema;
