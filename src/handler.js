const { nanoid } = require('nanoid');
const notes = require('./notes');

const addNoteHandler = (request, h) => {
  const { title, tags, body } = request.payload;

  const id = nanoid(16);
  const createAt = new Date().toISOString();
  const updateAt = createAt;

  const newNote = {
    title, tags, body, id, createAt, updateAt,
  };
  notes.push(newNote);

  const isSuccess = notes.filter((note) => note.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil ditambahkan',
      data: {
        noteId: id,
      },
    });
    response.code(201);
    return response;
  }
  const response = h.response({
    status: 'fail',
    message: 'Catatan Gagal ditambahkan',
  });
  response.code(500);
  return response;
};

const getAllNotesHandler = () => ({
  status: 'success',
  data: {
    notes,
  },
});

const getNoteByIdHandler = (request, h) => {
  const { id } = request.params;
  // Setelah mendapatkan nilai id, dapatkan objek note dengan id tersebut dari objek array notes.
  // Manfaatkan method array filter() untuk mendapatkan objeknya.

  const note = notes.filter((n) => n.id === id)[0];

  // Kita kembalikan fungsi handler dengan data beserta objek note di dalamnya.
  // Namun sebelum itu, pastikan dulu objek note tidak bernilai undefined.
  // Bila undefined, kembalikan dengan respons gagal.

  if (note !== undefined) {
    return {
      status: 'success',
      data: {
        note,
      },
    };
  }

  const response = h.response({
    status: 'fail',
    message: 'catatan tidak ditemukan',
  });
  response.code(404);
  return response;
};

const editNoteByIdHandler = (request, h) => {
  const { id } = request.params;

  // Setelah itu, kita dapatkan data notes terbaru yang dikirimkan oleh client melalui body request.
  const { title, tags, body } = request.payload;

  // Selain itu, tentu kita perlu perbarui juga nilai dari properti updatedAt.
  // Jadi, dapatkan nilai terbaru dengan menggunakan new Date().toISOString().
  const updatedAt = new Date().toISOString();

  // Great! Data terbaru sudah siap, saatnya mengubah catatan lama dengan data terbaru.
  // Kita akan mengubahnya dengan memanfaatkan indexing array,
  // silakan gunakan teknik lain bila menurut Anda lebih baik yah.

  // Pertama, dapatkan dulu index array pada objek catatan sesuai id yang ditentukan.
  // Untuk melakukannya, gunakanlah method array findIndex().
  const index = notes.findIndex((note) => note.id === id);

  // Bila note dengan id yang dicari ditemukan,
  // maka index akan bernilai array index dari objek catatan yang dicari.
  // Namun bila tidak ditemukan, maka index bernilai -1. Jadi,
  // kita bisa menentukan gagal atau tidaknya permintaan dari nilai index menggunakan if else.
  if (index !== -1) {
    notes[index] = {
      ...notes[index],
      title,
      tags,
      body,
      updatedAt,
    };
    const response = h.response({
      status: 'success',
      message: 'Catatan Berhasil Diperbaharui',
    });
    response.code(200);
    return response;
  }
  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbaharui catatan. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

const deleteNoteByIdHandler = (request, h) => {
  // Pertama, kita dapatkan dulu nilai id yang dikirim melalui path parameters.
  const { id } = request.params;

  // Selanjutnya, dapatkan index dari objek catatan sesuai dengan id yang didapat.
  const index = notes.findIndex((note) => note.id === id);

  // Lakukan pengecekan terhadap nilai index, pastikan nilainya tidak -1 bila hendak
  // menghapus catatan.
  // Nah, untuk menghapus data pada array berdasarkan index, gunakan method array splice()
  if (index !== -1) {
    notes.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Catatan Berhasil dihapus',
    });
    response.code(200);
    return response;
  }
  const response = h.response({
    status: 'fail',
    message: 'Catatan gagal dihapus, id tidak ditemukan',
  });
  response.code(404);
  return response;
};

module.exports = {
  addNoteHandler,
  getAllNotesHandler,
  getNoteByIdHandler,
  editNoteByIdHandler,
  deleteNoteByIdHandler,
};