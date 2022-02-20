import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import '../styles/Karyawan.css'

export default function Karyawan() {

    const navigate = useNavigate();
    const [dataKaryawan, setDataKaryawan] = useState();
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState();
    const [totalData, setTotalData] = useState();
    const [disableAfter, setDisableAfter] = useState(false);
    const [disableBefore, setDisableBefore] = useState(true);
    const [pageNumber, setPageNumber] = useState([]);
    useEffect(() => {
        axios.get('https://reqres.in/api/users', {
            params: {
                page: page,
            }
        })
        .then(res => {
            const dataRes = res.data.data;
            setDataKaryawan(dataRes);
            setTotalPage(res.data.total_pages);
            setTotalData(res.data.total);
            const arrPage = [];
            for (let i = 0; i < (res.data.total / dataRes.length); i++) {
                
                arrPage.push(i+1);
            };
            setPageNumber(arrPage);
        })
        .catch(e => {
            console.log(e);
        });
    }, []);

    const handleClickDelete = o => {
        window.alert(`Karyawan berhasil dihapus: ${o.first_name} ${o.last_name}`);
    }

    const handleClickEdit = (obj) => {
        navigate('/edit', {
            state: {
                id: obj.id,
                foto: obj.avatar,
                namaDepan: obj.first_name,
                namaBelakang: obj.last_name,
                email: obj.email,
            }
        });
    }

    const handleClickPageAfter = () => {
        if (totalPage >= page) {
            const nextPage = page + 1;
            setPage(nextPage);
            setDisableBefore(false);
            axios.get('https://reqres.in/api/users', {
            params: {
                page: nextPage,
            }
            })
            .then(res => {
                const dataRes = res.data.data;
                setDataKaryawan(dataRes);
                setTotalPage(res.data.total_pages);
            })
            .catch(e => {
                console.log(e);
            });
            if (nextPage === totalPage) {
                setDisableAfter(true);
            }
        } else {
            setDisableAfter(true);
            setDisableBefore(false);
        }
    }

    const handleClickPageBefore = () => {
        const beforePage = page - 1;
        setPage(beforePage);
        setDisableAfter(false);
        axios.get('https://reqres.in/api/users', {
            params: {
                page: beforePage,
            }
        })
        .then(res => {
            const dataRes = res.data.data;
            setDataKaryawan(dataRes);
            setTotalPage(res.data.total_pages);
        })
        .catch(e => {
            console.log(e);
        });
        if (beforePage === 1) {
            setDisableBefore(true);
            setDisableAfter(false);
        }
    }

    const handlePage = (obj) => {
        axios.get('https://reqres.in/api/users', {
            params: {
                page: obj,
            }
        })
        .then(res => {
            const dataRes = res.data.data;
            setDataKaryawan(dataRes);
            setTotalPage(res.data.total_pages);
            setTotalData(res.data.total);
            if (totalPage === obj) {
                setDisableAfter(true);
                setDisableBefore(false);
            } else if (obj === 1) {
                setDisableAfter(false);
                setDisableBefore(true);
            }
        })
        .catch(e => {
            console.log(e);
        });
    }

    return (
        <div className='karyawan-wrapper'>
            <a href="/tambah" className='button-add'><button>Tambah Karyawan</button></a>
            <table>
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>Foto</th>
                        <th>Nama Depan</th>
                        <th>Nama Belakang</th>
                        <th>Email</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                {
                    dataKaryawan && dataKaryawan.length ?
                    dataKaryawan.map((o, i) => {
                        return (
                            <tbody key={o.id}>
                                <tr >
                                    <td>{ (totalData / page) === totalData ? i + 1 : i + (dataKaryawan.length * page) - dataKaryawan.length + 1  }</td>
                                    <td><img src={o.avatar} alt="" /></td>
                                    <td>{ o.first_name }</td>
                                    <td>{ o.last_name }</td>
                                    <td>{ o.email }</td>
                                    <td>
                                        <div className='button-group'>
                                            <button className='button-edit' onClick={() => { handleClickEdit(o) }}>Change</button>
                                            <button className='button-delete' onClick={() => { if (window.confirm('Apakah anda yakin?')) handleClickDelete(o) }}>Delete</button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        )
                    })
                    
                    :
                    <p>No Data</p>
                }
            </table>
            {
                totalPage > 1 &&
                <div className='pagination'>
                <button className='page-before' disabled={disableBefore} onClick={() => { handleClickPageBefore() }}>Prev</button>
                {
                    pageNumber &&
                    pageNumber.map((o, i) => {
                        return (
                            <div className="pages">
                                <div className="pages-number" key={i}>
                                <button onClick={() => { handlePage(o) }}>{ o }</button>
                            </div>
                            </div>
                        )
                    })
                }
                <button className='page-after' disabled={disableAfter} onClick={() => { handleClickPageAfter() }}>Next</button>
                </div>
            }
        </div>
    )
}
