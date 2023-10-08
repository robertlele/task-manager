import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule, SortDirection } from '@angular/material/sort';
import { merge, Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { MatTable, MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgIf, DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Task, ApiService } from '../service/api.service'

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  standalone: true,
  imports: [
    NgIf,
    MatProgressSpinnerModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    DatePipe,
    MatButtonModule,
  ],
})
export class TableComponent implements OnInit {
  constructor(private apiService: ApiService) { }

  displayedColumns: string[] = ['is_done', 'task', 'due', 'priority'];
  data: Task[] = [];

  @ViewChild(MatTable) table!: MatTable<Task>;

  ngOnInit() {
    this.apiService.getTasks().subscribe(data => {
      this.data = data;
    });
  }
}
