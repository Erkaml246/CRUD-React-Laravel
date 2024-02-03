import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "../component/Loading";

function Fotoedit() {
  let { FotoID } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [inputErrorList, setInputErrorList] = useState({});
  const [foto, setFoto] = useState({});
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/foto/${FotoID}/edit`)
      .then(res => {
        setFoto(res.data.foto);
        setLoading(false);

        // Set image preview if LokasiFile is present
        if (res.data.foto.LokasiFile) {
          setImagePreview(`http://localhost:8000/${res.data.foto.LokasiFile}`);
        }
      })
      .catch(error => {
        console.error("Error fetching photo:", error);
      });
  }, [FotoID]);

  const handleInput = (e) => {
    e.persist();
    setFoto(prevFoto => ({ ...prevFoto, [e.target.name]: e.target.value }));
  };

  const handleFileInput = (e) => {
    e.persist();
    setFoto(prevFoto => ({ ...prevFoto, [e.target.name]: e.target.files[0] }));

    // Set image preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const simpan = (e) => {
    e.preventDefault();
  
    setLoading(true);
    const formData = new FormData();
    formData.append("JudulFoto", foto.JudulFoto);
    formData.append("DeskripsiFoto", foto.DeskripsiFoto);
    formData.append("LokasiFile", foto.LokasiFile);
  
    axios.put(`http://localhost:8000/api/foto/${FotoID}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then(res => {
        alert(res.data.message);
        setLoading(false);
        navigate('/foto');
      })
      .catch(function (error) {
        console.error("Error updating photo:", error.response);
        if (error.response) {
          if (error.response.status === 422) {
            setInputErrorList(error.response.data.errors);
          }
          if (error.response.status === 404) {
            alert(error.response.data.message);
          }
          if (error.response.status === 500) {
            alert(error.response.data);
          }
        }
        setLoading(false);
      });
  };
  
  

  if (loading) {
    return <Loading />;
  }

  if (Object.keys(foto).length === 0) {
    return (
      <div className="container">
        <h4>ID tidak ditemukan!</h4>
      </div>
    );
  }

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md-12"><br />
            <div className="card">
              <div className="card-header">
                <h4>Edit Data
                  <Link to="/fotos" className="btn btn-danger float-end">Kembali</Link>
                </h4>
              </div>
              <div className="card-body">
                <form onSubmit={simpan}>
                  <div className="mb-3">
                    <label className="form-label">Judul Foto</label>
                    <input type="text" name="JudulFoto" onChange={handleInput} value={foto.JudulFoto} className="form-control" />
                    <span className="text-danger">{inputErrorList.JudulFoto}</span>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Deskripsi Foto</label>
                    <input type="text" name="DeskripsiFoto" onChange={handleInput} value={foto.DeskripsiFoto} className="form-control" />
                    <span className="text-danger">{inputErrorList.DeskripsiFoto}</span>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="formFileSm" className="form-label">Lokasi</label>
                    {imagePreview && <img src={imagePreview} alt="Preview" style={{ maxWidth: "20%" }} />}
                    <input type="file" name="LokasiFile" onChange={handleFileInput} className="form-control form-control-sm" id="formFileSm" accept="image/*" />
                    <span className="text-danger">{inputErrorList.LokasiFile}</span>
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

export default Fotoedit;
