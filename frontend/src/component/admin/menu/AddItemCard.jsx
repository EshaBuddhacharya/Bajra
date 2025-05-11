import { motion, useAnimation } from 'framer-motion';
import { Card, Box, Text, Skeleton, Button, RadioCards, Flex, Dialog, Popover } from '@radix-ui/themes';
import { useState } from 'react'
import { Upload } from 'lucide-react'
import EditableDiv from './EditableDiv';

const FoodItem = ({ name, imgUrl, description, types, portion, _id, index }) => {
    const imageSrc = imgUrl ? `${import.meta.env.VITE_BACKEND_BASE_URL}${imgUrl}` : '';
    const [selectedType, setSelectedType] = useState(types[0]?.name)
    const controls = useAnimation();

    const InputField = ({ id, label, type, value, onChange, error }) => (
        <div className="form-floating mb-3">
            <input
                type={type}
                className={`form-control inputStyle ${error ? 'is-invalid' : ''}`}
                style={{ fontSize: '0.8rem', height: '30px', padding: '0.25rem 0.5rem' }}
                id={id}
                placeholder={label}
                value={value}
                onChange={onChange}
            />

            <label htmlFor={id}>{label}</label>
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    );

    const ItemDetails = ({ name, description, portion }) => (
        <Box p="3">
            <Text as="div" size="6" weight="bold" mb="5" >
                <span>
                    <EditableDiv text={name}></EditableDiv>
                </span>
            </Text>
            {description && (
                <Text as="div" size="2" className='p-2' color="gray" mb="4" contentEditable style={{ border: '1px dashed gray', borderRadius: '5px' }}>
                    {description}
                </Text>
            )}
            {portion && (
                <Text as="div" size="2" weight="bold">
                    <span contentEditable className='p-2' style={{ border: "1px dashed gray", borderRadius: '10px' }}>
                        {portion}
                    </span>
                </Text>
            )}
        </Box>
    );

    const ItemImage = ({ imageSrc, name, controls }) => (
        <div className='p-2 m-2' style={{ border: '1px dashed gray', borderRadius: '10px' }}>
            <div style={{
                width: '100%',
                height: '200px',
                overflow: 'hidden',
                borderRadius: '8px 8px 0 0'
            }}>
                {imageSrc ? (
                    <motion.img
                        src={imageSrc}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                        }}
                        animate={controls}
                        alt={name}
                    />)
                    : (
                        <Flex
                            justify='center'
                            align='center'
                            style={{
                                width: '100%',
                                height: '100%',
                            }}>
                            <Upload size={48} />
                        </Flex>
                    )
                }
            </div>
        </div >
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
                    <Popover.Root>
                        <Popover.Trigger className='w-100 h-100 align-items-center justify-content-center d-flex ' style={{ border: '1px dashed gray', borderRadius: '6px' }}>
                            <Flex direction="column" align='center' width="100%">
                                <Text>+</Text>
                            </Flex>
                        </Popover.Trigger>
                        <Popover.Content size="1" maxWidth="300px">
                            <InputField label="Type Name" />
                            <InputField label="Type Price" />
                            <Flex justify='center'>
                                <Button color='gray' highContrast>Ok</Button>
                            </Flex>
                        </Popover.Content>
                    </Popover.Root>
                </RadioCards.Root >
            </Box >
        )
    };

    const TypePrice = ({ selectedType, typeList }) => {
        const price = typeList.find(type => type.name === selectedType)?.price;

        return (
            <Flex justify={'end'} minWidth={'80px'} className='mb-2'>
                <Text size='7' weight='bold'>
                    $ {price ? price : 0}
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
            <Box>
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
                </Card>
            </Box>
        </motion.div>
    );
};


export default FoodItem;
