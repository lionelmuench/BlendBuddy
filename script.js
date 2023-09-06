function addColorInput() {
    const colorInput = document.createElement('input');
    colorInput.type = 'color';
    colorInput.value = '#FFFFFF';
    document.getElementById('colorInputs').appendChild(colorInput);
}

function averageColors() {
    let colors = Array.from(document.querySelectorAll('#colorInputs input')).map(input => input.value);
    
    let totalHue = 0;
    let totalSaturation = 0;
    let totalLightness = 0;
    for(let color of colors) {
        let [h, s, l] = rgbToHsl(color);
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
    const apiEndpoint = `https://www.thecolorapi.com/id?rgb=${rgbColor.replace("rgb(", "").replace(")", "")}&format=json`;
    
    fetch(apiEndpoint)
    .then(response => response.json())
    .then(data => {
        document.getElementById('colorName').innerText = "Color Name: " + data.name;
    }).catch(error => {
        console.error("Error fetching color name:", error);
    });
}

function rgbToHsl(color) {
    // Convert the RGB color string to HSL
    // Return [h, s, l]
}

function hslToRgb(h, s, l) {
    // Convert HSL values to an RGB color string
    // Return RGB color string
}
