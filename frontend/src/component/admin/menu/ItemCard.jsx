import PropTypes from 'prop-types';
import { motion, useAnimation } from 'framer-motion';
import { Card, Box, Text, Skeleton } from '@radix-ui/themes';

const FoodItem = ({ name, imgUrl, description, types, portion, _id, index }) => {
    const imageSrc = `${import.meta.env.VITE_BACKEND_BASE_URL}${imgUrl}`;
    const controls = useAnimation();

    return (
        <motion.div
            key={_id || index}
            initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
            transition={{ duration: 0.3 }}
            layout
        >
            <Box maxWidth="300px">
                <Card>
                    <motion.div
                        onHoverStart={() => controls.start({ scale: 1.05 })}
                        onHoverEnd={() => controls.start({ scale: 1 })}
                    >
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
                        <Box p="3">
                            <Text as="div" size="5" weight="bold" mb="2">
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
                    </motion.div>
                </Card>
            </Box>
        </motion.div>
    );
};

export const SkeletonFoodItem = () => {
    return (
        <Box maxWidth="300px">
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
