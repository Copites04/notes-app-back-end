const Hapi = require('@hapi/hapi');
const routes = require('./routes');

// Good news! Penerapannya akan jauh lebih mudah bila Anda menggunakan Hapi.
// Dengan Hapi, CORS dapat ditetapkan pada spesifik route dengan menambahkan properti options.cors
// di konfigurasi route.

// Pada web server, kita hanya perlu memberikan nilai header ‘Access-Control-Allow-Origin’
// dengan nilai origin luar yang akan mengkonsumsi datanya (aplikasi client).

/* Contoh Dengan NodeJS */
// const response = h.response({ error: false, message: 'Catatan berhasil ditambahkan' });
// response.header('Access-Control-Allow-Origin', 'http://ec2-13-212-153-62.ap-southeast-1.compute.amazonaws.com:8000/');
// return response;

const init = async () => {
  const server = Hapi.server({
    port: 5000,
    host: process.env.NODE_ENV !== 'production' ? 'localhost' : '172.31.42.193',
    // Cross-origin resource sharing (CORS).
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  server.route(routes);

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
