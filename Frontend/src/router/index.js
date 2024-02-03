import {Routes, Route} from 'react-router-dom';
import Home from '../pages/Home.js';
import Album from '../pages/Album.js';
import Login from '../pages/Login.js';
import Albumcreate from '../pages/Albumcreate.js';
import Albumedit from '../pages/Albumedit.js';
import Foto from '../pages/Foto.js';
import Fotocreate from '../pages/Fotocreate.js';
import Fotoedit from '../pages/Fotoedit.js';
import Fotodetail from '../pages/Fotodetail.js';
import User from '../pages/User.js';
import Usercreate from '../pages/Usercreate.js';
import Useredit from '../pages/Useredit.js';
import Register from '../pages/Register.js';



function Myrouter() {
    return(
        <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/login' element={<Login />}/>
            <Route path='/register' element={<Register />}/>
            <Route path='/albums' element={<Album />}/>
            <Route path='/albums/create' element={<Albumcreate />}/>
            <Route path='/albums/:AlbumID/edit' element={<Albumedit />}/>
            <Route path='fotos' element={<Foto />}/>
            <Route path='/fotos/create' element={<Fotocreate />}/>
            <Route path='/fotos/:FotoID/edit' element={<Fotoedit />}/>
            <Route path='/fotos/:FotoID' element={<Fotodetail />} />
            <Route path='/users' element={<User />}/>
            <Route path='/users/create' element={<Usercreate />}/>
            <Route path='/users/:id_user/edit' element={<Useredit />}/>
            
        </Routes>
    )
}
export default Myrouter;