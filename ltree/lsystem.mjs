const calc = (sentence, rules, steps = 0) => {
  if (steps === 0) return sentence;

  let nextSentence = '';
  for (let i = 0; i < sentence.length; i++) {
    const c = sentence.charAt(i);

    const rule = rules.get(c);
    if (rule)
      nextSentence += rule;
    else
      nextSentence += c;
  }

  return calc(nextSentence, rules, steps - 1);
};

export {calc};