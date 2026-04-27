const isLogin = localStorage.getItem("isLogin")

if (isLogin !== "true"){
  window.location.href = "login.html"
}