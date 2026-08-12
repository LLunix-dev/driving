import { mat4} from 'gl-matrix';
import vertexShaderSource from "./shader.vs?raw";
import  fragmentShaderSource from './shader.fs?raw';

import groundVertexSource from './groundShader.vs?raw';
import groundFragmentSource from './groundShader.fs?raw';
import parkingLotTexture from "./assets/parking_lot.png";
import { positions } from './car';

console.log(vertexShaderSource);
let canvas = document.getElementById('my_Canvas');
const gl = canvas.getContext('webgl2');
let model = mat4.create();
let view = mat4.create();
let projection = mat4.create();

let accelDiv = document.getElementById("accel");


if(!gl) {
    console.error('WebGL not supported');
}


  function createShader(gl, type, source) {
      let shader = gl.createShader(type);
      gl.shaderSource(shader, source);   
      gl.compileShader(shader);
      let success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
      if(success) {
        return shader;
    }
    console.log(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
}
/*
let vertexShader = createShader(gl,gl.VERTEX_SHADER, vertexShaderSource);
let fragmentShader = createShader(gl,gl.FRAGMENT_SHADER, fragmentShaderSource);
*/
function createProgram(gl, vertexShader, fragmentShader) {
    let program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    var success = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (success) {
        return program;
    }
    
    console.log(gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
}
gl.enable(gl.DEPTH_TEST);
gl.depthFunc(gl.LESS);
/*
let program = createProgram(gl, vertexShader, fragmentShader);
*/
let map = [
        -0.5, -0.5, -0.5,  0.0,  0.0, -1.0,  0.0,  0.0,
         0.5, -0.5, -0.5,  0.0,  0.0, -1.0,  1.0,  0.0,
         0.5,  0.5, -0.5,  0.0,  0.0, -1.0,  1.0,  1.0,
         0.5,  0.5, -0.5,  0.0,  0.0, -1.0,  1.0,  1.0,
        -0.5,  0.5, -0.5,  0.0,  0.0, -1.0,  0.0,  1.0,
        -0.5, -0.5, -0.5,  0.0,  0.0, -1.0,  0.0,  0.0,
        -0.5, -0.5,  0.5,  0.0,  0.0,  1.0,  0.0,  0.0,
         0.5, -0.5,  0.5,  0.0,  0.0,  1.0,  1.0,  0.0,
         0.5,  0.5,  0.5,  0.0,  0.0,  1.0,  1.0,  1.0,
         0.5,  0.5,  0.5,  0.0,  0.0,  1.0,  1.0,  1.0,
        -0.5,  0.5,  0.5,  0.0,  0.0,  1.0,  0.0,  1.0,
        -0.5, -0.5,  0.5,  0.0,  0.0,  1.0,  0.0,  0.0,
        -0.5,  0.5,  0.5, -1.0,  0.0,  0.0,  1.0,  0.0,
        -0.5,  0.5, -0.5, -1.0,  0.0,  0.0,  1.0,  1.0,
        -0.5, -0.5, -0.5, -1.0,  0.0,  0.0,  0.0,  1.0,
        -0.5, -0.5, -0.5, -1.0,  0.0,  0.0,  0.0,  1.0,
        -0.5, -0.5,  0.5, -1.0,  0.0,  0.0,  0.0,  0.0,
        -0.5,  0.5,  0.5, -1.0,  0.0,  0.0,  1.0,  0.0,
         0.5,  0.5,  0.5,  1.0,  0.0,  0.0,  1.0,  0.0,
         0.5,  0.5, -0.5,  1.0,  0.0,  0.0,  1.0,  1.0,
         0.5, -0.5, -0.5,  1.0,  0.0,  0.0,  0.0,  1.0,
         0.5, -0.5, -0.5,  1.0,  0.0,  0.0,  0.0,  1.0,
         0.5, -0.5,  0.5,  1.0,  0.0,  0.0,  0.0,  0.0,
         0.5,  0.5,  0.5,  1.0,  0.0,  0.0,  1.0,  0.0,
        -0.5, -0.5, -0.5,  0.0, -1.0,  0.0,  0.0,  1.0,
         0.5, -0.5, -0.5,  0.0, -1.0,  0.0,  1.0,  1.0,
         0.5, -0.5,  0.5,  0.0, -1.0,  0.0,  1.0,  0.0,
         0.5, -0.5,  0.5,  0.0, -1.0,  0.0,  1.0,  0.0,
        -0.5, -0.5,  0.5,  0.0, -1.0,  0.0,  0.0,  0.0,
        -0.5, -0.5, -0.5,  0.0, -1.0,  0.0,  0.0,  1.0,
        -0.5,  0.5, -0.5,  0.0,  1.0,  0.0,  0.0,  1.0,
         0.5,  0.5, -0.5,  0.0,  1.0,  0.0,  1.0,  1.0,
         0.5,  0.5,  0.5,  0.0,  1.0,  0.0,  1.0,  0.0,
         0.5,  0.5,  0.5,  0.0,  1.0,  0.0,  1.0,  0.0,
        -0.5,  0.5,  0.5,  0.0,  1.0,  0.0,  0.0,  0.0,
        -0.5,  0.5, -0.5,  0.0,  1.0,  0.0,  0.0,  1.0
];






//webglUtils.resizeCanvasToDisplaySize(gl.canvas);

class Mesh {
    constructor(gl, vertices, vertColorBool, vertexShaderSource, fragmentShaderSource, textureSrc) {
        this.isTexture = false;
        if(textureSrc != 0) this.isTexture = true;
        if(vertColorBool) {
            this.vertexCount = vertices.length / 9;
        } else if(this.isTexture){
            this.vertexCount = vertices.length / 8;

            this.texture = gl.createTexture();
            gl.bindTexture(gl.TEXTURE_2D, this.texture);

            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE,
              new Uint8Array([0, 0, 255, 255]));
              
            this.image = new Image();
            this.image.src = textureSrc;

            this.image.addEventListener("load", ()=> {
                gl.bindTexture(gl.TEXTURE_2D, this.texture);
                gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA,gl.UNSIGNED_BYTE, this.image);
                gl.generateMipmap(gl.TEXTURE_2D);
            });
            
        }else{
            this.vertexCount = vertices.length / 6;
        }

        this.vertColorBool = vertColorBool;
        this.vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
        this.fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

        this.program = createProgram(gl, this.vertexShader, this.fragmentShader)

        this.modelLocation = gl.getUniformLocation(this.program, "u_model");
        this.viewLocation = gl.getUniformLocation(this.program, "u_view");
        this.projectionLocation = gl.getUniformLocation(this.program, "u_projection");
        this.textureLocation = gl.getUniformLocation(this.program, "u_texture");
        this.vao = gl.createVertexArray();
        this.positionAttributeLocation = gl.getAttribLocation(this.program, "a_position");
        this.normalAttributeLocation = gl.getAttribLocation(this.program, "a_normal");
        if(vertColorBool) {
            this.colorAttributeLocation = gl.getAttribLocation(this.program, "a_color");
        }else if(this.isTexture) {
            this.texcoordAttributeLocation = gl.getAttribLocation(this.program, "a_texcoord");
            this.texcoordBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, this.texcoordBuffer);
        }
        this.verticiesBuffer = gl.createBuffer();

        gl.bindBuffer(gl.ARRAY_BUFFER, this.verticiesBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.DYNAMIC_DRAW);

        gl.bindVertexArray(this.vao);

        if(vertColorBool) {

            gl.enableVertexAttribArray(this.positionAttributeLocation);
            gl.vertexAttribPointer(this.positionAttributeLocation, 3, gl.FLOAT, false, 9 * 4, 0);
    
            gl.enableVertexAttribArray(this.normalAttributeLocation);
            gl.vertexAttribPointer(this.normalAttributeLocation, 3, gl.FLOAT, false, 9 * 4, 3 * 4);

            gl.enableVertexAttribArray(this.colorAttributeLocation);
            gl.vertexAttribPointer(this.colorAttributeLocation, 3, gl.FLOAT, false, 9 * 4, 6 * 4);

        }else if(this.isTexture){
            gl.enableVertexAttribArray(this.positionAttributeLocation);
            gl.vertexAttribPointer(this.positionAttributeLocation, 3, gl.FLOAT, false, 8 * 4, 0);
    
            gl.enableVertexAttribArray(this.normalAttributeLocation);
            gl.vertexAttribPointer(this.normalAttributeLocation, 3, gl.FLOAT, false, 8 * 4, 3 * 4);
            
            gl.enableVertexAttribArray(this.texcoordAttributeLocation);
            gl.vertexAttribPointer(this.texcoordAttributeLocation, 2, gl.FLOAT, false, 8 * 4, 6 * 4);
        }else{
            gl.enableVertexAttribArray(this.positionAttributeLocation);
            gl.vertexAttribPointer(this.positionAttributeLocation, 3, gl.FLOAT, false, 6 * 4, 0);
    
            gl.enableVertexAttribArray(this.normalAttributeLocation);
            gl.vertexAttribPointer(this.normalAttributeLocation, 3, gl.FLOAT, false, 6 * 4, 3 * 4);

        }



    }
}
class Object3d {
    constructor(mesh) {
        this.mesh = mesh;

        this.position = [0,0,0];
        this.rotation = [0,0,0];
        this.scale = [1,1,1];
    }
}

let carMesh = new Mesh(gl,positions,true, vertexShaderSource, fragmentShaderSource, 0);
let carObject = new Object3d(carMesh);
carObject.position = [0,0.4,0.5];

let mapMesh = new Mesh(gl,map,false, groundVertexSource, groundFragmentSource, parkingLotTexture);
let mapObject = new Object3d(mapMesh);
mapObject.scale = [38.4 * 3,0.5, 21.6 * 3];
mapObject.position = [0,-1,0]

let objects = [
    carObject,
    mapObject
];

let car_angle = 0;
let speed = 0.1;

let isDragging = false;
let dx = 0;
let dy = 0;
let angle = 0;
let pitch= 0;
doMouseMovement();
let fps = 0;
let frameCount = 0;
let lastFpsUpdate = performance.now();
let vx = 0;
let vz = 0;
let avx =0;
let avz =0
let steering = 0;
let lastTime = 0;
let friction = 0.999;
let acceleration = 0;

let keys = {};

function draw(time){

        frameCount++;

    let dt = (time - lastTime) / 1000;
    lastTime = time;

    if (time - lastFpsUpdate >= 1000) {
        fps = frameCount;
        frameCount = 0;
        lastFpsUpdate = time;
    }
    //console.log(fps);
    
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    accelDiv.textContent = `acceleration: ${acceleration}`;
    
    //mat4.identity(model);
    //mat4.translate(model, model, [0,0,-3]);
    //
    //mat4.rotateX(model, model, time * 0.0001);
    //mat4.rotateY(model, model, time * 0.001);
    
    
    //let vectoryLenght = Math.sqrt(vx * vx + vz * vz);

    if(keys["d"]) steering = Math.min(steering + 0.01, 1);
    if(keys["a"]) steering = Math.max(steering - 0.01, -1);

    
    let forwardX = Math.cos(car_angle);
    let forwardZ = Math.sin(car_angle);
    
    let rightX = -Math.sin(car_angle);
    let rightZ = Math.cos(car_angle);
    
    
    
    
    
    let forwardSpeed = 
    vx * forwardX+
    vz * forwardZ;
    
    let lateralSpeed = 
    vx * rightX +
    vz * rightZ;
    
    forwardSpeed += acceleration * dt;

    let maxRadius = (forwardSpeed * forwardSpeed) / (4 * 9.81);

    let maxRadians = Math.atan(2.5 / maxRadius);

    car_angle += steering * dt;
    console.log(maxRadians);
    forwardSpeed *= Math.pow(0.999, dt * 60);
    if(Math.abs(steering) > maxRadians) {
        console.log("true");
        lateralSpeed *= Math.pow(0.99, dt * 60);
        
    }else{
        lateralSpeed *= Math.pow(0.50, dt * 60);
    }
    
    
    vx = forwardX * forwardSpeed + rightX * lateralSpeed;
    vz = forwardZ * forwardSpeed + rightZ * lateralSpeed


    carObject.position[0] += vx * dt;
    carObject.position[2] += vz * dt;

    //speed *= Math.pow(friction, dt * 60);

    let cameraAngle = angle + (-car_angle - Math.PI /2);


    carObject.rotation[1] = -car_angle - Math.PI /2 ;

    let cameraX =Math.sin(cameraAngle)* Math.cos(pitch)* 10 +carObject.position[0];
    let cameraY = Math.sin(pitch) * 10;
    let cameraZ = Math.cos(cameraAngle)* Math.cos(pitch) * 10 + carObject.position[2];


    mat4.lookAt(
        view,
        [cameraX, cameraY,cameraZ],
        carObject.position,
        [0,1,0]
    )


    
    mat4.perspective(
        projection,
        Math.PI / 4, canvas.width / canvas.height,
        0.1,100
    );
    
    
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    
    
    gl.clearColor(1.0, 1.0, 1.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT |gl.DEPTH_BUFFER_BIT);
    
    //gl.bindVertexArray(vao);
    
    
    
    
    
    for (let object of objects){
        gl.useProgram(object.mesh.program);
        mat4.identity(model);
        mat4.translate(model, model, object.position);
        mat4.rotateX(model, model, object.rotation[0]);
        mat4.rotateY(model, model, object.rotation[1]);
        mat4.rotateZ(model, model, object.rotation[2]);
        mat4.scale(model, model, object.scale);
        gl.uniformMatrix4fv(object.mesh.viewLocation, false, view);
        gl.uniformMatrix4fv(object.mesh.projectionLocation, false, projection);
        gl.uniformMatrix4fv(object.mesh.modelLocation, false, model);
        
        if(object.mesh.isTexture) {
            
            gl.activeTexture(gl.TEXTURE0)
            gl.bindTexture(gl.TEXTURE_2D, object.mesh.texture);

            gl.uniform1i(object.mesh.textureLocation, 0);
        }
        gl.bindVertexArray(object.mesh.vao);
        gl.drawArrays(gl.TRIANGLES,0, object.mesh.vertexCount);
    }
    
    
    //gl.drawArrays(gl.TRIANGLES, 0, 12264);
    requestAnimationFrame(draw);
}

function doMouseMovement() {
    let lastMouseX = 0;
    let lastMouseY = 0;
    window.addEventListener("mousedown", (event) => {
        isDragging = true;
        
        lastMouseX = event.clientX;
        lastMouseY = event.clientY;
    });
    window.addEventListener("mouseup", () => {
        isDragging = false;
    });
    window.addEventListener("mousemove", (event) => {
        if(!isDragging) {
            return 0;
        }else{
            dx = event.clientX - lastMouseX;

             dy = event.clientY - lastMouseY;
            angle -= dx * 0.003
            pitch += dy * 0.003
            lastMouseX = event.clientX;
            lastMouseY = event.clientY;
            return dx, dy;
        }
        
    })
    window.addEventListener("keydown", (event) => {

        keys[event.key] = true;
    /*
    if (event.key === "d") {
        steering = Math.min(steering + 0.1, 1);
    }

    if (event.key === "a") {
        steering = Math.max(steering - 0.1, -1);
    }
        */
    })

    window.addEventListener("keyup", (event) => {
        /*
        if(event.key == "a" || event.key == "d") {
            steering = 0;
        }

        */
       keys[event.key] = false;
    });

    window.addEventListener("keydown", (event) => {
        if(event.key == "Shift") {
            console.log(event.key)
            acceleration += 1;
        }
        if(event.key == "Control") {
            acceleration -= 1;
        }
    })
}


requestAnimationFrame(draw);
