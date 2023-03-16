var map = document.querySelector(".map");

document.addEventListener("keydown", (e) => {
  let val = 0;
  switch (e.keyCode) {
    case 37:
      val = parseInt(map.style.left, 10);
      map.style.left = val + 20 + "px";
      break;
    case 38:
      val = parseInt(map.style.top, 10);
      map.style.top = val + 20 + "px";
      break;
    case 39:
      val = parseInt(map.style.left, 10);
      map.style.left = val - 20 + "px";
      break;
    case 40:
      val = parseInt(map.style.top, 10);
      map.style.top = val - 20 + "px";
      break;

    default:
      break;
  }
});
