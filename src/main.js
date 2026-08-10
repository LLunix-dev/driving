import { mat4} from 'gl-matrix';
import vertexShaderSource from "./shader.vs?raw";
import  fragmentShaderSource from './shader.fs?raw';
import { positions } from './car';

console.log(vertexShaderSource);
var canvas = document.getElementById('my_Canvas');
const gl = canvas.getContext('webgl2');
let model = mat4.create();
let view = mat4.create();
let projection = mat4.create();


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
    -0.5, -0.5, -0.5,  0.0,  0.0, -1.0, 0.0, 1.0, 0.1,
     0.5, -0.5, -0.5,  0.0,  0.0, -1.0, 0.0, 1.0, 0.1, 
     0.5,  0.5, -0.5,  0.0,  0.0, -1.0, 0.0, 1.0, 0.1, 
     0.5,  0.5, -0.5,  0.0,  0.0, -1.0, 0.0, 1.0, 0.1, 
    -0.5,  0.5, -0.5,  0.0,  0.0, -1.0, 0.0, 1.0, 0.1, 
    -0.5, -0.5, -0.5,  0.0,  0.0, -1.0, 0.0, 1.0, 0.1, 
    -0.5, -0.5,  0.5,  0.0,  0.0, 1.0, 0.0, 1.0, 0.1,
     0.5, -0.5,  0.5,  0.0,  0.0, 1.0, 0.0, 1.0, 0.1,
     0.5,  0.5,  0.5,  0.0,  0.0, 1.0, 0.0, 1.0, 0.1,
     0.5,  0.5,  0.5,  0.0,  0.0, 1.0, 0.0, 1.0, 0.1,
    -0.5,  0.5,  0.5,  0.0,  0.0, 1.0, 0.0, 1.0, 0.1,
    -0.5, -0.5,  0.5,  0.0,  0.0, 1.0, 0.0, 1.0, 0.1,
    -0.5,  0.5,  0.5, -1.0,  0.0,  0.0, 0.0, 1.0, 0.1,
    -0.5,  0.5, -0.5, -1.0,  0.0,  0.0, 0.0, 1.0, 0.1,
    -0.5, -0.5, -0.5, -1.0,  0.0,  0.0, 0.0, 1.0, 0.1,
    -0.5, -0.5, -0.5, -1.0,  0.0,  0.0, 0.0, 1.0, 0.1,
    -0.5, -0.5,  0.5, -1.0,  0.0,  0.0, 0.0, 1.0, 0.1,
    -0.5,  0.5,  0.5, -1.0,  0.0,  0.0, 0.0, 1.0, 0.1,
     0.5,  0.5,  0.5,  1.0,  0.0,  0.0, 0.0, 1.0, 0.1,
     0.5,  0.5, -0.5,  1.0,  0.0,  0.0, 0.0, 1.0, 0.1,
     0.5, -0.5, -0.5,  1.0,  0.0,  0.0, 0.0, 1.0, 0.1,
     0.5, -0.5, -0.5,  1.0,  0.0,  0.0, 0.0, 1.0, 0.1,
     0.5, -0.5,  0.5,  1.0,  0.0,  0.0, 0.0, 1.0, 0.1,
     0.5,  0.5,  0.5,  1.0,  0.0,  0.0, 0.0, 1.0, 0.1,
    -0.5, -0.5, -0.5,  0.0, -1.0,  0.0, 0.0, 1.0, 0.1,
     0.5, -0.5, -0.5,  0.0, -1.0,  0.0, 0.0, 1.0, 0.1,
     0.5, -0.5,  0.5,  0.0, -1.0,  0.0, 0.0, 1.0, 0.1,
     0.5, -0.5,  0.5,  0.0, -1.0,  0.0, 0.0, 1.0, 0.1,
    -0.5, -0.5,  0.5,  0.0, -1.0,  0.0, 0.0, 1.0, 0.1,
    -0.5, -0.5, -0.5,  0.0, -1.0,  0.0, 0.0, 1.0, 0.1,
    -0.5,  0.5, -0.5,  0.0,  1.0,  0.0, 0.0, 1.0, 0.1,
     0.5,  0.5, -0.5,  0.0,  1.0,  0.0, 0.0, 1.0, 0.1,
     0.5,  0.5,  0.5,  0.0,  1.0,  0.0, 0.0, 1.0, 0.1,
     0.5,  0.5,  0.5,  0.0,  1.0,  0.0, 0.0, 1.0, 0.1,
    -0.5,  0.5,  0.5,  0.0,  1.0,  0.0, 0.0, 1.0, 0.1,
    -0.5,  0.5, -0.5,  0.0,  1.0,  0.0, 0.0, 1.0, 0.1,
];






//webglUtils.resizeCanvasToDisplaySize(gl.canvas);

class Mesh {
    constructor(gl, vertices, vertColor, vertexShaderSource, fragmentShaderSource) {
        if(vertColor) {
            this.vertexCount = vertices.length / 9;
        } else {
            this.vertexCount = vertices.length / 6;
        }

        this.vertColor = vertColor;
        this.vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
        this.fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

        this.program = createProgram(gl, this.vertexShader, this.fragmentShader)

        this.modelLocation = gl.getUniformLocation(this.program, "u_model");
        this.viewLocation = gl.getUniformLocation(this.program, "u_view");
        this.projectionLocation = gl.getUniformLocation(this.program, "u_projection");
        this.vao = gl.createVertexArray();
        this.positionAttributeLocation = gl.getAttribLocation(this.program, "a_position");
        this.normalAttributeLocation = gl.getAttribLocation(this.program, "a_normal");
        if(vertColor) {
            this.colorAttributeLocation = gl.getAttribLocation(this.program, "a_color");
        }
        this.verticiesBuffer = gl.createBuffer();

        gl.bindBuffer(gl.ARRAY_BUFFER, this.verticiesBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.DYNAMIC_DRAW);

        gl.bindVertexArray(this.vao);

        if(vertColor) {

            gl.enableVertexAttribArray(this.positionAttributeLocation);
            gl.vertexAttribPointer(this.positionAttributeLocation, 3, gl.FLOAT, false, 9 * 4, 0);
    
            gl.enableVertexAttribArray(this.normalAttributeLocation);
            gl.vertexAttribPointer(this.normalAttributeLocation, 3, gl.FLOAT, false, 9 * 4, 3 * 4);

            gl.enableVertexAttribArray(this.colorAttributeLocation);
            gl.vertexAttribPointer(this.colorAttributeLocation, 3, gl.FLOAT, false, 9 * 4, 6 * 4);

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

let carMesh = new Mesh(gl,positions,true, vertexShaderSource, fragmentShaderSource);
let carObject = new Object3d(carMesh);
carObject.position = [0,0.4,0.5];

let mapMesh = new Mesh(gl,map,true, vertexShaderSource, fragmentShaderSource);
let mapObject = new Object3d(mapMesh);
mapObject.scale = [10,0.1, 100];
mapObject.position = [0,-1,0]

let objects = [
    carObject,
    mapObject
];

let isDragging = false;
let dx = 0;
let dy = 0;
let angle = 0
let pitch= 0;
doMouseMovement();
function draw(time){
    
    
    canvas.height = window.innerHeight;
    canvas.width = window.innerHeight;
    //mat4.identity(model);
    //mat4.translate(model, model, [0,0,-3]);
    //
    //mat4.rotateX(model, model, time * 0.0001);
    //mat4.rotateY(model, model, time * 0.001);
    


    mat4.lookAt(
        view,
        [Math.sin(angle)* Math.cos(pitch)* 10,Math.sin(pitch) * 10,Math.cos(angle)* Math.cos(pitch) * 10],
        [0,0,0],
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
            console.log(dx);
             dy = event.clientY - lastMouseY;
            angle -= dx * 0.003
            pitch += dy * 0.003
            lastMouseX = event.clientX;
            lastMouseY = event.clientY;
            return dx, dy;
        }
        
    })
}
requestAnimationFrame(draw);

