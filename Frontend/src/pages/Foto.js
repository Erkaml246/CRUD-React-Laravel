import { Link } from "react-router-dom";

function Foto() {
    return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12"><br />
                        <div className="card">
                            <div className="card-header">
                                <h4>Data Foto
                                <Link to="/" className="btn btn-primary float-end">Add</Link>
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
                                            <th>Edit</th>
                                            <th>Hapus</th>
                                        </tr>
                                    </thead>
                                    {/* Tambahkan elemen <tbody>, <tr>, dan <td> sesuai dengan data */}
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default Foto;