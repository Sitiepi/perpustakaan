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
const bukuCollection = collection(db, "buku")
  
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

  
export async function tampilkanDaftarBuku() {
  // ambil snapshot data dari koleksi tanaman
  const snapshot = await getDocs(bukuCollection)
  
  // ambil element tabel data
  const tabel = document.getElementById("tabelData")
  
  // ambil element tabel data
  
  
  //kosongkan isi tablel 
  tabel.innerHTML = ""
  
  //loop setiap dokumen dalam snapshot
  snapshot.forEach((doc) => {
    // variabel untuk menyimpan data 
    const data = doc.data()
    const id = doc.id
    
    // buat element baris baru
    const baris = document.createElement("tr")
    
    const  no = document.createElement("td")
    no.textContent = tabel.rows.length + 1
    
    //buat element kolom untuk nama tanaman 
    const judulbuku = document.createElement("td")
    judulbuku.textContent = data.judulbuku
    
    //buat element kolom untuk warna 
    const penulis = document.createElement("td")
    penulis.textContent = data.penulis
    
    // buat kolom jenis
    const penerbit = document.createElement("td")
    penerbit.textContent = data.penerbit
    
    // buat element kolom untuk Aksi
    const aksi = document.createElement("td")
    
        // buat tombol edit
    const tombolEdit = document.createElement("a")
    tombolEdit.textContent = "Edit"
    tombolEdit.href = "edit.html?id=" + id
    tombolEdit.className = "button edit"
    
    //buat tombol hapus
    const tombolHapus = document.createElement("button")
    tombolHapus.textContent = "Hapus"
    tombolHapus.className = "button delete"
    tombolHapus.onclick = async () => {
      await hapusBuku(id)
    }
    
        //tambahkan element ke dalam kolom aksi
    aksi.appendChild(tombolEdit)
    aksi.appendChild(tombolHapus)
    
    //tambah kolom kedalam baris
    baris.appendChild(no)
    baris.appendChild(judulbuku)
    baris.appendChild(penulis)
    baris.appendChild(penerbit)
    baris.appendChild(aksi)
    
    //tambahkan baris kedalam tabel
    tabel.appendChild(baris)
  })
}

export async function tambahDataBuku() {
  //ambil nilai dari form
  const judulbuku = document.getElementById('judulbuku').value
  const penulis = document.getElementById('penulis').value
  const penerbit = document.getElementById('penerbit').value
  //tambahkan data ke firestore
  await addDoc(bukuCollection, {
    judulbuku: judulbuku,
    penulis: penulis,
    penerbit: penerbit
  })
  
  //alihkan ke halaman daftar barang
  window.location.href = 'admin.html'
}

export async function daftarBukuPublik() {
  
}