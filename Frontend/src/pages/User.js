import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../component/Loading";

function User() {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/user')
      .then(res => {
        console.log(res);
        setUsers(res.data.user);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  const deleteUser = (e, id_user) => {
    e.preventDefault();

    const thisClicked = e.currentTarget;
    thisClicked.innerText = "Menghapus...";

    axios.delete(`http://localhost:8000/api/user/${id_user}/delete`)
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
    return <Loading />;
  }


  var userDetails = "";
  userDetails = users.map( (item, index) => {
    return(
      <tr key={index}>
            <td>{item.id_user}</td>
            <td>{item.Username}</td>
            <td>{item.Password}</td>
            <td>{item.Email}</td>
            <td>{item.NamaLengkap}</td>
            <td>{item.Alamat}</td>
        <td>
          <Link to={`/users/${item.id_user}/edit`} className="btn btn-success">Edit</Link>
        </td>
        <td>
          <button type="button" onClick={(e) => deleteUser(e, item.id_user)} className="btn btn-danger">Hapus</button>
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
              <h4>Data User
                <Link to="/users/create" className="btn btn-primary float-end">Add</Link>
              </h4>
            </div>
            <div className="card-body">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Username</th>
                    <th>Password</th>
                    <th>Email</th>
                    <th>Nama Lengkap</th>
                    <th>Alamat</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {userDetails}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default User;
