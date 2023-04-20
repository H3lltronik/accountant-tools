// Make a random hex color that is constrastant with white
export function generateContrastColors(): Color {
    // Generate a random RGB color value
    const randomColor = () => Math.floor(Math.random() * 256);
    const randomRGB = () => `rgb(${randomColor()}, ${randomColor()}, ${randomColor()})`;
    let bgColor = randomRGB();
  
    // Calculate luminance of a color
    const calculateLuminance = (color: string) => {
      const [r, g, b] = color.match(/\d+/g)!.map(Number);
      const [sr, sg, sb] = [r / 255, g / 255, b / 255].map((c) => {
        if (c <= 0.03928) {
          return c / 12.92;
        } else {
          return ((c + 0.055) / 1.055) ** 2.4;
        }
      });
      return 0.2126 * sr + 0.7152 * sg + 0.0722 * sb;
    };
  
    // Check luminance of the background color, and generate a text color that contrasts it
    let textColor = '#FFFFFF';
    while (calculateLuminance(bgColor) < 0.5) {
      bgColor = randomRGB();
    }
    return { backgroundColor: bgColor, textColor };
  }
  