import { TextField } from '@radix-ui/themes';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';

export default function SearchBar({ search, onSearchChange, placeholder }) {
  return (
    <div className='' style={{ width: '30rem' }}>
      <TextField.Root
        size="3"
        radius="full"
        placeholder={placeholder}
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