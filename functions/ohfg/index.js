export const handler = ({ inputs, mechanic, sketch }) => {
  const { width, height, flipcolor } = inputs;

  function randomHexColor() {
    // let color = '#';
    // const characters = '0123456789abcdef';

    // for (let i = 0; i < 6; i++) {
    //     color += characters[Math.floor(Math.random() * 16)];
    // }
    
    let hexes = ['#FF0000', '#FEC1D0', '#D4B4FF', '#006EE5', '#00FF03', '#FEFD00','#FFFFFF', '#000000']
    let color = hexes[Math.floor(Math.random()* 8)]

    return color;
}




function getComplementaryColors() {
  let color1 = randomHexColor();
  let color2 = '#';

  for (let i = 1; i < 6; i += 2) {
      let decimalColor = parseInt(color1.slice(i, i + 2), 16);
      let complementaryDecimalColor = 255 - decimalColor;
      let complementaryHexColor = complementaryDecimalColor.toString(16);
      color2 += complementaryHexColor.padStart(2, '0');
  }

  return [color1, color2];
}

let colors = getComplementaryColors()

console.log(colors)

  const center = [width / 2, height / 2];
  const angle = Math.random() * Math.PI * 2;

  sketch.setup = () => {
    sketch.createCanvas(width, height);

  };

  sketch.draw = () => {
    sketch.background(flipcolor ? colors[1] : colors[0]);
    sketch.noStroke();

    //add flip background forground

    sketch.translate(...center);
    sketch.rotate(angle);

    // sketch.fill(color1);
    // sketch.arc(0, 0, 2 * radius, 2 * radius, -sketch.PI, 0);
    // sketch.fill(color2);
    // sketch.arc(0, 0, 2 * radius, 2 * radius, 0, sketch.PI);
    sketch.textFont('OHFGfont')
    sketch.rotate(-angle);
    sketch.fill(flipcolor ? colors[0] : colors[1]);
    sketch.textAlign(sketch.CENTER, sketch.BOTTOM);
    sketch.textStyle(sketch.BOLD);
    sketch.textSize(height / 5);
    sketch.text("OHFG!", 0, 30);

    mechanic.done();
  };
};

export const inputs = {
  width: {
    type: "number",
    default: 400
  },
  height: {
    type: "number",
    default: 300
  },

  flipcolor:{
    type: "boolean",
    default:true
  },
  
};

export const presets = {
  medium: {
    width: 800,
    height: 600
  },
  large: {
    width: 1600,
    height: 1200
  }
};

export const settings = {
  engine: require("@mechanic-design/engine-p5")
};
