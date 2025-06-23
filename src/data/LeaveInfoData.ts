export type LeaveStatus = 'Approved' | 'Rejected' | 'Pending';

export interface LeaveItem {
  id: string;
  fromDate: string;
  toDate: string;
  applyDays: number;
  leaveBalance: number;
  approvedBy: string;
  status: LeaveStatus;
}

export const leaveData: Record<'Upcoming' | 'Past', LeaveItem[]> = {
  Upcoming: [
    {
      id: '1',
      fromDate: '2025-04-15',
      toDate: '2025-04-18',
      applyDays: 3,
      leaveBalance: 16,
      approvedBy: 'Martin Deo',
      status: 'Approved',
    },
    {
      id: '2',
      fromDate: '2025-03-10',
      toDate: '2025-03-12',
      applyDays: 2,
      leaveBalance: 19,
      approvedBy: 'Martin Deo',
      status: 'Approved',
    },
  ],
  Past: [
    {
      id: '3',
      fromDate: '2025-04-15',
      toDate: '2025-04-18',
      applyDays: 3,
      leaveBalance: 16,
      approvedBy: 'Martin Deo',
      status: 'Rejected',
    },
    {
      id: '4',
      fromDate: '2025-03-10',
      toDate: '2025-03-12',
      applyDays: 2,
      leaveBalance: 19,
      approvedBy: 'Martin Deo',
      status: 'Approved',
    },
  ],
};
