import babylon from 'babylonjs';

class artifact {

    static addNew(title, height, width, xPosition, yPosition, scene) {

        const clickableArtifact = babylon.MeshBuilder.CreatePlane(title, { width: width, height: height, sideOrientation: babylon.Mesh.DOUBLESIDE }, scene);

        clickableArtifact.position = new babylon.Vector3(xPosition,yPosition,9.5);
        
        this.prepareClick(clickableArtifact, scene);

        return clickableArtifact;

    }


    static prepareClick(artifact, scene){
        artifact.actionManager = new babylon.ActionManager(scene);
        artifact.actionManager.registerAction(new babylon.ExecuteCodeAction({ trigger: babylon.ActionManager.OnPointerOverTrigger, parameter: artifact},
            function () {
                alert('you hovered! we are so proud of you');
            }));
    }


}

module.exports = artifact;