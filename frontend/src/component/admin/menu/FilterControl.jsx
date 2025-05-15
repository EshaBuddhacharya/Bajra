import { SegmentedControl, Skeleton, Grid } from '@radix-ui/themes';

const FilterControl = ({ categoryData, categoryError, isCategoryLoading, setSelectedCategory }) => {
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
            size={{ sm: '2', md: '3', initial: "1"}}
            onValueChange={(value) => setSelectedCategory(value)}
        >
            <div className="d-flex flex-wrap gap-2">
                <SegmentedControl.Item value="all">All</SegmentedControl.Item>
                {categoryData?.categories?.map(category => (
                    <SegmentedControl.Item
                        value={category.toLowerCase()}
                        key={category}
                    >
                        {category}
                    </SegmentedControl.Item>
                ))}
            </div>
        </SegmentedControl.Root>
    );
};

export default FilterControl;