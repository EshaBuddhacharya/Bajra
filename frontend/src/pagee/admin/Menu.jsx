import { Coffee, Plus } from "lucide-react"
import { SegmentedControl, Button, Grid, Skeleton } from '@radix-ui/themes'
import { useQuery } from '@tanstack/react-query';
import axios from "axios"
import ItemCard, {SkeletonFoodItem} from '../../component/admin/menu/ItemCard'
import { useState } from 'react'

const MenuHeader = () => (
    <h2 className="d-flex align-items-center gap-2">
        <Coffee size={30} />
        Menu Management
    </h2>
);

const FilterControl = ({categoryData, categoryError, isCategoryLoading, setSelectedCategory}) => {
    if (isCategoryLoading) return (
        <div className="d-flex gap-2">
            <Skeleton style={{ width: '60px', height: '28px', borderRadius: '5px' }} />
            <Skeleton style={{ width: '80px', height: '28px', borderRadius: '5px' }} />
            <Skeleton style={{ width: '70px', height: '28px', borderRadius: '5px' }} />
        </div>
    );
    if (categoryError) return <div>Error loading categories</div>;

    return (
        <SegmentedControl.Root 
            defaultValue="all" 
            radius="large" 
            variant="classic" 
            size='3'
            onValueChange={(value) => setSelectedCategory(value)}
        >
            <SegmentedControl.Item value="all">All</SegmentedControl.Item>
            {categoryData?.categories?.map(category => (
                <SegmentedControl.Item 
                    value={category.toLowerCase()}
                    key={category}
                >
                    {category}
                </SegmentedControl.Item>
            ))}
        </SegmentedControl.Root>    
    );
};

const AddItemButton = () => (
    <Button color="gray" variant="solid" highContrast>
        <Plus color="white" size={18} />
        Add Item
    </Button>
);

const MenuControls = (items) => (
    <div className="my-4 d-flex justify-content-between w-100">
        <div>
            <FilterControl {...items} />
        </div>
        <div>
            <AddItemButton />
        </div>
    </div>
);

const MenuCards = ({ filteredData, isLoading }) => {
    if (isLoading) return (
        <Grid columns={{ initial: "2", md: "3" }} gap="3" width="auto">
            {[...Array(6)].map((_, index) => (
                <div key={index}>
                    <SkeletonFoodItem />
                </div>
            ))}
        </Grid>
    )

    return (
        <Grid columns={{ initial: "2", md: "3" }} gap="3" width="auto">
            {filteredData?.map(item => (
                <div key={item._id}>
                    <ItemCard {...item} />
                </div>
            ))}
        </Grid>
    )
}

export default function AdminMenu() {
    const [selectedCategory, setSelectedCategory] = useState('all')

    // retriving menu data
    const { data: menuData, isLoading: isMenuLoading } = useQuery({
        queryKey: ['menuItems'],
        queryFn: () =>
            axios
                .get(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/menu/getItems`)
                .then(response => response.data)
    });

    const { data: categoryData, isLoading: isCategoryLoading, error: categoryError } = useQuery({
        queryKey: ['menuCategories'],
        queryFn: () =>
            axios
                .get(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/menu/getCategories`)
                .then(response => response.data)

    })
    const filteredData = menuData?.filter(item => {
        if(selectedCategory.toLowerCase() === 'all') { 
            return true
        }
        return selectedCategory.toLowerCase() === item.category.toLowerCase()
    })

    return (
        <div className="p-5 flex-grow-1">
            <MenuHeader />
            <MenuControls
                categoryData={categoryData}
                isCategoryLoading={isCategoryLoading}
                categoryError={categoryError}
                setSelectedCategory={setSelectedCategory}
            />
            <MenuCards filteredData={filteredData} isLoading={isMenuLoading} />
        </div>
    );
}