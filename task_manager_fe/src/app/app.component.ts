import { Component, OnInit } from '@angular/core';
import { ApiService } from './service/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'task_manager';
  tasks: any;
  constructor(private apiService: ApiService) { };
  ngOnInit(): void {
      this.apiService.getTasks().subscribe(data => {
        this.tasks = data;
      })
  }
}
