import { Plus } from "lucide-react";
import { Button, Dialog, Flex } from '@radix-ui/themes';
import { useState } from 'react';
import FoodItem from '../component/admin/menu/AddItemCard';

const AddItemDialog = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    // Hardcoded example item
    const exampleItem = {
        _id: 'example-1',
        name: 'Example Burger',
        imgUrl: '/media/images/bhatmas.jpg',
        description: 'A delicious example burger with lettuce, tomato, and cheese.',
        types: [
            { name: 'Regular', price: 8.99 },
            { name: 'Large', price: 12.99 }
        ],
        portion: '200g',
    };

    const handleDelete = () => {
        // Example delete handler (no-op for now)
        console.log('Delete clicked for', exampleItem._id);
    };

    return (
        <>
            <div className="d-flex align-items-center justify-content-center" style={{height: '100vh', width: '100vw'}}>
                <Dialog.Root open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <Dialog.Trigger asChild>
                        <Button color="gray" variant="solid" highContrast>
                            <Plus color="white" size={18} />
                            Add Item
                        </Button>
                    </Dialog.Trigger>

                    <Dialog.Content className="lg" maxWidth={'500px'}>
                        <Dialog.Title className="text-center" size='8'>
                            Add Item
                        </Dialog.Title>

                        {/* Integrated FoodItem card with a hardcoded example */}
                        <FoodItem
                            _id={exampleItem._id}
                            name={exampleItem.name}
                            // imgUrl={exampleItem.imgUrl}
                            description={exampleItem.description}
                            types={exampleItem.types}
                            portion={exampleItem.portion}
                            handleDelete={handleDelete}
                        />

                        <Flex justify="end" gap="3" className="mt-4">
                            <Dialog.Close asChild>
                                <Button variant="soft" color="gray" highContrast>
                                    Cancel
                                </Button>
                            </Dialog.Close>
                            <Button variant="solid" color="gray" highContrast>
                                Save
                            </Button>
                        </Flex>
                    </Dialog.Content>
                </Dialog.Root>
            </div>
        </>
    );
};

export default AddItemDialog;
