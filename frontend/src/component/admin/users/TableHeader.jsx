import { Table } from '@radix-ui/themes';
import {
  User,
  Phone,
  MapPin,
  UserCog,
  Calendar
} from 'lucide-react';
import { GrAction } from 'react-icons/gr';

export default function TableHeader({toggleOrder, setSortBy}) {
  return (
    <Table.Header>
      <Table.Row justify='center' align='center'>
        <Table.ColumnHeaderCell align='center' style={{ fontWeight: '500' }}>
          <div 
            className="d-flex align-items-center" 
            style={{ cursor: 'pointer', padding: '8px', borderRadius: '4px' }}
            onClick={() => {
              setSortBy('name');
              toggleOrder();
            }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f0f0f0'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <User size={16} style={{ marginRight: '6px' }} />
            Full Name
          </div>
        </Table.ColumnHeaderCell>
        <Table.ColumnHeaderCell style={{ fontWeight: '500' }}>
          <div 
            className="d-flex align-items-center"
            style={{ cursor: 'pointer', padding: '8px', borderRadius: '4px' }}
            onClick={() => {
              setSortBy('phone');
              toggleOrder();
            }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f0f0f0'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <Phone size={16} style={{ marginRight: '6px' }} />
            Phone Number
          </div>
        </Table.ColumnHeaderCell>
        <Table.ColumnHeaderCell style={{ fontWeight: '500' }}>
          <div 
            className="d-flex align-items-center"
            style={{ cursor: 'pointer', padding: '8px', borderRadius: '4px' }}
            onClick={() => {
              setSortBy('address');
              toggleOrder();
            }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f0f0f0'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <MapPin size={16} style={{ marginRight: '6px' }} />
            Address
          </div>
        </Table.ColumnHeaderCell>
        <Table.ColumnHeaderCell style={{ fontWeight: '500' }}>
          <div 
            className="d-flex align-items-center"
            style={{ cursor: 'pointer', padding: '8px', borderRadius: '4px' }}
            onClick={() => {
              setSortBy('role');
              toggleOrder();
            }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f0f0f0'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <UserCog size={16} style={{ marginRight: '6px' }} />
            Role
          </div>
        </Table.ColumnHeaderCell>
        <Table.ColumnHeaderCell style={{ fontWeight: '500' }}>
          <div 
            className="d-flex align-items-center"
            style={{ cursor: 'pointer', padding: '8px', borderRadius: '4px' }}
            onClick={() => {
              setSortBy('date');
              toggleOrder();
            }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f0f0f0'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <Calendar size={16} style={{ marginRight: '6px' }} />
            Created At
          </div>
        </Table.ColumnHeaderCell>
        <Table.ColumnHeaderCell style={{ fontWeight: '500' }}>
          <div className="d-flex align-items-center">
            <GrAction size={16} style={{ marginRight: '6px' }} />
            Actions
          </div>
        </Table.ColumnHeaderCell>
      </Table.Row>
    </Table.Header>
  );
}