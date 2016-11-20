import artifact from './artifact.js'
import babylon from 'babylonjs';
class Scene{
    static createScene(engine, canvas){
        const scene = new babylon.Scene(engine);


        const camera = new babylon.ArcRotateCamera("Camera", 3 * Math.PI / 2, Math.PI / 8, 50, babylon.Vector3.Zero(), scene);
        camera.setTarget(babylon.Vector3.Zero());

        camera.attachControl(canvas, true);

        const light = new babylon.HemisphericLight('light1', new babylon.Vector3(3,1,0), scene);
        const light2 = new babylon.HemisphericLight('light2', new babylon.Vector3(0,1,3), scene);
        const light3 = new babylon.HemisphericLight('light3', new babylon.Vector3(3,1,-10), scene);
        light.intensity = 0.7;
        light3.intensity = 0.5;

        const box = babylon.Mesh.CreateBox("box", 4.0, scene, false, babylon.Mesh.DEFAULTSIDE);
        box.position = new babylon.Vector3(8,2,-4);

        const drumBox = new babylon.StandardMaterial('South American drum', scene);
        const drumTexture = new babylon.Texture("images/southAmericanDrum.png",scene);
        drumBox.diffuseTexture = drumTexture;
        box.material = drumBox;

        const knot = babylon.Mesh.CreateTorusKnot("knot", 2, 0.5, 128, 64, 2, 3, scene);
        knot.position = new babylon.Vector3(-10,3,5);



        var tiledGround = new babylon.Mesh.CreateGround("Tiled Ground", 40, 20, 1, scene);


        const groundMaterial = new babylon.StandardMaterial('marble floor', scene);
        const marbleTexture = new babylon.Texture("images/marble_texture.jpg",scene);
        groundMaterial.diffuseTexture = marbleTexture;
        tiledGround.material = groundMaterial;
        tiledGround.backFaceCulling = false;

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

        const leftPaintingOnBackWall = this.createWall("painting", 5.25, 4.0, scene);
        const leftPaintingOnRightWall = this.createWall("painting", 3.5, 4.0, scene);

        leftPaintingOnBackWall.position = new babylon.Vector3(-7,10.5,9);

        // x, y, z
        leftPaintingOnRightWall.position = new babylon.Vector3(19,10.8,3.5);
        leftPaintingOnRightWall.rotation.y = Math.PI/2;


        const drumPainting = new babylon.StandardMaterial('South American drum', scene);
        const drumFlatTexture = new babylon.Texture("images/southAmericanDrum.jpg",scene);
        drumPainting.diffuseTexture = drumFlatTexture;
        rightPaintingOnBackWall.material = drumPainting;

        
        const hoverableArtifact = artifact.addNew("hoverable", 7, 5, -19.5, 12, 'hover', scene);
        hoverableArtifact.rotation.y = Math.PI/2;
        
        
        return scene;
    }
    static createWall(title, width, height, scene){
        return babylon.MeshBuilder.CreatePlane(title, { width: width, height: height, sideOrientation: babylon.Mesh.DOUBLESIDE }, scene);
    }
}
module.exports = Scene;
