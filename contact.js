const fs = require('fs');
const readline = require('readline');
const validator = require('validator');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const dataPath = './data/contacts.json';

const buatFolderDanFile = () => {
    if (!fs.existsSync('./data')) {
        fs.mkdirSync('./data');
        console.log("folder anda sudah dibuat")
    } else {
        console.log("Folder anda sudah ada")
    }

    if (!fs.existsSync(dataPath)) {
        fs.writeFileSync(dataPath, '[]');
        console.log('File contacts.json berhasil dibuat.');
    } else {
        console.log('File contacts.json sudah ada.');
    }
};

const simpanDataKeJSON = (data) => {
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
};

const tambahDataKeJSON = (nama, mobile) => {
    buatFolderDanFile();
    const existingData = JSON.parse(fs.readFileSync(dataPath));
    existingData.push({ nama, mobile });
    simpanDataKeJSON(existingData);
    console.log(`Nama saya adalah ${nama}, nomor telepon saya adalah ${mobile}. Thank You!!`);
    console.log(`Data anda telah disimpan. Terima kasih!`);
    rl.close();
};

function inputNama() {
    rl.question("Masukkan nama anda ? ", (inputNama) => {
        if (validator.isLength(inputNama, { min: 3, max: 50 })) {
            const nama = inputNama;
            inputNomorHandphone(nama);
        } else {
            console.log("Nama harus memiliki panjang minimal 3 karakter dan maksimal 50 karakter. Silakan coba lagi.");
            inputNama();
        }
    });
}

function inputNomorHandphone(nama) {
    rl.question("Masukkan Nomor Handphone anda ? ", (inputHandphone) => {
        if (validator.isMobilePhone(inputHandphone, "any")) {
            const mobile = inputHandphone;
            tambahDataKeJSON(nama, mobile);
        } else {
            console.log("Nomor Handphone tidak valid. Silakan coba lagi.");
            inputNomorHandphone(nama);
        }
    });
}

const ambilDataKontak = () => {
    const data = fs.readFileSync('./data/contacts.json', 'utf8');
    return JSON.parse(data);
};

module.exports = {
    ambilDataKontak,
    inputNama
};