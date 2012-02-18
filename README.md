About
=====
`fastest.js` with `fastest.html` is an example of the fastest way to get a triangle on the screen with webgl (which is no trivial task). Actually, I lied about the fastest part. I really mean it's the most straight-forward way to get a triangle on the screen with webgl. The point of the file is to show only opengl calls and none of my own library built in. This way, one trying to learn WebGL (or even OpenGL) for the first time can see how <s>horrible it is</s> to do it.

`moredata.js` with `moredata.html` is an extensions of `fastest.js`. Instead of just drawing a white triangle to the screen, vertex colors are set and uniform data of a rotation gets sent to the shader. You might want to try

```bash
$ diff fastest.js moredata.js
```

to see the differences between the two files.