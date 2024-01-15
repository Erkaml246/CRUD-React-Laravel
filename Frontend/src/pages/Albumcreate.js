import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../component/Loading";

function Albumcreate() {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [inputErrorList, setInputErrorList] = useState({});
    const [albums, setAlbums] = useState({
        NamaAlbum : '',
        Deskripsi : '',
        TanggalDibuat : '',
        id_user : '',
    })

    const handleInput = (e) => {
        e.persist();
        setAlbums({...albums, [e.target.name]: e.target.value});
    }

    const simpan = (e) => {
        e.preventDefault();

        setLoading(true);
        const data = {
            NamaAlbum: albums.NamaAlbum,
            Deskripsi: albums.Deskripsi,
            TanggalDibuat: albums.TanggalDibuat,
            id_user: albums.id_user,
        }

        axios.post('http://localhost:8000/api/album', data)
        .then(res => {
            alert(res.data.message);
            navigate('/albums')
            setLoading(false);
        })
        .catch(function (error) {
            if (error.response) {
                if (error.response.status === 422) {
                    setInputErrorList(error.response.data.errors)
                    setLoading(false);
                }
                if (error.response.status === 500) {
                    alert(error.response.data.errors)
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

    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-md-12"><br />
                    <div className="card">
                        <div className="card-header">
                        <h4>Tambah Data Album
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
                                    <label className="form-label">TanggalDibuat</label>
                                    <input type="date" name="TanggalDibuat" onChange={handleInput} value={albums.TanggalDibuat} className="form-control" />
                                    <span className="text-danger">{inputErrorList.TanggalDibuat}</span>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">ID User</label>
                                    <input type="text" name="id_user" onChange={handleInput} value={albums.id_user} className="form-control" />
                                    <span className="text-danger">{inputErrorList.id_user}</span>
                                </div>
                                <div className="mb-3">
                                <button type="submit" className="btn btn-primary">Simpan</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Albumcreate;