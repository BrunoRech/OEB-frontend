export const removeSpecialChars = string => {
  return string ? string.replace(/[^\d]+/g, '') : '';
};

export const formatBigText = (text, maxSize) => {
  if (text && text.length > maxSize) {
    const firstHalf = text.slice(0, maxSize + 1);
    const secondHalf = text.slice(maxSize + 1, text.length);
    const emptyIndex = secondHalf.search(' ');
    const finalText = emptyIndex > 0 ? secondHalf.slice(0, emptyIndex) : secondHalf;
    return firstHalf.concat(finalText).concat('...');
  }
  return text;
};
