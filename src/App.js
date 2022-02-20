import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import EditKaryawan from './components/EditKaryawan';
import Karyawan from './components/Karyawan';
import TambahKaryawan from './components/TambahKaryawan';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <a href="/"><h1>Data Karyawan</h1></a>
        </header>
        <body>
        <Routes>
          <Route path='/' element={ <Karyawan /> } />
          <Route path='/tambah' element={ <TambahKaryawan /> } />
          <Route path='/edit' element={ <EditKaryawan /> } />
        </Routes>
        </body>
      </div>
    </BrowserRouter>
  );
}

export default App;
