import { Table } from '@radix-ui/themes';
import {
  Smartphone,
  MapPin,
  ChartNoAxesColumn,
  Calendar,
  ListCollapse,
} from 'lucide-react';
import { GrAction } from 'react-icons/gr';
import { PiFinnTheHumanFill } from "react-icons/pi";


export default function TableHeader({sortBy, isAscending, setSortBy, toggleOrder}) {
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
            <PiFinnTheHumanFill size={16} style={{ marginRight: '6px' }} />
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
            <Smartphone size={16} style={{ marginRight: '6px' }} />
            Phone Number
          </div>
        </Table.ColumnHeaderCell> 
        <Table.ColumnHeaderCell style={{ fontWeight: '500' }}>
          <div 
            className="d-flex align-items-center"
            style={{ cursor: 'pointer', padding: '8px', borderRadius: '4px' }}
            onClick={() => {
              setSortBy('location');
              toggleOrder();
            }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f0f0f0'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <MapPin size={16} style={{ marginRight: '6px' }} />
            Delivery Location
          </div>
        </Table.ColumnHeaderCell>
        <Table.ColumnHeaderCell style={{ fontWeight: '500' }}>
          <div 
            className="d-flex align-items-center"
            style={{ cursor: 'pointer', padding: '8px', borderRadius: '4px' }}
            onClick={() => {
              setSortBy('status');
              toggleOrder();
            }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f0f0f0'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <ChartNoAxesColumn size={16} style={{ marginRight: '6px' }} />
            Order Status
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
            Order Date
          </div>
        </Table.ColumnHeaderCell>
        <Table.ColumnHeaderCell style={{ fontWeight: '500' }}>
          <div 
            className="d-flex align-items-center"
            style={{ cursor: 'pointer', padding: '8px', borderRadius: '4px' }}
            onClick={() => {
              setSortBy('type');
              toggleOrder();
            }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f0f0f0'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <ListCollapse size={16} style={{ marginRight: '6px' }} />
            Items
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