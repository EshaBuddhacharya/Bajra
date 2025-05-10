import { Coffee, Plus } from "lucide-react"
import { SegmentedControl, Button } from '@radix-ui/themes'

const MenuHeader = () => (
    <h2 className="d-flex align-items-center gap-2">
        <Coffee size={30} />
        Menu Management
    </h2>
);

const FilterControl = () => (
    <SegmentedControl.Root defaultValue="inbox" radius="large" variant="classic">
        <SegmentedControl.Item value="inbox">Inbox</SegmentedControl.Item>
        <SegmentedControl.Item value="drafts">Drafts</SegmentedControl.Item>
        <SegmentedControl.Item value="sent">Sent</SegmentedControl.Item>
    </SegmentedControl.Root>
);

const AddItemButton = () => (
    <Button color="gray" variant="solid" highContrast>
        <Plus color="white" size={18}/>
        Add Item
    </Button>
);

const MenuControls = () => (
    <div className="my-4 d-flex justify-content-between w-100">
        <div>
            <FilterControl />
        </div>
        <div>
            <AddItemButton />
        </div>
    </div>
);

export default function AdminMenu() {
    return (
        <div className="p-5 w-100 flex-grow-1">
            <MenuHeader />
            <MenuControls />
        </div>
    );
}