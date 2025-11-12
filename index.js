const express = require('express')
const path = require('path')
const app = express()
const port = 3000

// --- BARU: Import mysql2 (gunakan versi promise) ---
const mysql = require('mysql2/promise');

// index.js - PERIKSA BAGIAN INI!
const dbConfig = {
    host: '127.0.0.1',
    port: 3309,
    user: 'root', // Ganti dengan user MySQL Anda
    password: '905.Nasywa', // Ganti dengan password MySQL Anda
    database: 'apikey', // <--- HARUS PERSIS SAMA DENGAN NAMA YANG ANDA BUAT
};


// --- BARU: Buat connection pool ---
// Pool lebih efisien untuk mengelola banyak koneksi
const pool = mysql.createPool(dbConfig);

// (Opsional) Fungsi untuk mengecek koneksi saat startup
async function checkDbConnection() {
    try {
        const connection = await pool.getConnection();
        console.log('Koneksi ke database MySQL berhasil.');
        connection.release(); // Kembalikan koneksi ke pool
    } catch (error) {
        console.error('Gagal terhubung ke database MySQL:', error.message);
        process.exit(1); // Keluar dari aplikasi jika DB gagal konek
    }
}
checkDbConnection(); // Jalankan pengecekan koneksi

// 1. Middleware untuk menyajikan file statis dari folder 'public'
app.use(express.static(path.join(__dirname, 'public')));

// 2. Handler untuk permintaan root ('/')
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})


app.listen(port, () => {
    console.log(`Server Express berjalan di http://localhost:${port}`)
})

