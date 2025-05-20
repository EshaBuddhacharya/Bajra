import { TextField } from '@radix-ui/themes';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';

export default function SearchBar({ search, onSearchChange }) {
  return (
    <div className='' style={{ width: '30rem' }}>
      <TextField.Root
        size="3"
        radius="full"
        placeholder="Search the orders..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
      >
        <TextField.Slot>
          <MagnifyingGlassIcon height="20" width="20" />
        </TextField.Slot>
      </TextField.Root>
    </div>
  );
}