# REST API - TOKO 

Contoh REST API dengan menggunakan Nodejs, Express, & Sequelize


## Installasi

1. Lakukan konfigurasi database pada file **config/config.json**
2. Eksekusi perintah berikut untuk membuat database, table dan migrasi data : 


    **npx sequelize db:create** <-- membuat database

    **npx sequelize db:migrate** <-- migrasi tabel

    **npx sequelize db:seed:all** <-- mengisi data default


    Jika ingin menjalankan seed untuk file tertentu maka lakukan peirntah ini : 
    
    **npx sequelize db:seed --seed {path_file}**
