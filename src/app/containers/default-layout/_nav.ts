import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    title: true,
    name: 'ระบบจัดการ'
  },
  {
    name: 'ภาพรวม',
    url: '/dashboard',
    iconComponent: { name: 'cil-chart' },
  },
  {
    name: 'ข้อมูลสถิติ',
    url: '/view-log',
    iconComponent: { name: 'cil-list' },
  },
];
