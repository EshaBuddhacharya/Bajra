import { Grid } from '@radix-ui/themes';
import ItemCard, { SkeletonFoodItem } from './ItemCard';

const MenuCards = ({ filteredData, isLoading, handleDelete, onEdit }) => {
    if (isLoading) return (
        <Grid columns={{ initial: "1", md: "2" }} gap="3" width="auto">
            {[...Array(6)].map((_, index) => (
                <div key={index}>
                    <SkeletonFoodItem />
                </div>
            ))}
        </Grid>
    );

    return (
        <Grid columns={{ initial: "1", md: "2" }} gap="3" width="auto">
            {filteredData?.map(item => (
                <div key={item._id}>
                    <ItemCard {...item} handleDelete={handleDelete} onEdit={onEdit} />
                </div>
            ))}
        </Grid>
    );
};

export default MenuCards;