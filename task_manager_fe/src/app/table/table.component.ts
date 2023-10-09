import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { NgIf, DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Task, ApiService } from '../service/api.service'
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  standalone: true,
  imports: [
    NgIf,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    DatePipe,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule
  ],
})
export class TableComponent {

  displayedColumns: string[] = ['is_done', 'task', 'due', 'priority', 'action'];
  dataSource: MatTableDataSource<Task>;

  @ViewChild(MatSort) sort: MatSort;

  constructor(private apiService: ApiService) {
    this.apiService.getTasks().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
    });
  }

  formatDatetime(str: string) {
    if (str == null) return "";
    const date = new Date(str);
    const formattedDate = new Intl.DateTimeFormat("en-US", { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' }).format(date);
    return formattedDate;
  }

  formatPriority(str: string) {
    if (str == "1") {
      return "Low";
    }
    else if (str == "2") {
      return "Medium";
    }
    else if (str == "3") {
      return "High";
    }
    else {
      return "";
    }
  }

  removeTask(row: any) {
    const index = this.dataSource.data.indexOf(row);
    if (index > -1) {
      this.apiService.removeTask(row.id);
      this.dataSource.data.splice(index, 1);
      this.dataSource._updateChangeSubscription();
    }
  }

  checkChange(event: any) {
    if (event.checked) {
      this.apiService.changeDone(event.source.id, JSON.stringify({'is_done': 1}));
      console.log(event.source.id + " checked");
    }
    else {
      this.apiService.changeDone(event.source.id, JSON.stringify({'is_done': 0}));
      console.log(event.source.id + " unchecked");
    }
  }
}
