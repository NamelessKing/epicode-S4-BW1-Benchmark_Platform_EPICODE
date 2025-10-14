const moreInfo = document.querySelector("button");
moreInfo.addEventListener("click", function () {
  location.reload();
});
document.addEventListener('keydown', function(event) {
  if (event.key === "Enter") {
    location.reload(); 
  }
});