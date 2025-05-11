import { DropdownMenu, Button } from '@radix-ui/themes';
import { ListFilter } from 'lucide-react';

export default function FilterDropdown({setSelectedStatus}) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Button variant='soft'>
          <ListFilter size='16' />
          <div style={{ marginRight: '1rem' }}>Order Status</div>
          <DropdownMenu.TriggerIcon />
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Item onSelect={() => setSelectedStatus('')}>All</DropdownMenu.Item>
        <DropdownMenu.Item onSelect={() => setSelectedStatus('pending')}>pending</DropdownMenu.Item>
        <DropdownMenu.Item onSelect={() => setSelectedStatus('inprogress')}>inprogress</DropdownMenu.Item>
        <DropdownMenu.Item onSelect={() => setSelectedStatus('in delivery')}>in delivery</DropdownMenu.Item>
        <DropdownMenu.Item onSelect={() => setSelectedStatus('completed')}>completed</DropdownMenu.Item>
        <DropdownMenu.Item onSelect={() => setSelectedStatus('canceled')}>canceled</DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}