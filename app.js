// Mengimpor modul Express.js
const express = require('express')

// Menginisialisasi aplikasi Express
const app = express()
// Ubah ini sesuai dengan path file contact.js
const contactsData = require('./contact');


// Menentukan port yang akan digunakan
const port = 3000

app.use(express.static(__dirname))

// Mengatur EJS sebagai template engine
app.set('view engine', 'ejs')

// Menentukan direktori views (tempat file EJS disimpan)
// app.set('views', __dirname + '/views');


// Penanganan rute untuk halaman utama
app.get('/', (req, res) => {
    res.render('halaman utama', {
        namaWeb: "Rafi'ul Huda",
        title: 'Halo, ini adalah halaman utama!',
        message: 'Saat ini Saya sedang Mengikuti coding Training backend di sinarmas land'
    });
})

// Penanganan rute untuk halaman about
app.get('/about', (req, res) => {
    res.render('about', { title: "About" });
})
// Penanganan rute untuk halaman contact
app.get('/contact', (req, res) => {
    const contacts = contactsData.ambilDataKontak();
    res.render('contact', { 
        title: 'Kontak', 
        contacts: contacts 
    });
})


// Penanganan rute dinamis untuk produk dengan parameter 'id' dan query 'category'
app.get('/product/:id', (req, res) => {
    res.send(`Product id :  ${req.params.id} <br> Category id : ${req.query.Kategori}`)
})

// Penanganan rute untuk permintaan yang tidak cocok dengan rute lainnya (404 Not Found)
app.use('/', (req, res) => {
    res.status(404)
    res.send('page not found: 404')
})

// Server mendengarkan permintaan pada port yang telah ditentukan
app.listen(port, () => {
    // Pesan ini akan dicetak saat server berjalan
    console.log(`Server berjalan di http://localhost:${port}/`) 
})