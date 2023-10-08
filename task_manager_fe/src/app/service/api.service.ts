import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private api = 'http://localhost:3000/tasks';
  private data: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>([]);

  constructor(private http: HttpClient) {
    this.fetchTask();
  }

  fetchTask() {
    this.http.get<Task[]>(this.api).subscribe(data => {
      this.data.next(data);
    })
  }

  addTask(body: string) {
    const headers = { 'Content-Type': 'application/json' };
    this.http.post(this.api, body, { headers }).subscribe(res => {
      this.fetchTask();
      console.log(res);
    });
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
