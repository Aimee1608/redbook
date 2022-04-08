let pageWidth = window.innerWidth,
  pageHeight = window.innerHeight;
if (typeof pageWidth != "number") {
  if (document.compatMode == "CSS1Compat") {
    pageWidth = document.documentElement.clientWidth;
    pageHeight = document.documentElement.clientHeight;
  } else {
    pageWidth = document.body.clientWidth;
    pageHeight = document.body.clientHeight;
  }
}

let num = 0;
let max = 10;
let incrementNumber = function () {
  num++;
  // 如果还没有达到最大值，再设置一个超时任务 
  if (num < max) {
    setTimeout(incrementNumber, 500);
  } else {
    alert("Done");
  }
}
setTimeout(incrementNumber, 500);

