import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../component/Loading";

function Foto() {
  const [loading, setLoading] =useState([true]);
  const [foto, setfoto] =useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/foto').then(res => {
      console.log(res)
      setfoto(res.data.foto);
      setLoading(false);
    });
  }, [])

  const deleteFoto = (e, FotoID) => {
    e.preventDefault();

    const thisClicked = e.currentTarget;
    thisClicked.innerText = "Menghapus...";

    axios.delete(`http://localhost:8000/api/foto/${FotoID}/delete`)
      .then(res => {
        alert(res.data.message);
        thisClicked.closest("tr").remove();
      })
      .catch(function (error) {
        if (error.response) {
         if (error.response.status === 404) {
          alert(error.response.data.message);
          setLoading(false);
         }
         if (error.response.status === 500) {
          alert(error.response.data);
          setLoading(false);
         }
        }
      });
  }
  

  if (loading) {
    return (
      <Loading />
    )
  }

  var fotoDetails = "";
  fotoDetails = foto.map( (item, index) => {
    return(
      <tr key={index}>
            <td>{item.FotoID}</td>
            <td>{item.JudulFoto}</td>
            <td>{item.DeskripsiFoto}</td>
            <td>{item.TanggalUnggah}</td>
            <td>{item.LokasiFile}</td>
            <td>{item.AlbumID}</td>
            <td>{item.id_user}</td>
            <td>
          <Link to={`/fotos/${item.FotoID}/edit`} className="btn btn-success">Edit</Link>
        </td>
        <td>
          <button type="button" onClick={(e) => deleteFoto(e, item.FotoID)} className="btn btn-danger">Hapus</button>
        </td>
      </tr>
    )
    })

    return (
        <div className="container">
          <div className="row">
            <div className="col-md-12"><br />
              <div className="card">
                <div className="card-header">
                  <h4>Data Foto
                    <Link to="/fotos/create" className="btn btn-primary float-end">Add</Link>
                  </h4>
                </div>
                <div className="card-body">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Judul</th>
                        <th>Deskripsi</th>
                        <th>Tanggal</th>
                        <th>Lokasi</th>
                        <th>Album</th>
                        <th>ID User</th>
                        <th>Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {fotoDetails}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    };
    

export default Foto;