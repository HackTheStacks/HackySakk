import babylon from 'babylonjs';
import Scene from './scene.js';


window.addEventListener('DOMContentLoaded', function(){
    // get the canvas DOM element
    var canvas = document.getElementById('renderCanvas');

    // load the 3D engine
    var engine = new babylon.Engine(canvas, true);

    // call the createScene function
    var scene = Scene.createScene(engine, canvas);

    // run the render loop
    engine.runRenderLoop(function(){
        scene.render();
    });

    // the canvas/window resize event handler
    window.addEventListener('resize', function(){
        engine.resize();
    });
});
