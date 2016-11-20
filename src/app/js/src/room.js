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
        var light = new babylon.HemisphericLight('light1', new babylon.Vector3(3,1,0), scene);
        var light3 = new babylon.HemisphericLight('light3', new babylon.Vector3(0,1,3), scene);
        light.intensity = 0.7;

        //create box
        var box = babylon.Mesh.CreateBox("box", 4.0, scene, false, babylon.Mesh.DEFAULTSIDE);
        box.position = new babylon.Vector3(0,2,0);

        var knot = babylon.Mesh.CreateTorusKnot("knot", 2, 0.5, 128, 64, 2, 3, scene);
        knot.position = new babylon.Vector3(5,3,5);

        // Part 1 : Creation of Tiled Ground
        // Parameters
        var xmin = -10;
        var zmin = -10;
        var xmax =  10;
        var zmax =  10;
        var precision = {
            "w" : 2,
            "h" : 2
        };
        var subdivisions = {
            'h' : 8,
            'w' : 8
        };

        var tiledGround = new babylon.Mesh.CreateGround("Tiled Ground", 20, 20, 1, scene);


        // Part 2 : Create texture material for ground
        console.log(__dirname);
        var groundMaterial = new babylon.StandardMaterial('marble floor', scene);
        var marbleTexture = new babylon.Texture("images/marble_texture.jpg",scene);
        groundMaterial.diffuseTexture = marbleTexture;
        // groundMaterial.diffuseTexture.uScale = 5.0;
        // groundMaterial.diffuseTexture.vScale = 5.0;
        tiledGround.material = groundMaterial;
        tiledGround.backFaceCulling = false;

        //create walls
         var backWall = babylon.Mesh.CreatePlane("backWall", 20, scene, false, babylon.Mesh.DOUBLESIDE);
        backWall.position = new babylon.Vector3(0,10,10);

        var rightWall = babylon.Mesh.CreatePlane("rightWall", 20, scene, false, babylon.Mesh.DOUBLESIDE);
        rightWall.position = new babylon.Vector3(10,10,0);
        rightWall.rotation.y = Math.PI/2;

        var leftWall = babylon.Mesh.CreatePlane("leftWall", 20, scene, false, babylon.Mesh.DOUBLESIDE);
        leftWall.position = new babylon.Vector3(-10,10,0);
        leftWall.rotation.y = Math.PI/2;
        //create wall material
        var blueMaterial = new babylon.StandardMaterial("blueWalls", scene);
        blueMaterial.diffuseColor = new babylon.Color3(0, 0.58, 0.86);

        var textureWall = new babylon.StandardMaterial("texture1", scene);
        textureWall.diffuseTexture = new babylon.Texture("images/museum-wall.jpg", scene);
        textureWall.diffuseTexture.uOffset = 1.5;
        textureWall.diffuseTexture.vOffset = 5.0;
        textureWall.backFaceCulling = false;
        // plane.material = material;

        rightWall.material = textureWall;
        leftWall.material = textureWall;
        backWall.material = textureWall;

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
