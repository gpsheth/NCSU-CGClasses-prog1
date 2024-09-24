/* classes */
// Color class
class Color {
    constructor(r,g,b,a) {
        try {
            if ((typeof(r) !== "number") || (typeof(g) !== "number") || (typeof(b) !== "number") || (typeof(a) !== "number"))
                throw "color component not a number";
            else if ((r<0) || (g<0) || (b<0) || (a<0)) 
                throw "color component less than 0";
            else if ((r>255) || (g>255) || (b>255) || (a>255)) 
                throw "color component bigger than 255";
            else {
                this.r = r; this.g = g; this.b = b; this.a = a; 
            }
        } // end try
        
        catch (e) {
            console.log(e);
        }
    } // end Color constructor

        // Color change method
    change(r,g,b,a) {
        try {
            if ((typeof(r) !== "number") || (typeof(g) !== "number") || (typeof(b) !== "number") || (typeof(a) !== "number"))
                throw "color component not a number";
            else if ((r<0) || (g<0) || (b<0) || (a<0)) 
                throw "color component less than 0";
            else if ((r>255) || (g>255) || (b>255) || (a>255)) 
                throw "color component bigger than 255";
            else {
                this.r = r; this.g = g; this.b = b; this.a = a; 
            }
        } // end throw
        
        catch (e) {
            console.log(e);
        }
    } // end Color change method
} // end color class

// Vector class
class Vector { 
    constructor(x,y,z) {
        this.set(x,y,z);
    } // end constructor
    
    // sets the components of a vector
    set(x,y,z) {
        try {
            if ((typeof(x) !== "number") || (typeof(y) !== "number") || (typeof(z) !== "number"))
                throw "vector component not a number";
            else
                this.x = x; this.y = y; this.z = z; 
        } // end try
        
        catch(e) {
            console.log(e);
        }
    } // end vector set
    
    // copy the passed vector into this one
    copy(v) {
        try {
            if (!(v instanceof Vector))
                throw "Vector.copy: non-vector parameter";
            else
                this.x = v.x; this.y = v.y; this.z = v.z;
        } // end try
        
        catch(e) {
            console.log(e);
        }
    }
    
    toConsole(prefix="") {
        console.log(prefix+"["+this.x+","+this.y+","+this.z+"]");
    } // end to console
    
    // static dot method
    static dot(v1,v2) {
        try {
            if (!(v1 instanceof Vector) || !(v2 instanceof Vector))
                throw "Vector.dot: non-vector parameter";
            else
                return(v1.x*v2.x + v1.y*v2.y + v1.z*v2.z);
        } // end try
        
        catch(e) {
            console.log(e);
            return(NaN);
        }
    } // end dot static method
    
    // static cross method
    static cross(v1,v2) {
        try {
            if (!(v1 instanceof Vector) || !(v2 instanceof Vector))
                throw "Vector.cross: non-vector parameter";
            else {
                var crossX = v1.y*v2.z - v1.z*v2.y;
                var crossY = v1.z*v2.x - v1.x*v2.z;
                var crossZ = v1.x*v2.y - v1.y*v2.x;
                return(new Vector(crossX,crossY,crossZ));
            } // endif vector params
        } // end try
        
        catch(e) {
            console.log(e);
            return(NaN);
        }
    } // end dot static method
    
    // static add method
    static add(v1,v2) {
        try {
            if (!(v1 instanceof Vector) || !(v2 instanceof Vector))
                throw "Vector.add: non-vector parameter";
            else
                return(new Vector(v1.x+v2.x,v1.y+v2.y,v1.z+v2.z));
        } // end try
        
        catch(e) {
            console.log(e);
            return(new Vector(NaN,NaN,NaN));
        }
    } // end add static method

    // static subtract method, v1-v2
    static subtract(v1,v2) {
        try {
            if (!(v1 instanceof Vector) || !(v2 instanceof Vector))
                throw "Vector.subtract: non-vector parameter";
            else {
                var v = new Vector(v1.x-v2.x,v1.y-v2.y,v1.z-v2.z);
                return(v);
            }
        } // end try
        
        catch(e) {
            console.log(e);
            return(new Vector(NaN,NaN,NaN));
        }
    } // end subtract static method

    // static scale method
    static scale(c,v) {
        try {
            if (!(typeof(c) === "number") || !(v instanceof Vector))
                throw "Vector.scale: malformed parameter";
            else
                return(new Vector(c*v.x,c*v.y,c*v.z));
        } // end try
        
        catch(e) {
            console.log(e);
            return(new Vector(NaN,NaN,NaN));
        }
    } // end scale static method
    
    // static normalize method
    static normalize(v) {
        try {
            if (!(v instanceof Vector))
                throw "Vector.normalize: parameter not a vector";
            else {
                var lenDenom = 1/Math.sqrt(Vector.dot(v,v));
                return(Vector.scale(lenDenom,v));
            }
        } // end try
        
        catch(e) {
            console.log(e);
            return(new Vector(NaN,NaN,NaN));
        }
    } // end scale static method
    
} // end Vector class

/* utility functions */

// draw a pixel at x,y using color
function drawPixel(imagedata,x,y,color) {
    try {
        if ((typeof(x) !== "number") || (typeof(y) !== "number"))
            throw "drawpixel location not a number";
        else if ((x<0) || (y<0) || (x>=imagedata.width) || (y>=imagedata.height)) {
            console.log(x, y);
            throw "drawpixel location outside of image";
        }
        else if (color instanceof Color) {
            var pixelindex = (y*imagedata.width + x) * 4;
            imagedata.data[pixelindex] = color.r;
            imagedata.data[pixelindex+1] = color.g;
            imagedata.data[pixelindex+2] = color.b;
            imagedata.data[pixelindex+3] = color.a;
        } else 
            throw "drawpixel color is not a Color";
    } // end try
    
    catch(e) {
        console.log(e);
    }
} // end drawPixel

// get the input spheres from the standard class URL
function getInputSpheres() {
    const INPUT_SPHERES_URL = 
        "https://ncsucgclass.github.io/prog1/spheres.json";
        
    // load the spheres file
    var httpReq = new XMLHttpRequest(); // a new http request
    httpReq.open("GET",INPUT_SPHERES_URL,false); // init the request
    httpReq.send(null); // send the request
    var startTime = Date.now();
    while ((httpReq.status !== 200) && (httpReq.readyState !== XMLHttpRequest.DONE)) {
        if ((Date.now()-startTime) > 3000)
            break;
    } // until its loaded or we time out after three seconds
    if ((httpReq.status !== 200) || (httpReq.readyState !== XMLHttpRequest.DONE)) {
        console.log*("Unable to open input ellipses file!");
        return String.null;
    } else
        return JSON.parse(httpReq.response); 
} // end get input spheres

//get the input triangles from the standard class URL
function getInputLights() {
    const INPUT_LIGHTS_URL = 
        "https://ncsucgclass.github.io/prog1/lights.json";
        
    // load the lights file
    var httpReq = new XMLHttpRequest(); // a new http request
    httpReq.open("GET",INPUT_LIGHTS_URL,false); // init the request
    httpReq.send(null); // send the request
    var startTime = Date.now();
    while ((httpReq.status !== 200) && (httpReq.readyState !== XMLHttpRequest.DONE)) {
        if ((Date.now()-startTime) > 3000)
            break;
    } // until its loaded or we time out after three seconds
    if ((httpReq.status !== 200) || (httpReq.readyState !== XMLHttpRequest.DONE)) {
        console.log*("Unable to open input triangles file!");
        return String.null;
    } else
        return JSON.parse(httpReq.response); 
} // end get input lights

function renderSpheres(context) {
    // var inputSpheres = getInputSpheres();
    var inputSpheres = [
        {"x": 0.5, "y": 0.5, "z": 0.5, "r":0.4, "ambient": [0.1, 0.0, 0.0], "diffuse": [0.6, 0.0, 0.0], "specular": [0.3, 0.1, 0.1], "n":5},
        {"x": 0.5, "y": 0.5, "z": 0.5, "r":0.3, "ambient": [0.1, 0.1, 0.1], "diffuse": [0.6, 0.6, 0.6], "specular": [0.6, 0.6, 0.6], "n":7},
        {"x": 0.5, "y": 0.5, "z": 0.5, "r":0.2, "ambient": [0.1, 0.0, 0.0], "diffuse": [0.6, 0.0, 0.0], "specular": [0.3, 0.1, 0.1], "n":9}
    ];
    var inputLights = [
        {
            "x": 1.0,  // Centered in the scene
            "y": 1.0,  // Above the logo to simulate overhead lighting
            "z": 0.5,  // Centered in the scene
            "ambient": [1.0, 1.0, 1.0],  // Soft ambient light for overall illumination
            "diffuse": [1.0, 1.0, 1.0],   // Bright white light to illuminate the logo
            "specular": [1.0, 1.0, 1.0]   // Strong highlights for shiny surfaces
        },
        // Secondary Light Source
        {
            "x": 0.0,  // Positioned to the left of the logo
            "y": 1.0,  // Above the logo
            "z": 0.5,  // Centered in depth
            "ambient": [1.0, 1.0, 1.0],  // Soft ambient light
            "diffuse": [1.0, 1.0, 1.0],   // Slightly red light to enhance the red color
            "specular": [1.0, 1.0, 1.0]   // Moderate specular highlights
        }
    ];
    var w = context.canvas.width;
    var h = context.canvas.height;
    var imagedata = context.createImageData(w,h);

    let eye = new Vector(0.5, 0.5, -0.5);
    let viewUp = new Vector(0, 1, 0);
    let lookAt = new Vector(0, 0, 1);
    let horizontal = Vector.cross(viewUp, lookAt);
    let dist = 0.5;
    let center = new Vector(0.5, 0.5, 0);
    let viewWindow = 0.5;

    for(let x=0; x<=w; x++) {
        for(let y=0; y<=h; y++) {
            let c = new Color(0, 0, 0, 0);
            if(inputSpheres != String.null) {
                let n = inputSpheres.length;
                let xW = x / w;
                let yW = y / h;
                let zW = 0;
                let point = new Vector(xW, yW, zW);
                // let rayDirection = Vector.normalize(Vector.subtract(point, eye));
                let rayDirection = Vector.subtract(point, eye);
                for(let s=0; s<n; s++) {
                    let centerS = new Vector(
                        inputSpheres[s].x,
                        inputSpheres[s].y,
                        inputSpheres[s].z,
                    ); 
                    let radius = inputSpheres[s].r;
                    let sphereAmbient = inputSpheres[s].ambient;
                    let sphereDiffuse = inputSpheres[s].diffuse;
                    let sphereSpecular = inputSpheres[s].specular;
                    let sphereN = inputSpheres[s].n;

                    let qA = Vector.dot(rayDirection, rayDirection);
                    // let rayCenterS = Vector.normalize(Vector.subtract(eye, centerS));
                    let rayCenterS = Vector.subtract(eye, centerS);
                    let qB = 2 * Vector.dot(rayDirection, rayCenterS);
                    let qC = Vector.dot(rayCenterS, rayCenterS) - radius * radius;

                    let discriminant = (qB * qB) - (4 * qA * qC);
                    if(discriminant>=0) {
                        // console.log("working till here");
                        let root1 = (-qB + Math.sqrt(discriminant)) / (2 * qA);
                        let root2 = (-qB - Math.sqrt(discriminant)) / (2 * qA);
                        let root = Math.min(root1, root2);
                        // console.log(root);
                        if(root>=1) {
                            let intersection = Vector.normalize(Vector.add(eye, Vector.scale(root, rayDirection)));
                            let surfaceNormal = Vector.normalize(Vector.subtract(intersection, centerS));
                            // console.log("working till here");
                            let color = [0, 0, 0];

                            if(inputLights != String.null) {
                                let m = inputLights.length;
                                for(let l=0; l<m; l++) {
                                    let lightPoint = new Vector(
                                        inputLights[l].x,
                                        inputLights[l].y,
                                        inputLights[l].z,
                                    );

                                    let lightAmbient = inputLights[l].ambient;
                                    // console.log(lightAmbient);
                                    let lightDiffuse = inputLights[l].diffuse;
                                    let lightSpecular = inputLights[l].specular;

                                    let lightVector = Vector.normalize(Vector.subtract(lightPoint, intersection));
                                    let NdotL = Vector.dot(surfaceNormal, lightVector);
                                    // console.log(NdotL);
                                    let eyeVector = Vector.normalize(Vector.subtract(eye, intersection));
                                    let halfVector = Vector.normalize(Vector.add(eyeVector, lightVector));
                                    let NdotH = Vector.dot(surfaceNormal, halfVector);
                                    // console.log(NdotH);
                                    for(let k=0; k<3; k++) {
                                        color[k] += sphereAmbient[k] * lightAmbient[k];
                                        // console.log(c[k]);
                                        color[k] += sphereDiffuse[k] * lightDiffuse[k] * Math.max(NdotL, 0);
                                        color[k] += sphereSpecular[k] * lightSpecular[k] * Math.pow(Math.max(NdotH, 0), sphereN);
                                    }
                                    // console.log(c);
                                }
                                for(let k=0; k<3; k++) {
                                    color[k] = Math.min(color[k], 1);
                                }
                                c.change(color[0]*255, color[1]*255, color[2]*255, 255);
                                drawPixel(imagedata, x, y, c);
                            }
                        }
                    } 
                }
            }
        }
    }
    context.putImageData(imagedata, 0, 0);
} // end draw rand pixels in input spheres

/* main -- here is where execution begins after window load */

function main() {

    // Get the canvas and context
    var canvas = document.getElementById("viewport"); 
    var context = canvas.getContext("2d");
    renderSpheres(context);
}
