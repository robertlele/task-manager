import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) { }

  addTask(body: string) {
    const headers = { 'Content-Type': 'application/json' };
    this.http.post('http://localhost:3000/tasks', body, {headers}).subscribe(res => console.log(res));
  }

  getTasks() {
    return this.http.get('http://localhost:3000/tasks');
  }

}
