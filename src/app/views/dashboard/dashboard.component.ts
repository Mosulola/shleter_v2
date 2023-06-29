import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { cilStorage, cilVideo, cilLoopCircular, cilCheckCircle, cilBarChart, cilChart } from '@coreui/icons';
import { RoomsService } from '../../services/rooms.service';
import { Status } from '../../interface/status';
import { TypeRoom } from '../../interface/type-room';

interface IUser {
  name: string;
  state: string;
  registered: string;
  country: string;
  usage: number;
  period: string;
  payment: string;
  activity: string;
  avatar: string;
  status: string;
  color: string;
}

@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnChanges {
  constructor(private roomService: RoomsService) {
  }
  icons = { cilStorage, cilVideo, cilLoopCircular, cilCheckCircle, cilBarChart, cilChart };

  stat: any = {
    status: {
      approved: 0,
      build: 0,
      cancel: 0,
      end: 0,
      eos: 0,
      idle: 0,
      paused: 0,
      reserved: 0,
      streaming: 0,
      total_rooms: 0,
      unused: 0,
      waiting: 0
    },
    type_room: {
      total_type: 0,
      type_id_1: 0,
      type_id_2: 0,
      type_id_3: 0,
      type_id_4: 0,
      type_id_5: 0,
      type_id_6: 0,
      type_none: 0
    }
  };

  chartData: any = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'casc'],
    datasets: [
      {
        label: 'ห้องแบ่งพิมพ์',
        backgroundColor: '#f87979',
        data: [40, 20, 12, 39, 10, 80, 40]
      },
      {
        label: 'ห้องพูดทวน',
        backgroundColor: '#abcdef',
        data: [40, 20, 12, 39, 10, 80, 40]
      },
      {
        label: 'อื่น ๆ',
        backgroundColor: '#fedcba',
        data: [40, 20, 12, 39, 10, 80, 40]
      }
    ]
  };

  month: String[] = [
    'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
  ]

  listStatus: Status = {
    result: []
  };

  listType: TypeRoom = {
    result: []
  }

  filterStat = {
    statMonthAgo: 12
  }

  // barChart
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels: string[] = [];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData: any[] = [];
  isLoadChart = true;

  ngOnInit(): void {
    this.roomService.getStatDashboard(this.filterStat).subscribe((rooms: any) => {
      this.stat.status = rooms['data'].status;
      this.stat.type_room = rooms['data'].type_room
      this.calculateBarChart(rooms['data'].stat_month_ago)
      this.getStatusRooms();
      this.getTypeRooms();
    });
  }

  ngOnChanges(): void {
    this.chartData.labels = this.barChartLabels;
  }

  getStatusRooms() {
    this.roomService.getStatusRoom().subscribe((res: any) => {
      this.listStatus.result = res.result.map((e: any) => {
        e.value = e.value.split(' ')[0];
        e.total = parseInt(this.stat.status[`${e.value.toLowerCase()}`]);
        return e
      });
    })
  }

  getTypeRooms() {
    this.roomService.getTypeRoom().subscribe((res: any) => {
      this.listType.result = res.result.map((e: any) => {
        e.total = this.stat.type_room[`type_id_${e.id}`];
        return e;
      });
    })
  }

  calculatePercent(total: any, all: any) {
    return (total * 100) / all;
  }

  calculateBarChart(statMonth: any) {
    var stat = statMonth.sort((a: any, b: any) => a.year - b.year || a.month - b.month);
    stat.forEach((value: any) => {
      this.barChartLabels.push(`${this.month[value.month - 1]} ${value.year}`);
    })
    this.chartData.labels = this.barChartLabels
    this.barChartData.push({
      data: stat.map((e: any) => e.bangphim_type),
      label: 'ห้องแบ่งพิมพ์'
    })
    this.barChartData.push({
      data: stat.map((e: any) => e.revoice_type),
      label: 'ห้องพูดทวน'
    })
    this.barChartData.push({
      data: stat.map((e: any) => e.other_type),
      label: 'อื่นๆ'
    })
    this.isLoadChart = false
  }

}
