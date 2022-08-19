const id = "target";
const id2 = "target2";
const target = document.getElementById(id);
const target2 = document.getElementById(id2);
const targetElPath = getElPath(target);
const target2ElPath = getElPath(target2);

const counter = new Map([]);

countPath(targetElPath);
countPath(target2ElPath);

console.log(getTargetContainer());


function countPath(elPath){
  elPath.forEach(({el, layer})=>{
    if (counter.has(el)) {
      counter.get(el).count +=1;
    }else{
      counter.set(el, {
        el,
        layer,
        count: 1
      })
    }
  })
}

function getTargetContainer(){
  let maxCount = 0;
  let maxCountList = [];
  let maxLayer = 0;
  let containerElList = [];

  for (const [key, {el, layer, count}] of counter) {
    if (count > maxCount) {
      maxCount = count
    }
  }

  for (const [key, {el, layer, count}] of counter) {
    if (count === maxCount) {
      maxCountList.push({
        el, layer, count
      })
    }
  }

  maxLayer = Math.max(...maxCountList.map(item=>item.layer));
  containerElList = maxCountList.filter(item=>item.layer === maxLayer).map(item=> item.el);

  console.log(containerElList);
  // 暂时忽略计算出多个container的情况
  return containerElList[0]; 
}

// 取最多文本节点的那个容器节点
function getElPath(el) {
  const elPath = [];
  const path = [el];
  const searchEndEl = document.body;

  function search(el) {
    if (el.parentNode) {
      path.unshift(el.parentNode);
      if (el.parentNode !== searchEndEl) {
        search(el.parentNode);
      }
    }
  }
  search(el);

  path.forEach((element,index)=>{
    elPath.push({
      el: element,
      layer: index
    })
  })

  return elPath;
}
