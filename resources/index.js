const {
    readFileSync,
    writeFileSync
} = require('fs');
const {
    join
} = require('path');
const {
    sync: svg2png
} = require('svg2png');
const {execSync} = require('child_process');
const input = join(__dirname, 'icon.svg');

function raster(dimension, output) {
    console.info('building ', output);
    const inputData = readFileSync(input);
    const fullOutput = join(__dirname, output);
    writeFileSync(fullOutput,
        svg2png(inputData, {
            filename: input,
            height: dimension,
            width: dimension
        })
    );
}

for (let dimension of [16, 24, 32, 48, 64, 96, 128, 256, 512, 1024]) {
    raster(dimension, `icons/${dimension}x${dimension}.png`);
}
raster(256, `icon.png`);
execSync(`iconutil --convert icns ${join(__dirname, 'icons/1024x1024.png')}`);
