'use client'

import PropTypes from 'prop-types';
import { motion, useAnimation } from 'framer-motion';
import { Card, Box, Text, Skeleton, Button, RadioCards, Flex, Dialog } from '@radix-ui/themes';
import { SquarePen, Trash2 } from 'lucide-react'
import { useState } from 'react'

const FoodItem = ({ name, imgUrl, description, types, portion, _id, index, handleDelete }) => {
    const imageSrc = `${import.meta.env.VITE_BACKEND_BASE_URL}${imgUrl}`;
    const [selectedType, setSelectedType] = useState(types[0]?.name)
    const controls = useAnimation();

    const ItemImage = ({ imageSrc, name, controls }) => (
        <div style={{
            width: '100%',
            height: '200px',
            overflow: 'hidden',
            borderRadius: '8px 8px 0 0'
        }}>
            <motion.img
                src={imageSrc}
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                }}
                animate={controls}
                alt={name}
            />
        </div>
    );

    const ItemDetails = ({ name, description, portion }) => (
        <Box p="3">
            <Text as="div" size="7" weight="bold" mb="2">
                {name}
            </Text>
            {description && (
                <Text as="div" size="2" color="gray" mb="2">
                    {description}
                </Text>
            )}
            {portion && (
                <Text as="div" size="2" weight="bold">
                    {portion}
                </Text>
            )}
        </Box>
    );

    const DeleteButton = ({ handleDelete }) => (
        <Dialog.Root>
            <Dialog.Trigger>
                <Button variant="soft" color="gray" highContrast>
                    <Trash2 size={16} /> Delete
                </Button>
            </Dialog.Trigger>
            <Dialog.Content>
                <Dialog.Title>
                    Are You Sure?
                </Dialog.Title>
                <Dialog.Description>
                    This action will result in the permanent deletion of the food item. This cannot be undone.
                </Dialog.Description>
                <Flex className="mt-4" justify={'end'} gap={'3'}>
                    <Dialog.Close>
                        <Button variant="soft" color="gray" highContrast >
                            No
                        </Button>
                    </Dialog.Close>
                    <Button variant="solid" color="gray" highContrast onClick={handleDelete}>
                        Yes
                    </Button>
                </Flex>
            </Dialog.Content>
        </Dialog.Root>

    )
    const ActionButtons = () => (
        <div style={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            gap: '1rem',
            width: '100%'
        }}>
            <Button variant="soft" color='gray' highContrast><SquarePen size={16} /> Edit</Button>
            <DeleteButton handleDelete={handleDelete} />
        </div>
    );
    const TypesRadio = ({ types, setSelectedType }) => {
        if (!types) {
            return
        }
        return (
            <Box flexGrow='1' className='mb-3'>
                <RadioCards.Root
                    defaultValue={types[0]?.name}
                    onValueChange={(value) => setSelectedType(value)}
                    value={selectedType}
                    columns={{ initial: "1", sm: "3" }}
                    gap='2'
                    color='gray'
                    size='1'
                >
                    {types.map((type) => (
                        <RadioCards.Item key={type.name} value={type.name}>
                            <Flex direction="column" width="100%">
                                <Text weight="semibold" size={2}>{type.name}</Text>
                                {/* <Text weight="semibold" size={1}>Rs. {type.price}</Text> */}
                            </Flex>
                        </RadioCards.Item>
                    ))}
                </RadioCards.Root>
            </Box>
        )
    };

    const TypePrice = ({ selectedType, typeList }) => {
        const price = typeList.find(type => type.name === selectedType)?.price;

        return (
            <Flex justify={'end'} minWidth={'80px'} className='mb-2'>
                <Text size='7' weight='bold'>
                    $ {price}
                </Text>
            </Flex>
        )
    }

    return (
        <motion.div
            key={_id || index}
            initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
            transition={{ duration: 0.3 }}
            layout
            style={{ position: 'relative' }}
        >
            <Box maxWidth="500px">
                <Card className='p-3 d-flex flex-column gap-3' style={{ flexDirection: 'column' }}>
                    <motion.div
                        onHoverStart={() => controls.start({ scale: 1.05 })}
                        onHoverEnd={() => controls.start({ scale: 1 })}
                    >
                        <ItemDetails name={name} description={description} portion={portion} />
                        <ItemImage imageSrc={imageSrc} name={name} controls={controls} />
                    </motion.div>
                    <Flex justify={'between'} gap='5'>
                        <TypesRadio types={types} setSelectedType={setSelectedType} />
                        <TypePrice selectedType={selectedType} typeList={types} />
                    </Flex>
                    <ActionButtons />
                </Card>
            </Box>
        </motion.div>
    );
};

export const SkeletonFoodItem = () => {
    return (
        <Box maxWidth="500px">
            <Card>
                <div style={{
                    width: '100%',
                    height: '200px',
                    overflow: 'hidden',
                    borderRadius: '8px 8px 0 0'
                }}>
                    <Skeleton style={{ width: '100%', height: '100%' }} />
                </div>
                <Box p="3">
                    <Skeleton>
                        <Text as="div" size="5" weight="bold" mb="2">
                            Loading...
                        </Text>
                    </Skeleton>
                    <Skeleton>
                        <Text as="div" size="2" color="gray" mb="2">
                            Loading description...
                        </Text>
                    </Skeleton>
                </Box>
            </Card>
        </Box>
    );
};


FoodItem.propTypes = {
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    imgUrl: PropTypes.string.isRequired,
    description: PropTypes.string,
    desc: PropTypes.string,
    types: PropTypes.arrayOf(
        PropTypes.shape({ name: PropTypes.string, price: PropTypes.number })
    ).isRequired,
};

export default FoodItem;
