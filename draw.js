import {degToRad} from "./utils.js";

const drawSentence = ({sentence, ctx, startStepWidth = 100}) => {
  let step = startStepWidth;
  let depth = 1;

  ctx.save();

  for (let i = 0; i < sentence.length; i++) {
    const c = sentence.charAt(i);

    if (c === '>') {
      ctx.strokeStyle = 'rgba(255,255,255,0.8)';
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(0, step);
      ctx.stroke();

      ctx.translate(0, step);
    } else if (c === 'L' || c === 'R') {
      const closeBracketIdx = sentence.indexOf(')', i);
      if (closeBracketIdx > 0) {
        const deg = parseFloat(sentence.substring(i + 2, closeBracketIdx));
        if (c === 'R') {
          ctx.rotate(degToRad(deg));
        } else if (c === 'L') {
          ctx.rotate(degToRad(-deg));
        }
      }
    } else if (c === '[') {
      ctx.save();
      depth++;
      step *= 0.7;
    } else if (c === ']') {
      ctx.restore();
      depth--;
      step *= 1 / 0.7;
    }
  }

  ctx.restore();
};

export {drawSentence};