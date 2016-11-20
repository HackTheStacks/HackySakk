import BABYLON from 'babylonjs';

 window.addEventListener('DOMContentLoaded', function(){
            // get the canvas DOM element
            var canvas = document.getElementById('renderCanvas');

            // load the 3D engine
            var engine = new BABYLON.Engine(canvas, true);

            // createScene function that creates and return the scene
            var createScene = function(){
                // create a basic BJS Scene object
                var scene = new BABYLON.Scene(engine);

                // create a FreeCamera, and set its position to (x:0, y:5, z:-10)
                var camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, 5,-10), scene);

                // target the camera to scene origin
                camera.setTarget(BABYLON.Vector3.Zero());

                // attach the camera to the canvas
                camera.attachControl(canvas, false);

                // create a basic light, aiming 0,1,0 - meaning, to the sky
                var light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0,1,0), scene);

                var box = BABYLON.Mesh.CreateBox("box", 2.0, scene, false, BABYLON.Mesh.DEFAULTSIDE);


                // Tiled Ground Tutorial

                // Part 1 : Creation of Tiled Ground
                // Parameters
                var xmin = -3;
                var zmin = -3;
                var xmax =  3;
                var zmax =  3;
                var precision = {
                    "w" : 2,
                    "h" : 2
                };
                var subdivisions = {
                    'h' : 8,
                    'w' : 8
                };
                // Create the Tiled Ground
                var tiledGround = new BABYLON.Mesh.CreateTiledGround("Tiled Ground", xmin, zmin, xmax, zmax, subdivisions, precision, scene);


                // Part 2 : Create the multi material
                // Create differents materials
                var whiteMaterial = new BABYLON.StandardMaterial("White", scene);
                whiteMaterial.diffuseColor = new BABYLON.Color3(1, 1, 1);

                var blackMaterial = new BABYLON.StandardMaterial("Black", scene);
                blackMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);

                // Create Multi Material
                var multimat = new BABYLON.MultiMaterial("multi", scene);
                multimat.subMaterials.push(whiteMaterial);
                multimat.subMaterials.push(blackMaterial);


                // Part 3 : Apply the multi material
                // Define multimat as material of the tiled ground
                tiledGround.material = multimat;

                // Needed variables to set subMeshes
                var verticesCount = tiledGround.getTotalVertices();
                var tileIndicesLength = tiledGround.getIndices().length / (subdivisions.w * subdivisions.h);

                // Set subMeshes of the tiled ground
                tiledGround.subMeshes = [];
                var base = 0;
                for (var row = 0; row < subdivisions.h; row++) {
                    for (var col = 0; col < subdivisions.w; col++) {
                        tiledGround.subMeshes.push(new BABYLON.SubMesh(row%2 ^ col%2, 0, verticesCount, base , tileIndicesLength, tiledGround));
                        base += tileIndicesLength;
                    }
                }

                // return the created scene
                return scene;
            }

            // call the createScene function
            var scene = createScene();

            // run the render loop
            engine.runRenderLoop(function(){
                scene.render();
            });

            // the canvas/window resize event handler
            window.addEventListener('resize', function(){
                engine.resize();
            });
	});
