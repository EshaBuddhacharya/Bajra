import PropTypes from 'prop-types';
import { motion, useAnimation } from 'framer-motion'; //eslint-disable-line no-unused-vars

const FoodItem = ({ name, imgUrl, description, types, portion, _id, index }) => {
    const imageSrc = `${import.meta.env.VITE_BACKEND_BASE_URL}${imgUrl}`;
    const controls = useAnimation();

    const renderImage = () => (
        <div className='card-img-top overflow-hidden'>
            <motion.img
                src={imageSrc}
                className="w-100 h-100"
                style={{ objectFit: 'cover', height: '200px' }}
                animate={controls}
                alt={name}
            />
        </div>
    );

    return (
        <motion.div
            key={_id || index}
            initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
            transition={{ duration: 0.3 }}
            layout
        >
            <motion.div
                className="col"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
            >
                <motion.div
                    className="card h-100"
                    onHoverStart={() => controls.start({ scale: 1.05 })}
                    onHoverEnd={() => controls.start({ scale: 1 })}
                >
                    {renderImage()}
                    <div className="card-body d-flex flex-column justify-content-between">
                        <h4 className="card-title">{name}</h4>
                        {description && <p className="card-text">{description}</p>}
                        {portion && <p className="card-text fw-bold">{portion}</p>}
                    </div>
                </motion.div>
            </motion.div>
        </motion.div>
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
