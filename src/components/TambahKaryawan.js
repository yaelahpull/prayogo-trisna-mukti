import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import '../styles/TambahKaryawan.css'

export default function TambahKaryawan() {

    const navigate = useNavigate();
    const [foto, setFoto] = useState();
    const [namaDepan, setNamaDepan] = useState();
    const [namaBelakang, setNamaBelakang] = useState();
    const [email, setEmail] = useState();
    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(foto);
        window.alert(
            `Karyawan berhasil ditambah!\n Nama Depan : ${namaDepan}\n Nama Belakang : ${namaBelakang}\n Email : ${email}\n Foto: ${foto}`
        );
        navigate('/');
    }

    return (
        <div className='tambah-wrapper'>
            <form onSubmit={(e) => { handleSubmit(e) }}>
                <label>Foto</label>
                <input type="file" 
                    name="foto" 
                    onChange={(e) => setFoto(e.target.value)} 
                />
                <label>Nama Depan</label>
                <input type="text" 
                    placeholder="Nama Depan" 
                    required
                    value={namaDepan} onChange={(e) => setNamaDepan(e.target.value)} 
                />
                <label>Nama Belakang</label>
                <input type="text" 
                    placeholder="Nama Belakang" 
                    required
                    value={namaBelakang} onChange={(e) => setNamaBelakang(e.target.value)} 
                />
                <label>Email</label>
                <input type="email" 
                    placeholder="Email" 
                    required
                    value={email} onChange={(e) => setEmail(e.target.value)} 
                />
                <button type="submit">Tambah</button>
            </form>
        </div>
    )
}
