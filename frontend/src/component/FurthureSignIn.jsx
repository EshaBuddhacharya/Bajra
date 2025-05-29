import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const FurthureSignIn = ({ authToken, refreshToken }) => {
    const [formData, setFormData] = useState({
        name: '',
        phoneNumber: '',
        address: '',
    });
    const [errors, setErrors] = useState({});
    const { axiosInstance, setIsAuthenticated } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        // Clear error for the field being edited
        setErrors({ ...errors, [e.target.name]: '' });
    };

    const validateForm = () => {
        let errors = {};
        let isValid = true;

        if (!formData.name.trim()) {
            errors.name = 'Name is required';
            isValid = false;
        } else if (!/^[A-Za-z\s]+$/.test(formData.name)) {
            errors.name = 'Name must contain only letters and spaces';
            isValid = false;
        }

        if (!formData.phoneNumber) {
            errors.phoneNumber = 'Phone Number is required';
            isValid = false;
        } else if (!/^\d{10}$/.test(formData.phoneNumber)) {
            errors.phoneNumber = 'Phone Number must be exactly 10 digits';
            isValid = false;
        }

        if (!formData.address.trim()) {
            errors.address = 'Address is required';
            isValid = false;
        }

        setErrors(errors);
        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            const { name, address, phoneNumber } = formData;
            try {
                await axiosInstance.post('/api/auth/loginWithGoogle', { authToken, refreshToken, name, address, phoneNumber });
                toast.success("Successfully Logged in");
                setIsAuthenticated(true);
                navigate('/showItems');
            } catch (error) {
                toast.error(`Error logging in: ${error?.message}`);
            }
        }
    };

    return (
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
                            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                            id="floatingLastName"
                            name="name"
                            placeholder="Your name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                        <label htmlFor="floatingLastName">Name</label>
                        {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                    </div>
                </div>

                <div className="form-floating d-flex justify-content-between gap-4 pt-2">
                    <div className="form-floating" style={{ flex: 1 }}>
                        <div className="input-group" style={{ display: 'flex', width: '100%' }}>
                            <input
                                type="text"
                                className={`form-control ${errors.phoneNumber ? 'is-invalid' : ''}`}
                                id="floatingPhone"
                                name="phoneNumber"
                                placeholder="Your phone number"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                maxLength="10"
                                style={{ height: '58px', flexGrow: 1 }}
                            />
                        </div>
                        {errors.phoneNumber && <div className="invalid-feedback">{errors.phoneNumber}</div>}
                    </div>
                </div>

                <div className="form-floating d-flex justify-content-between gap-4 pt-2">
                    <div className="form-floating" style={{ flex: 1 }}>
                        <input
                            type="text"
                            className={`form-control ${errors.address ? 'is-invalid' : ''}`}
                            id="floatingAddress"
                            name="address"
                            placeholder="Your address"
                            value={formData.address}
                            onChange={handleChange}
                        />
                        <label htmlFor="floatingAddress">Address</label>
                        {errors.address && <div className="invalid-feedback">{errors.address}</div>}
                    </div>
                </div>

                <div className="container pt-4" style={{ display: 'flex', justifyContent: 'center' }}>
                    <button type="submit" className="btn btn-danger w-25">
                        Register
                    </button>
                </div>
            </form>
        </div>
    );
};

export default FurthureSignIn;