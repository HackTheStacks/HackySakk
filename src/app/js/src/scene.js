import babylon from 'babylonjs';
class Scene{
        // createScene function that creates and return the scene
    static createScene(engine, canvas){
        const scene = new babylon.Scene(engine);

        // create a FreeCamera, and set its position to (x:0, y:5, z:-10)
        // var camera = new babylon.FreeCamera('camera1', new babylon.Vector3(0, 5,-10), scene);

        const camera = new babylon.ArcRotateCamera("Camera", 3 * Math.PI / 2, Math.PI / 8, 50, babylon.Vector3.Zero(), scene);
        // target the camera to scene origin
        camera.setTarget(babylon.Vector3.Zero());

        // attach the camera to the canvas
        camera.attachControl(canvas, true);

        // create a basic light, aiming 0,1,0 - meaning, to the sky
        const light = new babylon.HemisphericLight('light1', new babylon.Vector3(3,1,0), scene);
        const light2 = new babylon.HemisphericLight('light2', new babylon.Vector3(0,1,3), scene);
        const light3 = new babylon.HemisphericLight('light3', new babylon.Vector3(3,1,-10), scene);
        light.intensity = 0.7;
        light3.intensity = 0.5;

        //create box
        const box = babylon.Mesh.CreateBox("box", 4.0, scene, false, babylon.Mesh.DEFAULTSIDE);
        box.position = new babylon.Vector3(-4,2,-4);

        const drumBox = new babylon.StandardMaterial('South American drum', scene);
        const drumTexture = new babylon.Texture("images/southAmericanDrum.png",scene);
        drumBox.diffuseTexture = drumTexture;
        box.material = drumBox;

        const knot = babylon.Mesh.CreateTorusKnot("knot", 2, 0.5, 128, 64, 2, 3, scene);
        knot.position = new babylon.Vector3(-10,3,5);


        var tiledGround = new babylon.Mesh.CreateGround("Tiled Ground", 40, 20, 1, scene);


        // Part 2 : Create texture material for ground
        console.log(__dirname);
        const groundMaterial = new babylon.StandardMaterial('marble floor', scene);
        const marbleTexture = new babylon.Texture("images/marble_texture.jpg",scene);
        groundMaterial.diffuseTexture = marbleTexture;
        tiledGround.material = groundMaterial;
        tiledGround.backFaceCulling = false;

        //create walls
        const backWall = this.createWall('backWall', 40, 20, scene);
        backWall.position = new babylon.Vector3(0,10,10);

        const rightWall = this.createWall("rightWall", 20,20,scene);
        rightWall.position = new babylon.Vector3(20,10,0);
        rightWall.rotation.y = Math.PI/2;

        const leftWall = this.createWall("leftWall", 20,20,scene);
        leftWall.position = new babylon.Vector3(-20,10,0);
        leftWall.rotation.y = Math.PI/2;

        const museumWallpaper = new babylon.StandardMaterial("museumWallpaper", scene);
        museumWallpaper.diffuseTexture = new babylon.Texture("images/museum-wall.jpg", scene);
        museumWallpaper.diffuseTexture.uOffset = 1.5;
        museumWallpaper.diffuseTexture.vOffset = 5.0;
        museumWallpaper.backFaceCulling = false;

        rightWall.material = museumWallpaper;
        leftWall.material = museumWallpaper;
        backWall.material = museumWallpaper;

        //try to create click action
        // const painting = babylon.Mesh.CreatePlane("painting", 5.0, 4.0, scene, false, babylon.Mesh.DOUBLESIDE);
        const painting = this.createWall("painting", 5.25, 4.0, scene);
        painting.position = new babylon.Vector3(6.3,10.5,9);

        const drumPainting = new babylon.StandardMaterial('South American drum', scene);
        const drumFlatTexture = new babylon.Texture("images/southAmericanDrum.jpg",scene);
        drumPainting.diffuseTexture = drumFlatTexture;
        painting.material = drumPainting;
        
        this.prepareClick(painting, scene);

        // return the created scene
        return scene;
    }
    static createWall(title, width, height, scene){
        return babylon.MeshBuilder.CreatePlane(title, { width: width, height: height, sideOrientation: babylon.Mesh.DOUBLESIDE }, scene);
    }

    static prepareClick(mesh,scene){
        mesh.actionManager = new babylon.ActionManager(scene);
        mesh.actionManager.registerAction(new babylon.ExecuteCodeAction({ trigger: babylon.ActionManager.OnPickTrigger, parameter: mesh},
        function () {
            alert('successfully clicked drum');
        }));
    }
}
module.exports= Scene;
