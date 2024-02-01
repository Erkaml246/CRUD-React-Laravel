import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "../component/Loading";

function Albumedit() {
  
  let { AlbumID } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] =  useState(true);
  const [inputErrorList, setInputErrorList] =  useState({});
  const [albums, setAlbums] = useState({});


  useEffect(() => {
  
    axios.get(`http://localhost:8000/api/album/${AlbumID}/edit`).then(res => {
            console.log(res)
            setAlbums(res.data.album);
            setLoading(false);
        });

  }, [AlbumID]);
  
  const handleInput = (e) => {
    e.persist();
    setAlbums({ ...albums, [e.target.name]: e.target.value });
  }

  const simpan = (e) => {
    e.preventDefault();
  
    setLoading(true);
    const data = {
      NamaAlbum: albums.NamaAlbum,
      Deskripsi: albums.Deskripsi,
      Keterangan: albums.Keterangan,
      jenis_album: albums.jenis_album,
    };
  
    axios.put(`http://localhost:8000/api/album/${AlbumID}`, data)
      .then(res => {
        alert(res.data.message);
        setLoading(false);
        navigate('/albums');
      })
      .catch(function (error) {

        if(error.response) {
            if (error.response.status === 422) {
                setInputErrorList(error.response.data.errors)
                setLoading(false);
            }
            if (error.response.status === 404) {
                alert(error.response.data.message)
                setLoading(false);
            }
            if (error.response.status === 500) {
                alert(error.response.data)
                setLoading(false);
            }
        }
    });
  }
  

  if (loading) {
    return <Loading />
  }

  if(Object.keys(albums).length === 0){

    return (
        <div className="container">
            <h4>ID album tidak ditemukan!</h4>
        </div>
    )
  }


  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md-12"><br />
            <div className="card">
              <div className="card-header">
                <h4>Edit Data Album
                  <Link to="/albums" className="btn btn-danger float-end">Kembali</Link>
                </h4>
              </div>
              <div className="card-body">
                <form onSubmit={simpan}>
                    <div className="mb-3">
                        <label className="form-label">Nama Album</label>
                        <input type="text" name="NamaAlbum" onChange={handleInput} value={albums.NamaAlbum} className="form-control" />
                        <span className="text-danger">{inputErrorList.NamaAlbum}</span>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Deskripsi</label>
                        <input type="text" name="Deskripsi" onChange={handleInput} value={albums.Deskripsi} className="form-control" />
                        <span className="text-danger">{inputErrorList.Deskripsi}</span>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Keterangan</label>
                        <input type="text" name="Keterangan" onChange={handleInput} value={albums.Keterangan} className="form-control" />
                        <span className="text-danger">{inputErrorList.Keterangan}</span>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Jenis Album</label>
                        <input type="text" name="jenis_album" onChange={handleInput} value={albums.jenis_album} className="form-control" />
                        <span className="text-danger">{inputErrorList.jenis_album}</span>
                    </div>
                    <div>
                        <button type="submit" className="btn btn-primary">Simpan</button>
                    </div>
                   
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Albumedit;