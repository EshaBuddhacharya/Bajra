import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const FurthureSignIn = ({ authToken, refreshToken }) => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        address: '',
    });
    const { axiosInstance, setIsAuthenticated } = useAuth()
    const navigate = useNavigate()
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission
        const { name, address, phoneNumber } = formData
        try {
            await axiosInstance.post('/api/auth/loginWithGoogle', { authToken, refreshToken, name, address, phoneNumber })
            toast.success("Successfully Loged in")
            setIsAuthenticated(true)
            navigate('/showItems')
        }
        catch (error) {
            toast.error("Error logging in", error?.message)
        }
    };

    return (
        <>
            <div
                className="container shadow border bg-light pt-5"
                style={{
                    position: 'relative',
                    minHeight: '400px',
                    width: '30rem',
                    borderRadius: '5%',
                }}
            >
                <h3 className='text-center mb-3'>More Info Needed</h3>
                <form onSubmit={handleSubmit}>
                    <div className="form-floating d-flex justify-content-between gap-3">
                        <div className="form-floating" style={{ flex: 1 }}>
                            <input
                                type="text"
                                className="form-control"
                                id="floatingLastName"
                                name="name"
                                placeholder="Your last name"
                                value={formData.name}
                                onChange={handleChange}
                            />
                            <label htmlFor="floatingLastName">Name</label>
                        </div>
                    </div>

                    {/* Email & Phone */}
                    <div className="form-floating d-flex justify-content-between gap-4 pt-2">
                        {/* Phone Field */}
                        <div className="form-floating" style={{ flex: 1 }}>
                            <div className="input-group" style={{ display: 'flex', width: '100%' }}>


                                {/* Phone Input */}
                                <input
                                    type="text"
                                    className="form-control"
                                    id="floatingPhone"
                                    name="phoneNumber"
                                    placeholder="Your phone number"
                                    value={formData.phoneNumber}
                                    onChange={handleChange}
                                    maxLength="10"
                                    style={{ height: '58px', flexGrow: 1 }} // Fixed height & flexible width
                                />
                            </div>
                        </div>
                    </div>

                    {/* Password & Address */}
                    <div className="form-floating d-flex justify-content-between gap-4 pt-2">
                        <div className="form-floating" style={{ flex: 1 }}>
                            <input
                                type="text"
                                className="form-control"
                                id="floatingAddress"
                                name="address"
                                placeholder="Your address"
                                value={formData.address}
                                onChange={handleChange}
                            />
                            <label htmlFor="floatingAddress">Address</label>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="container pt-4" style={{ display: 'flex', justifyContent: 'center' }}>
                        <button type="submit" className="btn btn-danger w-25">
                            Register
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default FurthureSignIn;
