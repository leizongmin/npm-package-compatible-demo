function readFileSync(name) {
  return `cannot read file: ${name}`;
}

module.exports = {
  readFileSync,
};
