import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../component/Loading";

function Usercreate() {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [inputErrorList, setInputErrorList] = useState({});
    const [users, setUser] = useState({
        Username : '',
        Password : '',
        Email : '',
        NamaLengkap : '',
        Alamat : ''
    })

    const handleInput = (e) => {
        e.persist();
        setUser({...users, [e.target.name]: e.target.value});
    }

    const simpan = (e) => {
        e.preventDefault();

        setLoading(true);
        const data = {
            Username: users.Username,
            Password: users.Password,
            Email: users.Email,
            NamaLengkap: users.NamaLengkap,
            Alamat: users.Alamat,
        }

        axios.post('http://localhost:8000/api/user', data)
        .then(res => {
            alert(res.data.message);
            navigate('/users')
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
                            <Link to="/users" className="btn btn-danger float-end">Kembali</Link>
                        </h4>
                        </div>
                        <div className="card-body">
                            <form onSubmit={simpan}>
                                <div className="mb-3">
                                    <label className="form-label">Username</label>
                                    <input type="text" name="Username" onChange={handleInput} value={users.Username} className="form-control" />
                                    <span className="text-danger">{inputErrorList.Username}</span>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Password</label>
                                    <input type="password" name="Password" onChange={handleInput} value={users.Password} className="form-control" />
                                    <span className="text-danger">{inputErrorList.Password}</span>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Email</label>
                                    <input type="email" name="Email" onChange={handleInput} value={users.Email} className="form-control" />
                                    <span className="text-danger">{inputErrorList.Email}</span>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Nama Lengkap</label>
                                    <input type="text" name="NamaLengkap" onChange={handleInput} value={users.NamaLengkap} className="form-control" />
                                    <span className="text-danger">{inputErrorList.NamaLengkap}</span>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Alamat</label>
                                    <input type="text" name="Alamat" onChange={handleInput} value={users.Alamat} className="form-control" />
                                    <span className="text-danger">{inputErrorList.Alamat}</span>
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

export default Usercreate;