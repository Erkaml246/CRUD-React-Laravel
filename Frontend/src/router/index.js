import {Routes, Route} from 'react-router-dom';
import Album from '../pages/Album.js';
import Albumcreate from '../pages/Albumcreate.js';
import Albumedit from '../pages/Albumedit.js';
import Foto from '../pages/Foto.js';
import User from '../pages/User.js';
import Usercreate from '../pages/Usercreate.js';
import Useredit from '../pages/Useredit.js';



function Myrouter() {
    return(
        <Routes>
            <Route path='/albums' element={<Album />}/>
            <Route path='/albums/create' element={<Albumcreate />}/>
            <Route path='/albums/:AlbumID/edit' element={<Albumedit />}/>
            <Route path='/Foto' element={<Foto />}/>
            <Route path='/users' element={<User />}/>
            <Route path='/users/create' element={<Usercreate />}/>
            <Route path='/users/:id_user/edit' element={<Useredit />}/>
            
        </Routes>
    )
}
export default Myrouter;