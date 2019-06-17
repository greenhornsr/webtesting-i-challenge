module.exports = {
  succeed,
  fail,
  repair,
  get,
};

function succeed(item) {
  return { ...item };
}

function fail(item) {
  return { ...item };
}

// enhancer.repair should make durability 100
function repair(item) {
  return { ...item, durability: 100 };
}

function get(item) {
  return { ...item };
}
