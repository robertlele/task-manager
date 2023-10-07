import { Component } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule],
})
export class FormComponent {
  constructor(private formBuilder: FormBuilder, private apiService: ApiService) { }

  taskForm = this.formBuilder.group({
    task: [''],
    priority: [''],
    due: [''],
    time: ['']
  });

  addTask() {
    let date = Date.parse(this.taskForm.value.due!);
    let datetime = null;

    if (isNaN(date) == false) {
      datetime = new Date(date);
    }

    if (this.taskForm.value.time != '' && datetime != null) {
      let time = this.taskForm.value.time!.split(":");
      datetime!.setHours(Number.parseInt(time[0]), Number.parseInt(time[1]));
    }

    let priority = (this.taskForm.value.priority == '') ? null : this.taskForm.value.priority!;

    let json = {
      task: this.taskForm.value.task,
      priority: priority,
      date: datetime,
    };
    
    console.log(JSON.stringify(json));

    this.apiService.addTask(JSON.stringify(json));
  }

}
