function gl_load() {
    // Get the canvas element.
    var gl_canvas = document.getElementById("glcanvas");
    // Make a new global WebGLRenderingContext.
    gl = gl_canvas.getContext("experimental-webgl");
    // Define the coordinates of the triangle.
    var vertices = [
         0.0,  1.0,  0.0,  1.0,
        -1.0, -1.0,  0.0,  1.0,
         1.0, -1.0,  0.0,  1.0
    ];
    // Create a new global WebGLBuffer to store the coordinates on the video card.
    vertex_buffer = gl.createBuffer();
    // gl.bufferData requires a call to gl.bindBuffer first to specify which buffer
    // you are adding data to.
    gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
    // Load coordinate data to the bound buffer.
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    // Define the colors of the triangle vertices.
    var colors = [
         1.0,  0.5,  0.0,  1.0,
         0.5,  0.0,  1.0,  1.0,
         0.0,  1.0,  0.5,  1.0
    ];
    // Create a new global WebGLBuffer to store the colros on the video card.
    color_buffer = gl.createBuffer();
    // gl.bufferData requires a call to gl.bindBuffer first to specify which buffer
    // you are adding data to.
    gl.bindBuffer(gl.ARRAY_BUFFER, color_buffer);
    // Load coordinate data to the bound buffer.
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

    // Write vertex shader source code.
    var vertex_shader_src = "" +
    // Declare the custom attribute that will hold each vertex in
    // the vertex buffer.
    "attribute vec4 aVertexPosition; " +
    // Declare the custom attribute that will hold each color in
    // the color buffer.
    "attribute vec4 aVertexColor; " +
    // Declare the output to the fragment shader that will be iteropolated
    // across the triangle face.
    "varying vec4 vColor; " +
    // Declare the uniform data for a rotation matrix.
    "uniform mat4 uRotationMatrix; " +
    "void main(void) { " +
         // Just set the color without modification.
    "    vColor = aVertexColor; " +
         // Rotate each point according to the rotation matrix.
    "    gl_Position = uRotationMatrix * aVertexPosition; " +
    "} ";
    // Make a new WebGLShader.
    var vertex_shader = gl.createShader(gl.VERTEX_SHADER);
    // Add source code to the shader.
    gl.shaderSource(vertex_shader, vertex_shader_src);
    // Compile the shader.
    gl.compileShader(vertex_shader);
    // Write fragment shader source code.
    var frag_shader_src = "" +
    // Set the precision of floats to medium.
    "precision mediump float; " +
    // Declare the input from the vertex shader that is interpolated
    // across each fragment.
    "varying vec4 vColor; " +
    "void main(void) { " +
         // Set the color as the iterpolated color from the vertex shader.
    "    gl_FragColor = vColor; " +
    "} ";
    // Make a new WebGLShader.
    var frag_shader = gl.createShader(gl.FRAGMENT_SHADER);
    // Add source code to the shader.
    gl.shaderSource(frag_shader, frag_shader_src);
    // Compile the shader.
    gl.compileShader(frag_shader);

    // Make a new global WebGLProgram.
    shader_program = gl.createProgram();
    // Attach the vertex shader to the program.
    gl.attachShader(shader_program, vertex_shader);
    // Attach the fragment shader to the program.
    gl.attachShader(shader_program, frag_shader);
    // Link all the attached shaders.
    gl.linkProgram(shader_program);
    // Tell OpenGL to use the program when rendering.
    gl.useProgram(shader_program);
    // Turn on the custom vertex array in the vertex shader.
    gl.enableVertexAttribArray(gl.getAttribLocation(shader_program, "aVertexPosition"));
    // Turn on the custom color array in the vertex shader.
    gl.enableVertexAttribArray(gl.getAttribLocation(shader_program, "aVertexColor"));

    // Set viewport coordinates to be the width of the canvas tag.
    gl.viewport(0, 0, gl_canvas.width, gl_canvas.height);
    // Turn on depth testing.
    gl.enable(gl.DEPTH_TEST);
    // Set the background color for gl.clear.
    gl.clearColor(0.0,0.0,0.0,1.0);
	// Start the drawing loop.
	draw_loop();
}

// Set a global time variable.
time = 0;

function draw_loop(){
	// Increment the timer. This should actually find a time delta, but
	// nevermind that for this example.
	time++;
	// Ask the browser to call this function again later. This should actually
	// use requestAnimationFrame, but nevermind that for this example.
	setTimeout(draw_loop, 1000 / 60);
	// Create data to be sent the same way to each call to the vertex_shader.
	// Change the value based on the time variable.
    var rotation_matrix = [
        Math.cos(2.0*Math.PI*time/1000.0), -Math.sin(2.0*Math.PI*time/1000.0), 0.0, 0.0,
        Math.sin(2.0*Math.PI*time/1000.0),  Math.cos(2.0*Math.PI*time/1000.0), 0.0, 0.0,
        0.0, 0.0, 1.0, 0.0,
        0.0, 0.0, 0.0, 1.0
    ];
	// Clear the canvas.
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    // Give the rotation matrix to the vertex shader.
    gl.uniformMatrix4fv(gl.getUniformLocation(shader_program, "uRotationMatrix"), false, new Float32Array(rotation_matrix));
    // gl.vertexAttribPointer requires a call to gl.bindBuffer first to specify
    // which buffer you are pulling data from.
    gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
    // Tell OpenGL that, when rendering, fill "aVertexPosition" in the shader
    // with the values of the above buffer. The parameters are:
    // 1: The attribute location of the attribute we want to give buffer data to.
    // 2: How many values per vertex (must be 1, 2, 3, or 4).
    // 3: What type are the values.
    // 4: Should fixed-point data be normalized?
    // 5: How many values in the array to skip after each group.
    // 6: How far into the array the values start.
    gl.vertexAttribPointer(gl.getAttribLocation(shader_program, "aVertexPosition"), 4, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, color_buffer);
    // Tell OpenGL that, when rendering, fill "aVertexColor" in the shader
    // with the values of the above buffer.
    gl.vertexAttribPointer(gl.getAttribLocation(shader_program, "aVertexColor"), 4, gl.FLOAT, false, 0, 0);
    // Draw.  The parameters are:
    // 1: The way to interpret the verticies.
    // 2: How far into the array the values start.
    // 3: The number of vertex sets to render.
    gl.drawArrays(gl.TRIANGLES, 0, 3);
}