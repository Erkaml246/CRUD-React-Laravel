import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "../component/Loading";

function Useredit() {
  
  let { id_user } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] =  useState(true);
  const [inputErrorList, setInputErrorList] =  useState({});
  const [users, setUsers] = useState({});


  useEffect(() => {
  
    axios.get(`http://localhost:8000/api/user/${id_user}/edit`).then(res => {
            console.log(res)
            setUsers(res.data.user);
            setLoading(false);
        });

  }, [id_user]);
  
  const handleInput = (e) => {
    e.persist();
    setUsers({ ...users, [e.target.name]: e.target.value });
  }

  const simpan = (e) => {
    e.preventDefault();
  
    setLoading(true);
    const data = {
      Username: users.Username,
      Password: users.Password,
      Email: users.Email,
      NamaLengkap: users.NamaLengkap,
      Alamat: users.Alamat
    };
  
    axios.put(`http://localhost:8000/api/user/${id_user}`, data)
      .then(res => {
        alert(res.data.message);
        setLoading(false);
        navigate('/users');
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

  if(Object.keys(users).length === 0){

    return (
        <div className="container">
            <h4>ID user tidak ditemukan!</h4>
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
                <h4>Edit Data User
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
                        <input type="text" name="Password" onChange={handleInput} value={users.Password} className="form-control" />
                        <span className="text-danger">{inputErrorList.Password}</span>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input type="text" name="Email" onChange={handleInput} value={users.Email} className="form-control" />
                        <span className="text-danger">{inputErrorList.Email}</span>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">NamaLengkap</label>
                        <input type="text" name="NamaLengkap" onChange={handleInput} value={users.NamaLengkap} className="form-control" />
                        <span className="text-danger">{inputErrorList.NamaLengkap}</span>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Alamat</label>
                        <input type="text" name="Alamat" onChange={handleInput} value={users.Alamat} className="form-control" />
                        <span className="text-danger">{inputErrorList.Alamat}</span>
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

export default Useredit;
