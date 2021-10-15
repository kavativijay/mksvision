import { Component, OnInit } from '@angular/core';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  addNew: boolean = false;
  completedList: List[] = []
  toDoList: List[] = []

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.todoService.getToDoList().subscribe(toDoList => {
      this.toDoList = toDoList.filter((list: any) => !list.completed);
      this.completedList = toDoList.filter((list: any) => list.completed);
    })
  }

  addList() {
    if (!this.addNew) {
      this.addNew = true;
      let obj: any = {};
      obj['isNew'] = true
      this.toDoList.unshift(obj)
    }
  }

  selectedList(list: List, index: number) {
    list.completed = true;
    this.todoService.updateToDoList(list).subscribe(response => {
      this.toDoList.splice(index, 1);
      this.completedList.unshift(list);
      alert(list.title + ' marked as complete.');
    }, error => {
      // console.log("Error",error);
      alert('Error occured, retry after sometime.');
    })
  }

  editList(list: List) {
    list.isEdit = !list.isEdit
  }

  addToDoList(list: List) {
    if (list.title) {
      if (list.isNew) {
        this.todoService.saveToDoList(list).subscribe(reponse => {
          this.addNew = false;
          list.isNew = false;
          alert(list.title + ' saved successfully.');
        }, error => {
          // console.log("Error",error);
          alert('Error occured, retry after sometime.');
        })
      }
      else {
        this.todoService.updateToDoList(list).subscribe(response => {
          list.isEdit = false;
          alert(list.title + ' updated successfully.');
        }, error => {
          // console.log("Error",error);
          alert('Error occured, retry after sometime.');
        })
      }
    }
    else {
      alert("Value couldn't be Empty.");
    }
  }

  removeList(list: List, index: number) {
    this.todoService.removeList(list).subscribe(response => {
      alert(list.title + ' deleted successfully.');
      this.toDoList.splice(index, 1);
    }, error => {
      // console.log("Error",error);
      alert('Error occured, retry after sometime.');
    })
  }
}

export interface List {
  userId: number;
  id: number;
  title: string;
  completed: boolean,
  isNew: boolean,
  isEdit: boolean
}
