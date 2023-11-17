import React, { useEffect, useState } from 'react'
import axios from 'axios'
import '../../styles/customer-form.css'
import moment from 'moment/moment';
import { isEmptyOrNil } from '../../common';

export const EnumTypeGender = {
    male: 'Nam',
    female: 'Nữ',
    other: 'Khác',
}

const CustomerForm = ({ cardToCheckOut, handleLoading }) => {

    const [name, setNameChange] = useState('')
    // const [email, setEmailChange] = useState('')
    const [phone, setPhoneChange] = useState('')
    // const [active, setActiveChange] = useState(true)
    const [gender, setGender] = useState(EnumTypeGender.male);
    const [validation, setValidationChange] = useState(false)
    const [provinceList, setProvinceList] = useState([])
    const [districtList, setDistrictList] = useState([])
    const [wardList, setWardList] = useState([])
    const [provinceid, setProvinceid] = useState('');
    const [districtid, setDistrictId] = useState('');
    const [wardid, setWardId] = useState('');
    const [selectProvince, setSelectProvince] = useState('');
    const [selectDistrict, setSelectDistrict] = useState('');
    const getTimeNow = moment(new Date()).format('DD/MM/YYYY, h:mm:ss a')

    /* #region: Province */
    useEffect(() => {
        const fetchDataProvinces = async () => {
            return await new Promise((resolve, reject) => {
                const data = axios.get(`https://provinces.open-api.vn/api/p/`)
                    .then((response) => {
                        try {
                            if (data) {
                                // console.log('provinceList', response.data);
                                setProvinceList(response.data)
                                resolve(response)
                            } else {
                                console.log('Cannot get data');
                                reject()
                            }
                        } catch (error) {
                            reject(error)
                        }
                    })
            })
        }
        fetchDataProvinces()
    }, []);

    const handlecountry = (e) => {
        const getcountryid = e.target.value;
        setSelectProvince(e.target.value)
        setProvinceid(getcountryid);
    }
    /* #endregion */

    /* #region: District */
    useEffect(() => {
        const fetchDataDistrict = async () => {
            return await new Promise((resolve, reject) => {
                const data = axios.get(`https://provinces.open-api.vn/api/d/`)
                    .then((response) => {
                        try {
                            if (data) {
                                const dataDistrict = response.data.filter((i) => i.province_code === parseInt(provinceid))
                                // console.log('dataDistrict', dataDistrict);
                                setDistrictList(dataDistrict)
                                resolve(response)
                            } else {
                                console.log('Cannot get data');
                                reject()
                            }
                        } catch (error) {
                            reject(error)
                        }
                    })
            })
        }
        fetchDataDistrict()
    }, [provinceid])

    const handleDistrict = (e) => {
        const getstateid = e.target.value;
        setSelectDistrict(e.target.value)
        setDistrictId(getstateid);
    }
    /* #endregion */

    /* #region: Ward */
    useEffect(() => {
        const fetchDataWard = async () => {
            return await new Promise((resolve, reject) => {
                const data = axios.get(`https://provinces.open-api.vn/api/w/`)
                    .then((response) => {
                        try {
                            if (data) {
                                const dataWard = response.data.filter((i) => i.district_code === parseInt(districtid));
                                setWardList(dataWard)
                                resolve(response)
                            } else {
                                console.log('Cannot get data');
                                reject()
                            }
                        } catch (error) {
                            reject(error)
                        }
                    })
            })
        }
        fetchDataWard()
    }, [districtid])

    const handleWard = (e) => {
        const getstateid = e.target.value;
        setWardId(parseInt(getstateid));
    }
    /* #endregion */

    /* #region  handleSubmit checkout */
    const handleSubmit = (e) => {
        e.preventDefault()
        const filterProvince = provinceList.filter((i) => i.code === parseInt(selectProvince))
        const nameProvice = Object.assign({}, ...filterProvince)
        // console.log('selectProvince', nameProvice);

        const filterDistrict = districtList.filter((i) => i.code === parseInt(selectDistrict))
        const nameDistrict = Object.assign({}, ...filterDistrict)

        const filterWard = wardList.filter((i) => i.code === wardid)
        const nameWard = Object.assign({}, ...filterWard)

        // const fullAddress = nameProvice.name + ',' + nameDistrict.name + ',' + nameWard.name
        // console.log('full address', fullAddress);
        // console.log({ name, phone, gender, selectProvince: nameProvice.name, selectDistrict: nameDistrict.name, selectWard: nameWard.name, time:getTimeNow })

        const empData = { name, phone, gender, selectProvince: nameProvice.name, selectDistrict: nameDistrict.name, selectWard: nameWard.name, time: getTimeNow, card: cardToCheckOut }

        if (!isEmptyOrNil(empData)) {
            handleLoading(true)
            console.log(empData);
        } else {
            console.log('error to add new card');
        }
    }
    /* #endregion */

    const handleChangeGender = (e) => {
        setGender(e.target.value);
        // console.log(e.target.value);
    }

    return (
        <div className="container">
            <form className="form_container" onSubmit={handleSubmit}>
                <div className="card" style={{ textAlign: 'left' }}>
                    <div className="card-title">
                        <h2>Thông tin khách hàng</h2>
                    </div>
                    <div className="card-body">
                        <div className="col-lg-12">
                            <div className="form-input">

                                <div className="form-group">
                                    <label>Tên</label>
                                    <input value={name} onMouseDown={e => setValidationChange(true)} onChange={e => setNameChange(e.target.value)} className="form-control" />
                                    {name.length === 0 && validation && <span className='text-warning'>Vui lòng nhập tên...</span>}
                                </div>

                                {/* <div className="form-group">
                                    <label>Email</label>
                                    <input value={email} onChange={e => setEmailChange(e.target.value)} className="form-control" />
                                </div> */}

                                <div className="form-group">
                                    <label>Số điện thoại</label>
                                    <input maxLength={10} value={phone} onChange={e => setPhoneChange(e.target.value)} className="form-control" />
                                </div>
                            </div>

                            {/* <div className="form-check-status">
                                <input checked={active} onChange={e => setActiveChange(e.target.checked)} type='checkbox' className='form-check-input' />
                                <label className="form-check-label">Is Active</label>
                            </div> */}

                            <div className="form-check-gender">
                                <div onChange={handleChangeGender}>
                                    <input readOnly type="radio" value={EnumTypeGender.male} name="gender" checked={gender === EnumTypeGender.male} /> Nam
                                    <input readOnly type="radio" value={EnumTypeGender.female} name="gender" checked={gender === EnumTypeGender.female} /> Nữ
                                    <input readOnly type="radio" value={EnumTypeGender.other} name="gender" checked={gender === EnumTypeGender.other} /> Khác
                                </div>
                            </div>


                            <div>
                                <h3>Chọn thông tin địa chỉ</h3>
                                <div className="form-input-location">
                                    <select name="country" className="form-control p-2" onChange={(e) => handlecountry(e)}>
                                        <option value="">--Chọn tỉnh thành--</option>
                                        {
                                            provinceList.map((i) => (
                                                <option key={i.code} value={i.code}>{i.name}</option>
                                            ))
                                        }
                                    </select>


                                    <select name="district" className="form-control p-2" onChange={(e) => handleDistrict(e)} >
                                        <option value="">--Chọn quận huyện--</option>
                                        {
                                            districtList.map((i) => (
                                                <option key={i.code} value={i.code}>{i.name} </option>
                                            ))
                                        }
                                    </select>

                                    <select name="ward" className="form-control p-2" onChange={(e) => handleWard(e)}>
                                        <option value="">--Chọn phường xã--</option>
                                        {
                                            wardList.map((i) => (
                                                <option key={i.code} value={i.code}>{i.name} </option>
                                            ))
                                        }
                                    </select>

                                </div>
                            </div>

                            <div className="form-group-button-submit">
                                <button type="submit" className="btn btn-success">Đặt hàng</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default CustomerForm