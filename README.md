About
=====
`fastest.js` with `fastest.html` is an example of the fastest way to get a triangle on the screen with webgl (which is no trivial task). Actually, I lied about the fastest part. I really mean it's the most straight-forward way to get a triangle on the screen with webgl. The point of the file is to show only opengl calls and none of my own library built in. This way, one trying to learn WebGL (or even OpenGL) for the first time can see how ~~horrible it is~~ to do it.

`moredata.js` with `moredata.html` adds to `fastest.js`. Instead of just drawing a white triangle to the screen, vertex colors are set and uniform data of a rotation gets sent to the shader.

`animation.js` with `animation.html` adds to `moredata.js`. Instead of just drawing a rotated colored triangle to the screen, it continuously changes the rotation over time.

You might want to try

```bash
$ diff fastest.js moredata.js
```

and/or

```bash
$ diff moredata.js animation.js
```

to see the differences between the files.

See it in action
================
* [fastest.html](http://qtip.github.com/webgl-examples/fastest.html)
* [moredata.html](http://qtip.github.com/webgl-examples/moredata.html)
* [animation.html](http://qtip.github.com/webgl-examples/animation.html)