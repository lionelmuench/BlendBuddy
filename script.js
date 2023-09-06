function addColorInput() {
    const colorInput = document.createElement('input');
    colorInput.type = 'color';
    colorInput.value = '#FFFFFF';
    document.getElementById('colorInputs').appendChild(colorInput);
}

function removeColorInput() {
    const colorInputs = document.getElementById('colorInputs');
    if(colorInputs.children.length > 1) { // Check to avoid removing the last color input
        colorInputs.removeChild(colorInputs.lastChild);
    }
}

function averageColors() {
    let colors = Array.from(document.querySelectorAll('#colorInputs input')).map(input => input.value);
    
    let totalHue = 0;
    let totalSaturation = 0;
    let totalLightness = 0;
    
    for (let color of colors) {
        let [r, g, b] = rgbToHsl(color);
        totalHue += h;
        totalSaturation += s;
        totalLightness += l;
    }

    let avgHue = totalHue / colors.length;
    let avgSaturation = totalSaturation / colors.length;
    let avgLightness = totalLightness / colors.length;

    let averageColor = hslToRgb(avgHue, avgSaturation, avgLightness);
    document.getElementById('result').style.backgroundColor = averageColor;

    fetchColorNameFromAPI(averageColor);
}

function fetchColorNameFromAPI(rgbColor) {
    const cleanedRgb = rgbColor.replace("rgb(", "").replace(" ", "").replace(")", "").replace(/ /g, '');
    const apiEndpoint = `https://www.thecolorapi.com/id?rgb=${cleanedRgb}&format=json`;
    
    fetch(apiEndpoint)
    .then(response => response.json())
    .then(data => {
        document.getElementById('colorName').innerText = `Color Name: ${data.name.value}\nRGB: ${averageColor}\nHex: ${rgbToHex(averageColor)}`;
    }).catch(error => {
        console.error("Error fetching color name:", error);
    });
}


function rgbToHsl(r, g, b){
    r /= 255, g /= 255, b /= 255;
    let max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;
    if(max === min) h = s = 0;
    else {
        let d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch(max){
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }
    return [h * 360, s * 100, l * 100];
}

function hslToRgb(h, s, l){
    let r, g, b;
    if(s === 0) r = g = b = l;
    else {
        let hue2rgb = function hue2rgb(p, q, t){
            if(t < 0) t += 1;
            if(t > 1) t -= 1;
            if(t < 1/6) return p + (q - p) * 6 * t;
            if(t < 1/2) return q;
            if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        };
        let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        let p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }
    return `rgb(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)})`;
}

function rgbToHex(rgb) {
    const regex = /(\d+),\s*(\d+),\s*(\d+)/;
    const [, r, g, b] = rgb.match(regex).map(Number);
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}
