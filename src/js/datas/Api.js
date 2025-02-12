const BASE_URL = "https://notes-api.dicoding.dev/v2";

class Api {
  getAllUnarchivedNotes = async () => {
    try {
      const res = await fetch(`${BASE_URL}/notes`);
      const datas = await res.json();
      return datas.data;
    } catch (error) {
      console.log(error);
    }
  };

  getAllArchivedNotes = async () => {
    try {
      const res = await fetch(`${BASE_URL}/notes/archived`);
      const datas = await res.json();
      return datas.data;
    } catch (error) {
      console.log(error);
    }
  };

  getNoteById = async (id) => {
    try {
      const res = await fetch(`${BASE_URL}/notes/${id}`);
      const data = await res.json();
      return data;
    } catch (error) {
      return error;
    }
  };

  storeNotes = async (notes) => {
    try {
      console.log(notes);
      const res = await fetch(`${BASE_URL}/notes`, {
        body: JSON.stringify({ title: notes.title, body: notes.body }),
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      return data;
    } catch (error) {
      return error;
    }
  };

  archieveNotes = async (id) => {
    try {
      const res = await fetch(`${BASE_URL}/notes/${id}/archive`, {
        method: "POST",
      });
      const data = await res.json();
      return data;
    } catch (error) {
      return error;
    }
  };

  unArchieveNotes = async (id) => {
    try {
      const res = await fetch(`${BASE_URL}/notes/${id}/unarchive`, {
        method: "POST",
      });
      const data = await res.json();
      return data;
    } catch (error) {
      return error;
    }
  };

  deleteNoteById = async (id) => {
    try {
      const res = await fetch(`${BASE_URL}/notes/${id}`, {
        method: "DELETE",
      });
      const datas = await res.json();
      return datas.data;
    } catch (error) {
      return error;
    }
  };
}

export default Api;
