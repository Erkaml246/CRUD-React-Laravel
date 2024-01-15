import {Routes, Route} from 'react-router-dom';
import Album from '../pages/Album.js';
import Albumcreate from '../pages/Albumcreate.js';
import Albumedit from '../pages/Albumedit.js';
import Foto from '../pages/Foto.js';
import User from '../pages/User.js';



function Myrouter() {
    return(
        <Routes>
            <Route path='/albums' element={<Album />}/>
            <Route path='/albums/create' element={<Albumcreate />}/>
            <Route path='/albums/:AlbumID/edit' element={<Albumedit />}/>
            <Route path='/Foto' element={<Foto />}/>
            <Route path='/User' element={<User />}/>
            
        </Routes>
    )
}
export default Myrouter;