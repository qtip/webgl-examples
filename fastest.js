function gl_load() {
    // Get the canvas element.
    var gl_canvas = document.getElementById("glcanvas");
    // Make a new WebGLRenderingContext.
    var gl = gl_canvas.getContext("experimental-webgl");
    // Define the coordinates of the triangle.
    var vertices = [
         0.0,  1.0,  0.0,  1.0,
        -1.0, -1.0,  0.0,  1.0,
         1.0, -1.0,  0.0,  1.0
    ];
    // Create a new WebGLBuffer to store the coordinates on the video card.
    var vertex_buffer = gl.createBuffer();
    // gl.bufferData requires a call to gl.bindBuffer first to specify which buffer
    // you are adding data to.
    gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
    // Load coordinate data to the bound buffer.
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    // Write vertex shader source code.
    var vertex_shader_src = "" +
    // Declare the custom attribute that will hold each vertex in
    // the vertex buffer.
    "attribute vec4 aVertexPosition; " +
    "void main(void) { " +
         // Just output the vertex without modification.
    "    gl_Position = aVertexPosition; " +
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
    "void main(void) { " +
         // Set the color as white for every fragment.
    "    gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0); " +
    "} ";
    // Make a new WebGLShader.
    var frag_shader = gl.createShader(gl.FRAGMENT_SHADER);
    // Add source code to the shader.
    gl.shaderSource(frag_shader, frag_shader_src);
    // Compile the shader.
    gl.compileShader(frag_shader);

    // Make a new WebGLProgram.
    var shader_program = gl.createProgram();
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

    // Set viewport coordinates to be the width of the canvas tag.
    gl.viewport(0, 0, gl_canvas.width, gl_canvas.height);
    // Turn on depth testing.
    gl.enable(gl.DEPTH_TEST);
    // Set the background color for gl.clear.
    gl.clearColor(0.0,0.0,0.0,1.0);

    // Clear the canvas.
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
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
    // Draw.  The parameters are:
    // 1: The way to interpret the verticies.
    // 2: How far into the array the values start.
    // 3: The number of vertex sets to render.
    gl.drawArrays(gl.TRIANGLES, 0, 3);
}
