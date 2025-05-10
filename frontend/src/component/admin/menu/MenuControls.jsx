import FilterControl from './FilterControl';
import AddItemDialog from './AddItemDialog';

const MenuControls = ({ categoryData, isCategoryLoading, categoryError, setSelectedCategory }) => (
    <div className="my-4 d-flex justify-content-between w-100">
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
    </div>
);

export default MenuControls;