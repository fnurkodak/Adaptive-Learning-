import { login } from "./api.js";

document.getElementById("loginBtn").onclick = async () => {
  try {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    const user = await login(email, password);

    if (user.role === "student") window.location.href = "./student-dashboard.html";
    else window.location.href = "./instructor-dashboard.html";
  } catch (e) {
    alert(e.message);
  }
};
