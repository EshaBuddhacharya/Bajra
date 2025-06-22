import { Plus } from "lucide-react";
import { Button, Dialog, Flex } from '@radix-ui/themes';
import { useState } from 'react';
import { useAuth } from "../../../contexts/AuthContext";
import { toast } from 'react-toastify';

const AddItemDialog = () => {
    const { axiosInstance } = useAuth();
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        category: '',
        portion: '',
        imgUrl: '',
        types: [{ name: '', price: '' }],
    });
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleTypeChange = (index, e) => {
        const { name, value } = e.target;
        const newTypes = [...formData.types];
        newTypes[index][name] = value;
        setFormData(prev => ({ ...prev, types: newTypes }));
    };

    const addTypeField = () => {
        setFormData(prev => ({ ...prev, types: [...prev.types, { name: '', price: '' }] }));
    };

    const removeTypeField = (index) => {
        setFormData(prev => ({ ...prev, types: prev.types.filter((_, i) => i !== index) }));
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('image', file);

        try {
            const response = await axiosInstance.post('/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setFormData(prev => ({ ...prev, imgUrl: response.data.path }));
        } catch (error) {
            toast.error('Error uploading image');
            console.error('Error uploading image:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await axiosInstance.post('/api/menu/insertItem', formData);
            toast.success('Item added successfully');
            setIsDialogOpen(false);
            setFormData({
                name: '',
                description: '',
                category: '',
                portion: '',
                imgUrl: '',
                types: [{ name: '', price: '' }],
            });
        } catch (error) {
            toast.error('Error adding item');
            console.error('Error adding item:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Dialog.Root open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <Dialog.Trigger asChild>
                <Button color="gray" variant="solid" highContrast>
                    <Plus color="white" size={18} />
                    Add Item
                </Button>
            </Dialog.Trigger>

            <Dialog.Content className="lg">
                <Dialog.Title className="">
                    Add Food Item
                </Dialog.Title>
                <form onSubmit={handleSubmit}>
                    <div className="modal-body">
                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                placeholder="Name"
                                value={formData.name}
                                onChange={handleChange}
                                name="name"
                                required
                            />
                            <label htmlFor="name">Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                className="form-control"
                                id="description"
                                placeholder="Description"
                                value={formData.description}
                                onChange={handleChange}
                                name="description"
                            />
                            <label htmlFor="description">Description</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                className="form-control"
                                id="category"
                                placeholder="Category"
                                value={formData.category}
                                onChange={handleChange}
                                name="category"
                                required
                            />
                            <label htmlFor="category">Category</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                className="form-control"
                                id="portion"
                                placeholder="Portion"
                                value={formData.portion}
                                onChange={handleChange}
                                name="portion"
                            />
                            <label htmlFor="portion">Portion</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                type="file"
                                className="form-control"
                                id="image"
                                onChange={handleImageUpload}
                                accept="image/*"
                            />
                            <label htmlFor="image">Upload Image</label>
                        </div>
                        {formData.imgUrl && (
                            <div className="mb-3">
                                <img src={`${import.meta.env.VITE_BACKEND_BASE_URL}/${formData.imgUrl}`} alt="Preview" style={{ maxWidth: '200px' }} />
                            </div>
                        )}  
                        <fieldset className="mb-3">
                            <legend className="mb-2">Types / Prices</legend>
                            {formData.types.map((type, idx) => (
                                <div key={idx} className="row mb-2">
                                    <div className="col">
                                        <div className="form-floating">
                                            <input
                                                type="text"
                                                className="form-control"
                                                id={`type-name-${idx}`}
                                                placeholder="Type Name"
                                                value={type.name}
                                                onChange={(e) => handleTypeChange(idx, e)}
                                                name="name"
                                                required
                                            />
                                            <label htmlFor={`type-name-${idx}`}>Type Name</label>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="form-floating">
                                            <input
                                                type="number"
                                                className="form-control"
                                                id={`type-price-${idx}`}
                                                placeholder="Price"
                                                value={type.price}
                                                onChange={(e) => handleTypeChange(idx, e)}
                                                name="price"
                                                required
                                            />
                                            <label htmlFor={`type-price-${idx}`}>Price</label>
                                        </div>
                                    </div>
                                    {formData.types.length > 1 && (
                                        <div className="col-auto">
                                            <button
                                                type="button"
                                                onClick={() => removeTypeField(idx)}
                                                className="btn btn-danger"
                                            >
                                                ×
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ))}
                            <Button onClick={addTypeField}>
                                + Add another type
                            </Button>
                        </fieldset>
                    </div>
                    <div className="modal-footer">
                        <Flex gap='3'>
                            <Dialog.Close asChild>
                                <Button>
                                    Cancel
                                </Button>
                            </Dialog.Close>
                            <Button variant='soft' type="submit" disabled={isSubmitting}>
                                {isSubmitting ? 'Saving...' : 'Save'}
                            </Button>
                        </Flex>
                    </div>
                </form>
            </Dialog.Content>
        </Dialog.Root>
    );
};

export default AddItemDialog;