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

for (let dimension of [16, 32, 128, 256, 512]) {
    raster(dimension, `icons.iconset/icon_${dimension}x${dimension}.png`);
    raster(dimension * 2, `icons.iconset/icon_${dimension}x${dimension}@2x.png`);
}
raster(256, `icon.png`);
execSync(`iconutil --convert icns --output ${join(__dirname, 'icon.icns')} ${join(__dirname, 'icons.iconset')} `);
