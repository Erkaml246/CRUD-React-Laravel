import { useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import axios from "axios";
import Loading from "../component/Loading";

function FotoCreate() {

    const navigate = useNavigate();
    
    const [loading, setLoading] =  useState(false);
    const [inputErrorList, setInputErrorList] =  useState({});
    const [foto, setFoto] = useState({
        JudulID: '',
        DeskripsiFoto: '',
        TanggalUnggah: '',
        LokasiFile: null, // Use null instead of an empty string
        AlbumID: '',
        id_user: ''
    });
    const [imagePreview, setImagePreview] = useState('');
    

    const handleInput = (e) => {
        e.persist();
        if (e.target.name === 'LokasiFile') {
            const file = e.target.files[0];
            setFoto({ ...foto, LokasiFile: file });
            if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setImagePreview(reader.result);
                };
                reader.readAsDataURL(file);
            } else {
                setImagePreview('');
            }
        } else {
            setFoto({ ...foto, [e.target.name]: e.target.value });
        }
    };
    


    const simpan = (e) => {
        e.preventDefault();
        setLoading(true);
    
        const formData = new FormData();
        formData.append("JudulFoto", foto.JudulFoto);
        formData.append("DeskripsiFoto", foto.DeskripsiFoto);
        formData.append("TanggalUnggah", foto.TanggalUnggah);
        formData.append("LokasiFile", foto.LokasiFile);
        formData.append("AlbumID", foto.AlbumID);
        formData.append("id_user", foto.id_user);
    
        axios.post('http://localhost:8000/api/foto', formData)
            .then(res => {
                alert(res.data.message);
                navigate('/fotos');
                setLoading(false);
            })
            .catch(function (error) {
                if (error.response) {
                    if (error.response.status === 422) {
                        console.error("Validation errors:", error.response.data.errors);
                        setInputErrorList(error.response.data.errors);
                    } else if (error.response.status === 500) {
                        console.error("Server error:", error.response.data.message);
                        alert(error.response.data.message);
                    }
                } else {
                    console.error("Network error:", error.message);
                    alert("Network error. Please try again.");
                }
                setLoading(false);
            });
    };
    
    

    if(loading){
        return (
            <Loading />
        )
    }

    return(
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-md-12"><br />
                    <div className="card">
                        <div className="card-header">
                        <h4>Tambah Data 
                            <Link to="/albums" className="btn btn-danger float-end">Kembali</Link>
                        </h4>
                        </div>
                        <div className="card-body">
                                <form onSubmit={simpan}>
                                    <div className="mb-3">
                                        <label>Judul Foto</label>
                                        <input type="text" name="JudulFoto" value={foto.JudulFoto} onChange={handleInput} className="form-control"  />
                                        <span className="text-danger">{inputErrorList.JudulFoto}</span>
                                    </div>
                                    <div className="mb-3">
                                        <label>Deskripsi Foto</label>
                                        <input type="text" name="DeskripsiFoto" value={foto.DeskripsiFoto} onChange={handleInput} className="form-control"  />
                                        <span className="text-danger">{inputErrorList.DeskripsiFoto}</span>
                                    </div>
                                    <div className="mb-3">
                                        <label>Tanggal Unggah</label>
                                        <input type="date" name="TanggalUnggah" value={foto.TanggalUnggah} onChange={handleInput} className="form-control" />
                                        <span className="text-danger">{inputErrorList.TanggalUnggah}</span>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="formFileSm" className="form-label">Lokasi</label>
                                        {imagePreview && <img src={imagePreview} alt="Preview" style={{ maxWidth: "20%" }} />}
                                        <input type="file" name="LokasiFile" onChange={handleInput} className="form-control form-control-sm" id="formFileSm" />
                                        <span className="text-danger">{inputErrorList.LokasiFile}</span>
                                    </div>

                                    <div className="mb-3">
                                        <label>Album ID</label>
                                        <input type="text" name="AlbumID" value={foto.AlbumID} onChange={handleInput} className="form-control"  />
                                        <span className="text-danger">{inputErrorList.AlbumID}</span>
                                    </div>
                                    <div className="mb-3">
                                        <label>User ID</label>
                                        <input type="text" name="id_user" value={foto.id_user} onChange={handleInput} className="form-control" />
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

export default FotoCreate;