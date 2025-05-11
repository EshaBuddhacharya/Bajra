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


export default function TableHeader() {
  return (
    <Table.Header>
      <Table.Row justify='center' align='center'>
        <Table.ColumnHeaderCell align='center' style={{ fontWeight: '500' }}>
          <div className="d-flex align-items-center">
            <PiFinnTheHumanFill size={16} style={{ marginRight: '6px' }} />
            Full Name
          </div>
        </Table.ColumnHeaderCell>
        <Table.ColumnHeaderCell style={{ fontWeight: '500' }}>
          <div className="d-flex align-items-center">
            <Smartphone size={16} style={{ marginRight: '6px' }} />
            Phone Number
          </div>
        </Table.ColumnHeaderCell>
        <Table.ColumnHeaderCell style={{ fontWeight: '500' }}>
          <div className="d-flex align-items-center">
            <MapPin size={16} style={{ marginRight: '6px' }} />
            Delivery Location
          </div>
        </Table.ColumnHeaderCell>
        <Table.ColumnHeaderCell style={{ fontWeight: '500' }}>
          <div className="d-flex align-items-center">
            <ChartNoAxesColumn size={16} style={{ marginRight: '6px' }} />
            Order Status
          </div>
        </Table.ColumnHeaderCell>
        <Table.ColumnHeaderCell style={{ fontWeight: '500' }}>
          <div className="d-flex align-items-center">
            <Calendar size={16} style={{ marginRight: '6px' }} />
            Order Date
          </div>
        </Table.ColumnHeaderCell>
        <Table.ColumnHeaderCell style={{ fontWeight: '500' }}>
          <div className="d-flex align-items-center">
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