// Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  getDoc,
  query,
  where
} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";

// GANTI DENGAN FIREBASE CONFIG ANDA
const firebaseConfig = {
  apiKey: "AIzaSyDgGanI0xfwbMbF2Q20eftio7Hc6iyPVgI",
  authDomain: "insancemerlang-e9c87.firebaseapp.com",
  projectId: "insancemerlang-e9c87",
  storageBucket: "insancemerlang-e9c87.firebasestorage.app",
  messagingSenderId: "1009245252263",
  appId: "1:1009245252263:web:637bfe528eddfc0dc18982"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const tanamanCollection = collection(db, "tanaman")
  
  export async function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const q = query(
      collection(db,"users"),
      where("username","==",username),
      where("password","==", password)
    )
  const querySnapshot = await getDocs(collection(db, "users"));

  let found = false;

  querySnapshot.forEach((doc) => {
    const data = doc.data();

    if (data.username === username && data.password === password) {
      found = true;
    }
  });

  if (found) {
    document.getElementById("status").innerText = "Login berhasil";
    // redirect
    window.location.href = "admin.html";
  } else {
    document.getElementById("status").innerText = "Username atau password salah";
  }
  }
  
  //  fungsi untuk logout 
export function logout() {
  // hapus status login dari localstorage
  localStorage.removeItem("isLogin")
  
  // redirect ke halaman login
  window.location.href = "login.html"
}
