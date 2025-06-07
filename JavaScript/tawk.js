
var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
(function(){
var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
s1.async=true;
s1.src='https://embed.tawk.to/68442a4e8d7770190c12c3d1/1it54ah8i';
s1.charset='UTF-8';
s1.setAttribute('crossorigin','*');
s0.parentNode.insertBefore(s1,s0);
})();



// tránh ẩn
  Tawk_API = Tawk_API || {};

  // Ngăn không cho widget bị ẩn hoàn toàn
  Tawk_API.onLoad = function () {
    // Nếu widget bị ẩn thì hiện lại
    Tawk_API.showWidget();
  };

  // Trong trường hợp widget bị ẩn bằng cách nào đó
  // luôn show lại sau 10 giây (dự phòng)
  setInterval(function () {
    if (typeof Tawk_API !== "undefined" && typeof Tawk_API.showWidget === "function") {
      Tawk_API.showWidget();
    }
  }, 10000);