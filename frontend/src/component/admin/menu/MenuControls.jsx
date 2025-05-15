import FilterControl from './FilterControl';
import AddItemDialog from './AddItemDialog';
import {Flex} from "@radix-ui/themes"

const MenuControls = ({ categoryData, isCategoryLoading, categoryError, setSelectedCategory }) => (
    <Flex className="my-4 w-100" justify={"between"} direction={{initial: 'column', sm: 'row'}} gap='2'>
        <div>
            <FilterControl
                categoryData={categoryData}
                isCategoryLoading={isCategoryLoading}
                categoryError={categoryError}
                setSelectedCategory={setSelectedCategory}
            />
        </div>
        <div>
            <AddItemDialog />
        </div>
    </Flex>
);

export default MenuControls;