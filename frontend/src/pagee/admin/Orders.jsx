import { TextField } from '@radix-ui/themes'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { DropdownMenu, Button, Table } from '@radix-ui/themes'
import { ListFilter } from 'lucide-react'

const SearchBar = () => (
    <div className='' style={{ width: '30rem' }}>
        <TextField.Root size="3" radius='full' placeholder="Search the orders..." >
            <TextField.Slot>
                <MagnifyingGlassIcon height="20" width="20" />
            </TextField.Slot>
        </TextField.Root>
    </div>
)

const FilterDropdown = () => (
    <DropdownMenu.Root>
        <DropdownMenu.Trigger>
            <Button variant='soft'>
                <ListFilter size='16' />
                <div style={{marginRight: '1rem'}}>Options</div>
                <DropdownMenu.TriggerIcon />
            </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
            <DropdownMenu.Item shortcut="⌘ E">Edit</DropdownMenu.Item>
            <DropdownMenu.Item shortcut="⌘ D">Duplicate</DropdownMenu.Item>
            <DropdownMenu.Separator />
            <DropdownMenu.Item shortcut="⌘ N">Archive</DropdownMenu.Item>
            <DropdownMenu.Sub>
                <DropdownMenu.SubTrigger>More</DropdownMenu.SubTrigger>
                <DropdownMenu.SubContent>
                    <DropdownMenu.Item>Move to project…</DropdownMenu.Item>
                    <DropdownMenu.Item>Move to folder…</DropdownMenu.Item>
                    <DropdownMenu.Separator />
                    <DropdownMenu.Item>Advanced options…</DropdownMenu.Item>
                </DropdownMenu.SubContent>
            </DropdownMenu.Sub>
            <DropdownMenu.Separator />
            <DropdownMenu.Item>Share</DropdownMenu.Item>
            <DropdownMenu.Item>Add to favorites</DropdownMenu.Item>
            <DropdownMenu.Separator />
            <DropdownMenu.Item shortcut="⌘ ⌫" color="red">Delete</DropdownMenu.Item>
        </DropdownMenu.Content>
    </DropdownMenu.Root>
)

const OrdersTable = () => (
    <Table.Root>
        <Table.Header>
            <Table.Row>
                <Table.ColumnHeaderCell>Full name</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Email</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Group</Table.ColumnHeaderCell>
            </Table.Row>
        </Table.Header>
        <Table.Body>
            <Table.Row>
                <Table.RowHeaderCell>Danilo Sousa</Table.RowHeaderCell>
                <Table.Cell>danilo@example.com</Table.Cell>
                <Table.Cell>Developer</Table.Cell>
            </Table.Row>
            <Table.Row>
                <Table.RowHeaderCell>Zahra Ambessa</Table.RowHeaderCell>
                <Table.Cell>zahra@example.com</Table.Cell>
                <Table.Cell>Admin</Table.Cell>
            </Table.Row>
            <Table.Row>
                <Table.RowHeaderCell>Jasper Eriksson</Table.RowHeaderCell>
                <Table.Cell>jasper@example.com</Table.Cell>
                <Table.Cell>Developer</Table.Cell>
            </Table.Row>
        </Table.Body>
    </Table.Root>
)

export default function Orders() {
    return (
        <div className="p-5" style={{flexGrow: 1}}>
            <h2 className=''> Order Management </h2>
            <div className='my-4 d-flex gap-2'>
                <SearchBar />
                <FilterDropdown />
            </div>
            <div>
                <OrdersTable />
            </div>
        </div>
    )
}