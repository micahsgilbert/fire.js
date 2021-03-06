# fire.js
## The History
I started fire.js because I offered [my friend](https://github.com/jacksonelong) a new background for his website. I'm now working on it more often, and hopefully it could become an alternative to particles.js.

## Installation
Download and `npm install`. 
Build by running `npm run build`
Then, have a `<script src="fire.js"></script>` in your index.html.
If you have scripts that override `window.onresize` or `window.onload` make sure to put them BEFORE fire.js. fire.js will add its code to those functions, not override them.

## NPM scripts
* Start a dev server: `npm run dev`.
* Build the files into `build/fire.js`: `npm run build`

## JSON config
`fire.json` should be kept in the same directory as `fire.js`. If that cannot be done, simply edit the `fetch` request in the `getConfig` method.

| Field | Type | Description |
| -----:|:----:|:----------- |
| id | string | The id of the canvas to draw in |
| tiles.(width/height) | number | the dimensions of the tiles |
| colors.*.initial | number | the starting value for any color |
| colors.*.multiplier | number | the value multiplied by the perlin noise
| noiseResolution | number | how blocky or smooth the appearance is. Lower is blockier.
| speed | number | the speed at which the animation changes. Lower is faster. |

### The Gradient Directory
This is something I threw together quickly to allow for a different way to configure fire.js. How it works is you select 2 colors and it will preview a gradient that fire.js will look like, and also provide the configuration needed to do it. It's not implemented with a fire preview, but it will in the future.

## What's "initial" and "multiplier"?
The function for the r, g, and b values is `initial + noiseValue * multiplier`. `noiseValue` is always between 0 and 1, so this effectively means that the minimum value is `initial` and the maximum is `multiplier + initial`.