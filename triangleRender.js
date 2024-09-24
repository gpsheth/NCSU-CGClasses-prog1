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

//get the input triangles from the standard class URL
function getInputTriangles() {
    const INPUT_TRIANGLES_URL = 
        "https://ncsucgclass.github.io/prog1/triangles2.json";
        
    // load the triangles file
    var httpReq = new XMLHttpRequest(); // a new http request
    httpReq.open("GET",INPUT_TRIANGLES_URL,false); // init the request
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
} // end get input triangles

//get the input triangles from the standard class URL
function getInputLights() {
    const INPUT_TRIANGLES_URL = 
        "https://ncsucgclass.github.io/prog1/lights.json";
        
    // load the triangles file
    var httpReq = new XMLHttpRequest(); // a new http request
    httpReq.open("GET",INPUT_TRIANGLES_URL,false); // init the request
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
} // end get input triangles

function isPointInTriangle(intersection, triangleNormal, vertex1, vertex2, vertex3) {
    // check if vertex is in clockwise direction of each side of triangle
    // for that sign of each side should be same
    // side 1
    let vec1 = Vector.subtract(intersection, vertex1);
    let vec2 = Vector.subtract(vertex2, vertex1);
    let crossProduct1 = Vector.cross(vec1, vec2);
    let side1 = Vector.dot(triangleNormal, crossProduct1);
    // side 2
    let vec3 = Vector.subtract(intersection, vertex2);
    let vec4 = Vector.subtract(vertex3, vertex2);
    let crossProduct2 = Vector.cross(vec3, vec4);
    let side2 = Vector.dot(triangleNormal, crossProduct2);
    // side 3
    let vec5 = Vector.subtract(intersection, vertex3);
    let vec6 = Vector.subtract(vertex1, vertex3);
    let crossProduct3 = Vector.cross(vec5, vec6);
    let side3 = Vector.dot(triangleNormal, crossProduct3);
    // check if sign of all 3 is same or not
    if((side1<0 && side2<0 && side3<0) || (side1>=0 && side2>=0 && side3>=0)) {
        return true;
    }
    return false;
}

function calColor(triangleNormal, lightPoint, pointInWorldSpace, eye, lightAmbient, lightDiffuse, lightSpecular, diffuse, ambient, specular, n) {
    let oppTriangleNormal = new Vector(triangleNormal.x*-1, triangleNormal.y*-1, triangleNormal.z*-1);
    let lightVector = Vector.normalize(Vector.subtract(lightPoint, pointInWorldSpace));
    let eyeVector = Vector.normalize(Vector.subtract(eye, pointInWorldSpace));
    let halfVector = Vector.normalize(Vector.add(lightVector, eyeVector));
    let nv = Vector.dot(Vector.normalize(triangleNormal), eyeVector);
    if(nv<0) {
        var nl = Vector.dot(Vector.normalize(oppTriangleNormal), lightVector);
        var nh = Vector.dot(Vector.normalize(oppTriangleNormal), halfVector);
    } else {
        var nl = Vector.dot(Vector.normalize(triangleNormal), lightVector);
        var nh = Vector.dot(Vector.normalize(triangleNormal), halfVector);
    }
    // console.log(lightSpecular)
    let color = [0, 0, 0];

    for(let i=0; i<3; i++) {
        color[i] += ambient[i] * lightAmbient[i];
        color[i] += diffuse[i] * lightDiffuse[i] * Math.max(nl, 0);
        color[i] += specular[i] * lightSpecular[i] * Math.pow(Math.max(nh, 0), n);
    }

    return new Color(color[0]*255, color[1]*255, color[2]*255, 255);
}

//put random points in the triangles from the class github
function renderTriangles(context) {
    let inputTriangles = getInputTriangles();
    let inputLights = getInputLights();
    let w = context.canvas.width;
    let h = context.canvas.height;
    let imagedata = context.createImageData(w,h);

    let eye = new Vector(0.5, 0.5, -0.5);
    let viewUp = new Vector(0, 1, 0);
    let lookAt = new Vector(0, 0, 1);
    let horizontal = Vector.cross(viewUp, lookAt);
    let dist = 0.5;
    let center = new Vector(0.5, 0.5, 0);
    let viewWindow = 0.5;
    let distBetweenEyeAndWindow = 1;

    for(let x=0; x<=w; x++) {
        for(let y=0; y<=h; y++) {
            let c = new Color(0, 0, 0, 0);
            if (inputTriangles != String.null) {
                let n = inputTriangles.length;
                let xW = x / w;
                let yW = y / h;
                let zW = 0; 
                let pointInWorldSpace = new Vector(xW, yW, zW);
                // pointInWorldSpace.toConsole();

                let closestRayDistance = Number.MAX_SAFE_INTEGER;

                // step2: find ray direction from eye to pixel (D)
                let rayDirection = Vector.subtract(pointInWorldSpace, eye);
                // rayDirection.toConsole();

                // step3: calculate triangle normal (N), triangle plane constant (d) and distance on ray (t)
                // triangle vertices
                // Loop over the triangles, draw rand pixels in each
                for (var f=0; f<n; f++) {
                    var tn = inputTriangles[f].triangles.length;
                    
                    // Loop over the triangles, draw each in 2d
                    for(let t=0; t<tn; t++){
                        let vertexPos1 = inputTriangles[f].triangles[t][0];
                        let vertexPos2 = inputTriangles[f].triangles[t][1];
                        let vertexPos3 = inputTriangles[f].triangles[t][2];

                        let vertex1 = new Vector(
                            inputTriangles[f].vertices[vertexPos1][0], 
                            inputTriangles[f].vertices[vertexPos1][1], 
                            inputTriangles[f].vertices[vertexPos1][2]);
                        let vertex2 = new Vector(
                            inputTriangles[f].vertices[vertexPos2][0], 
                            inputTriangles[f].vertices[vertexPos2][1], 
                            inputTriangles[f].vertices[vertexPos2][2]);
                        let vertex3 = new Vector(
                            inputTriangles[f].vertices[vertexPos3][0], 
                            inputTriangles[f].vertices[vertexPos3][1], 
                            inputTriangles[f].vertices[vertexPos3][2]);
                        // vertex1.toConsole();
                        // vertex2.toConsole();
                        // vertex3.toConsole();

                        // triangle normal (N)
                        // calculate vectors of 2 sides of a triangle
                        let side21 = Vector.subtract(vertex1, vertex2);
                        let side31 = Vector.subtract(vertex1, vertex3);
                        // vector1.toConsole();
                        // vector2.toConsole();
                        let triangleNormal = Vector.cross(side21, side31);
                        // triangleNormal.toConsole();
                        // triangle plane constant (d)
                        let trianglePlaneConst = Vector.dot(triangleNormal, vertex1);
                        // console.log(trianglePlaneConst);
                        // distance on ray (t)
                        // calculate numerator and denomenator first
                        let nume = trianglePlaneConst - Vector.dot(triangleNormal, eye);
                        // console.log(nume);
                        let deno = Vector.dot(triangleNormal, rayDirection);
                        // console.log(deno);
                        if(deno!=0) {
                            let rayDistance = nume / deno;
                            // console.log(rayDistance);
                            if(rayDistance >= distBetweenEyeAndWindow && rayDistance < closestRayDistance) {
                                // step4: calculate Intersection point (I)
                                let intersection = Vector.add(eye, Vector.scale(rayDistance, rayDirection));
                                
                                // step 5: check if intersection lies inside triangle or not
                                if(isPointInTriangle(intersection, triangleNormal, vertex1, vertex2, vertex3)) {
                                    // calculating color

                                    //diffuse
                                    let diffuse = [
                                        inputTriangles[f].material.diffuse[0],
                                        inputTriangles[f].material.diffuse[1],
                                        inputTriangles[f].material.diffuse[2],
                                    ];
                                    // console.log(diffuse);

                                    //ambient
                                    let ambient = [
                                        inputTriangles[f].material.ambient[0],
                                        inputTriangles[f].material.ambient[1],
                                        inputTriangles[f].material.ambient[2],
                                    ];
                                    // console.log(ambient);

                                    //specular
                                    let specular = [
                                        inputTriangles[f].material.specular[0],
                                        inputTriangles[f].material.specular[1],
                                        inputTriangles[f].material.specular[2],
                                    ];
                                    // console.log(specular);

                                    let N = inputTriangles[f].material.n;

                                    if (inputLights != String.null) {
                                        var m = inputLights.length;
                                        for (var l=0; l<m; l++) {
                                            let lightAmbient = inputLights[l].ambient;
                                            let lightDiffuse = inputLights[l].diffuse;
                                            let lightSpecular = inputLights[l].specular;
                                            let lightPoint = new Vector(inputLights[l].x, inputLights[l].y, inputLights[l].z);
                                            c = calColor(triangleNormal, lightPoint, intersection, eye, lightAmbient, lightDiffuse, lightSpecular, diffuse, ambient, specular, N);

                                            closestRayDistance = rayDistance;
                                            drawPixel(imagedata, x, h - y, c);
                                        }
                                    }
                                } 
                            }
                        }
                    }
                }
            }
        }
    }
    context.putImageData(imagedata, 0, 0);   
}

/* main -- here is where execution begins after window load */

function main() {

    // Get the canvas and context
    var canvas = document.getElementById("viewport"); 
    var context = canvas.getContext("2d");
    renderTriangles(context);
    
    // document.addEventListener('keydown', function(event) {
    //     if (event.code === 'Space') {
    //         // Your code here when the space bar is pressed
    //         console.log('Space bar was pressed!');
    //         var canvas = document.getElementById("viewport"); 
    //         var context = canvas.getContext("2d");
    //         renderSpheres(context);
    //     }
    // });
}
