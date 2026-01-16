import { MOCK_MODE, BASE_URL } from "./config.js";

const mockUsers = [
  { email: "student@mail.com", password: "1234", role: "student", name: "Test Student" },
  { email: "instructor@mail.com", password: "1234", role: "instructor", name: "Test Instructor" }
];

export async function login(email, password) {
  if (MOCK_MODE) {
    const u = mockUsers.find(x => x.email === email && x.password === password);
    if (!u) throw new Error("Wrong email or password.");

    localStorage.setItem("token", "mock-token");
    localStorage.setItem("role", u.role);
    localStorage.setItem("name", u.name);
    return { token: "mock-token", role: u.role, name: u.name };
  }

  // backend geldiğinde:
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type":"application/json" },
    body: JSON.stringify({ email, password })
  });
  if (!res.ok) throw new Error("Login failed");
  const data = await res.json();

  localStorage.setItem("token", data.token);
  localStorage.setItem("role", data.role);
  localStorage.setItem("name", data.name);
  return data;
}
