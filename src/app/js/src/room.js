import babylon from 'babylonjs';

window.addEventListener('DOMContentLoaded', function(){
    // get the canvas DOM element
    var canvas = document.getElementById('renderCanvas');

    // load the 3D engine
    var engine = new babylon.Engine(canvas, true);

    // createScene function that creates and return the scene
    var createScene = function(){
        // create a basic BJS Scene object
        var scene = new babylon.Scene(engine);

        // create a FreeCamera, and set its position to (x:0, y:5, z:-10)
        // var camera = new babylon.FreeCamera('camera1', new babylon.Vector3(0, 5,-10), scene);

	      var camera = new babylon.ArcRotateCamera("Camera", 3 * Math.PI / 2, Math.PI / 8, 50, babylon.Vector3.Zero(), scene);
        // target the camera to scene origin
        camera.setTarget(babylon.Vector3.Zero());

        // attach the camera to the canvas
        camera.attachControl(canvas, true);

        // create a basic light, aiming 0,1,0 - meaning, to the sky
        var light = new babylon.HemisphericLight('light1', new babylon.Vector3(0,1,0), scene);

        var box = babylon.Mesh.CreateBox("box", 2.0, scene, false, babylon.Mesh.DEFAULTSIDE);
        box.position = new babylon.Vector3(0,1,0);
        var backWall = babylon.Mesh.CreatePlane("backWall", 6, scene, false, babylon.Mesh.DEFAULTSIDE);
        backWall.position = new babylon.Vector3(0,3,3);

        var rightWall = babylon.Mesh.CreatePlane("rightWall", 6, scene, false, babylon.Mesh.DEFAULTSIDE);
        rightWall.position = new babylon.Vector3(3,3,0);
        rightWall.rotation.y = Math.PI/2;

        var leftWall = babylon.Mesh.CreatePlane("leftWall", 6, scene, false, babylon.Mesh.DEFAULTSIDE);
        leftWall.position = new babylon.Vector3(-3,3,0);
        leftWall.rotation.y = Math.PI/2;

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
        var tiledGround = new babylon.Mesh.CreateTiledGround("Tiled Ground", xmin, zmin, xmax, zmax, subdivisions, precision, scene);


        // Part 2 : Create the multi material
        // Create differents materials
        var whiteMaterial = new babylon.StandardMaterial("White", scene);
        whiteMaterial.diffuseColor = new babylon.Color3(1, 1, 1);

        var blackMaterial = new babylon.StandardMaterial("Black", scene);
        blackMaterial.diffuseColor = new babylon.Color3(0, 0, 0);

        // Create Multi Material
        var multimat = new babylon.MultiMaterial("multi", scene);
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
                tiledGround.subMeshes.push(new babylon.SubMesh(row%2 ^ col%2, 0, verticesCount, base , tileIndicesLength, tiledGround));
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
