import babylon from 'babylonjs';


export default class artifact {

    constructor(scene) {

        mesh.actionManager = new babylon.ActionManager(scene);

        mesh.actionManager.registerAction(new babylon.InterpolateValueAction(babylon.ActionManager.OnPickTrigger, light, "diffuse", babylon.Color3.Black(), 1000));



    }


}