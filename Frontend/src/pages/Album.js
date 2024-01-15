import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../component/Loading";

function Album() {
  const [loading, setLoading] =useState([true]);
  const [albums, setAlbums] =useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/album').then(res => {
      console.log(res)
      setAlbums(res.data.albums);
      setLoading(false);
    });
  }, [])

  const deleteAlbum = (e, AlbumID) => {
    e.preventDefault();

    const thisClicked = e.currentTarget;
    thisClicked.innerText = "Menghapus...";

    axios.delete(`http://localhost:8000/api/album/${AlbumID}/delete`)
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

  var albumDetails = "";
  albumDetails = albums.map( (item, index) => {
    return(
      <tr key={index}>
        <td>{item.AlbumID}</td>
        <td>{item.NamaAlbum}</td>
        <td>{item.Deskripsi}</td>
        <td>{item.TanggalDibuat}</td>
        <td>{item.id_user}</td>
        <td>
          <Link to={`/albums/${item.AlbumID}/edit`} className="btn btn-success">Edit</Link>
        </td>
        <td>
          <button type="button" onClick={(e) => deleteAlbum(e, item.AlbumID)} className="btn btn-danger">Hapus</button>
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
              <h4>Data Album
                <Link to="/albums/create" className="btn btn-primary float-end">Add</Link>
              </h4>
            </div>
            <div className="card-body">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nama</th>
                    <th>Deskripsi</th>
                    <th>Tanggal</th>
                    <th>User</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {albumDetails}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Album;
