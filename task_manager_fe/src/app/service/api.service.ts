import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { SortDirection } from '@angular/material/sort';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private api = 'http://localhost:3000/tasks';
  private data: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>([]);

  constructor(private http: HttpClient) {
    this.fetchTasks();
  }

  fetchTasks() {
    this.http.get<Task[]>(this.api).subscribe(data => {
      this.data.next(data);
    })
  }

  addTask(body: string) {
    const headers = { 'Content-Type': 'application/json' };
    this.http.post(this.api, body, { headers }).subscribe(res => {
      this.fetchTasks();
      console.log(res);
    });
  }

  removeTask(id: number) {
    this.http.delete(this.api + "/" + id).subscribe(res => {
      console.log(res);
    });
  }

  changeDone(id: number, body: string) {
    const headers = { 'Content-Type': 'application/json' };
    this.http.post(this.api + '/done/' + id, body, { headers }).subscribe(res => {
      this.fetchTasks();
      console.log(res);
    });
  }

  fetchTasksSort(sort: string, order: SortDirection) {
    this.http.get<Task[]>(this.api + `?sort=${sort}&order=${order}`).subscribe(data => {
      this.data.next(data);
    })
  }

  getTasks() {
    return this.data.asObservable();
  }

}

export interface Task {
  id: number;
  task: string;
  is_done: number;
  due: string;
  priority: string;
}
