import { TodoService } from './services/todo.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'interview-app';

  constructor(private _todoService: TodoService) {

  }

  ngOnInit(): void {

  }
}
