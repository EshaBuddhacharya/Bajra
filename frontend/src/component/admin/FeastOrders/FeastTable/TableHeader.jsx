import { Table } from '@radix-ui/themes';
import {
  Users,
  DollarSign,
  Calendar,
  Package,
  Truck,
  ChartNoAxesColumn,
  GripVertical, 
  MapPin
} from 'lucide-react';
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
              setSortBy('user');
              toggleOrder();
            }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f0f0f0'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <PiFinnTheHumanFill size={16} style={{ marginRight: '6px' }} />
            Customer
          </div>
        </Table.ColumnHeaderCell>
        <Table.ColumnHeaderCell style={{ fontWeight: '500' }}>
          <div 
            className="d-flex align-items-center"
            style={{ cursor: 'pointer', padding: '8px', borderRadius: '4px' }}
            onClick={() => {
              setSortBy('peopleCount');
              toggleOrder();
            }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f0f0f0'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <Users size={16} style={{ marginRight: '6px' }} />
            People Count
          </div>
        </Table.ColumnHeaderCell>
        <Table.ColumnHeaderCell style={{ fontWeight: '500' }}>
          <div 
            className="d-flex align-items-center"
            style={{ cursor: 'pointer', padding: '8px', borderRadius: '4px' }}
            onClick={() => {
              setSortBy('contact');
              toggleOrder();
            }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f0f0f0'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <Users size={16} style={{ marginRight: '6px' }} />
            Contact
          </div>
        </Table.ColumnHeaderCell>
        <Table.ColumnHeaderCell style={{ fontWeight: '500' }}>
          <div 
            className="d-flex align-items-center"
            style={{ cursor: 'pointer', padding: '8px', borderRadius: '4px' }}
            onClick={() => {
              setSortBy('totalPrice');
              toggleOrder();
            }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f0f0f0'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <div style={{ marginRight: '6px' }}> Rs. </div>
            Total Price
          </div>
        </Table.ColumnHeaderCell>
        <Table.ColumnHeaderCell style={{ fontWeight: '500' }}>
          <div 
            className="d-flex align-items-center"
            style={{ cursor: 'pointer', padding: '8px', borderRadius: '4px' }}
            onClick={() => {
              setSortBy('totalPrice');
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
            Status
          </div>
        </Table.ColumnHeaderCell>
        <Table.ColumnHeaderCell style={{ fontWeight: '500' }}>
          <div 
            className="d-flex align-items-center"
            style={{ cursor: 'pointer', padding: '8px', borderRadius: '4px' }}
            onClick={() => {
              setSortBy('orderDate');
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
              setSortBy('items');
              toggleOrder();
            }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f0f0f0'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <Package size={16} style={{ marginRight: '6px' }} />
            Items
          </div>
        </Table.ColumnHeaderCell>
        <Table.ColumnHeaderCell style={{ fontWeight: '500' }}>
          <div className="d-flex align-items-center">
            <GripVertical size={16} style={{ marginRight: '6px' }} />
            Actions
          </div>
        </Table.ColumnHeaderCell>
      </Table.Row>
    </Table.Header>
  );
}