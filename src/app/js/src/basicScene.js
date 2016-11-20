import babylon from 'babylonjs';

class BasicScene{

	static createBasicScene(canvas, engine){
        const scene = new babylon.Scene(engine);
		console.log('createRoom from basic scene');
        const camera = new babylon.ArcRotateCamera("Camera", 3 * Math.PI / 2, Math.PI / 8, 50, babylon.Vector3.Zero(), scene);
        camera.setTarget(babylon.Vector3.Zero());
        camera.attachControl(canvas, true);

        const light = new babylon.HemisphericLight('light1', new babylon.Vector3(3,1,0), scene);
        const light2 = new babylon.HemisphericLight('light2', new babylon.Vector3(0,1,3), scene);
        const light3 = new babylon.HemisphericLight('light3', new babylon.Vector3(3,1,-10), scene);
        light.intensity = 0.7;
        light3.intensity = 0.5;

        var tiledGround = new babylon.Mesh.CreateGround("Tiled Ground", 40, 20, 1, scene);
        this.addTexture(tiledGround, scene, "textures/marble_texture2.jpg",0,0);

        const walls = this.createRoom(scene);
        
        for(let index = 0; index < walls.length; index++){
            this.addTexture(walls[index], scene,'textures/museum-wall-no-bottom.jpg', 1.5, 5.0);
        }


        return scene;
	}

	static addTexture(mesh, scene, imagePath, offsetU, offsetV){
		const material =new babylon.StandardMaterial(imagePath, scene);
        const texture = new babylon.Texture(imagePath,scene);
        material.diffuseTexture = texture;
        material.diffuseTexture.uOffset = offsetU;
        material.diffuseTexture.vOffset = offsetV;
        mesh.material = material;
        mesh.backFaceCulling = false;
	}

	static positionWall(mesh,x,z,y){
		mesh.position = new babylon.Vector3(x,z,y);
	}
	static rotateToSideWall(mesh){
		mesh.rotation.y = Math.PI/2;
	}
	static createWall(title, width, height, scene){
        return babylon.MeshBuilder.CreatePlane(title, { width: width, height: height, sideOrientation: babylon.Mesh.DOUBLESIDE }, scene);
    }
    static createRoom(scene){
    	
    	const backWall = this.createWall('backWall', 40, 20, scene);
        this.positionWall(backWall,0,10,10);

        const rightWall = this.createWall("rightWall", 20,20,scene);
        this.positionWall(rightWall,20,10,0);
        this.rotateToSideWall(rightWall);

        const leftWall = this.createWall("leftWall", 20,20,scene);
        this.positionWall(leftWall,-20,10,0);
        this.rotateToSideWall(leftWall);

        return [backWall, leftWall, rightWall];
    }
}
module.exports = BasicScene;