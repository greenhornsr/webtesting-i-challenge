module.exports = {
  succeed,
  fail,
  repair,
  get,
};

// defining item type expected
const itemType = (item) => {
  return typeof item === 'object' &&
  typeof(item.name) === 'string' &&
  typeof(item.durability) === 'number' &&
  typeof(item.enhancement) === 'number' ?
  true : false
}

function succeed(item) {
  return (item) && 
  itemType(item) ?
    (item.enhancement === 20) ? 
    ({ ...item, enhancement: item.enhancement })
    : 
    (item.enhancement >= 0) && (item.enhancement <= 20) ?
    ({ ...item, enhancement: item.enhancement +=1 }):false
  :false
}

// ternary conditionals
function fail(item) {
  return (item) && 
  itemType(item) ?
    (item.enhancement >= 16) ? 
    (item.durability >= 0 ) && (item.durability <= 10) ? 
        ({...item, enhancement: item.enhancement -= 1, durability: item.durability -= item.durability})
        :
        ({ ...item, enhancement: item.enhancement -= 1, durability: item.durability -=10 })
    : 
    (item.enhancement >= 15) ?
      (item.durability >= 0 ) && (item.durability <= 10) ? 
        ({...item, durability: item.durability -= item.durability})
        :
        ({ ...item, durability: item.durability -=10 })
    :
    (item.enhancement < 15) ?
      (item.durability >= 0) && (item.durability <= 5) ? 
      ({...item, durability: item.durability -= item.durability})
      :
      ({ ...item, durability: item.durability -= 5 })
    :false
  :false
}

// Standard conditional fail check
// function fail(item) {
//   if(item && itemType(item)){
//     if(item.enhancement >= 16){
//       return ({ ...item, enhancement: item.enhancement -= 1, durability: item.durability -= 10})
//     }else if(item.enhancement >= 15){
//         if(item.durability >= 0 && item.durability <= 10){
//           return ({...item, durability: item.durability -= item.durability})
//         }else{
//           return ({ ...item, durability: item.durability -=10 })
//       }
//     }else{
//       if(item.durability >= 0 && item.durability <= 5){
//         return ({...item, durability: item.durability -= item.durability})
//       }else{
//         return ({ ...item, durability: item.durability -= 5 })
//       }
//     }
//   } 
// }

// enhancer.repair should make durability 100
function repair(item) {
  return (item) && 
  (Number.isInteger(item.durability)) && 
  (item.durability >= 0) && 
  (item.durability <= 100) ? 
  { ...item, durability: 100 }
  : 
  false
}

function get(item) {
  return { ...item };
}
