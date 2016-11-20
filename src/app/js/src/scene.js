import artifact from './artifact.js';
import basicScene from './basicScene.js';
import babylon from 'babylonjs';

class Scene{
    static createScene(engine, canvas){
        const scene = basicScene.createBasicScene(canvas, engine);

        const box = babylon.Mesh.CreateBox("box", 4.0, scene, false, babylon.Mesh.DEFAULTSIDE);
        box.position = new babylon.Vector3(8,2,-4);

        const knot = babylon.Mesh.CreateTorusKnot("knot", 2, 0.5, 128, 64, 2, 3, scene);
        knot.position = new babylon.Vector3(-10,3,5);

    
        const leftPaintingOnBackWall = basicScene.createWall("painting", 5.5, 4.5, scene);
        const leftPaintingOnRightWall = basicScene.createWall("painting", 3.25, 5.0, scene);

        leftPaintingOnBackWall.position = new babylon.Vector3(-6.8,8.25,9);
        // x, y, z
        leftPaintingOnRightWall.position = new babylon.Vector3(19,8.5,3.5);
        leftPaintingOnRightWall.rotation.y = Math.PI/2;

        const rightPaintingOnBackWall = artifact.addNew("basket artifact painting", 4.5, 5.5, 6.3, 8.25, 9.5, 'click', scene);

        const drumPainting = new babylon.StandardMaterial('South American drum', scene);
        const drumFlatTexture = new babylon.Texture("images/southAmericanDrum.jpg",scene);
        drumPainting.diffuseTexture = drumFlatTexture;
        rightPaintingOnBackWall.material = drumPainting;

        const displayCasePainting = new babylon.StandardMaterial('South American display case', scene);
        const displayCaseTexture = new babylon.Texture("images/display_case.jpg",scene);
        displayCasePainting.diffuseTexture = displayCaseTexture;
        leftPaintingOnRightWall.material = displayCasePainting;

        const stonePainting = new babylon.StandardMaterial('South American stone sculpture', scene);
        const stoneTexture = new babylon.Texture("images/stone_sculpture.jpg",scene);
        stonePainting.diffuseTexture = stoneTexture;
        leftPaintingOnBackWall.material = stonePainting;

        const hoverableArtifact = artifact.addNew("hoverable", 5.0, 3.25, -19.5, 8.3, 3.5, 'hover', scene);
        hoverableArtifact.rotation.y = Math.PI/2;
        const basketPainting = new babylon.StandardMaterial('South American basket', scene);
        const basketFlatTexture = new babylon.Texture("images/basket.jpg",scene);
        basketPainting.diffuseTexture = basketFlatTexture;
        hoverableArtifact.material = basketPainting;

        return scene;
    }
}
module.exports = Scene;
