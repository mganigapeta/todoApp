import { Component, ViewChild, OnDestroy, OnInit, HostListener } from '@angular/core';
import {MatTable} from '@angular/material/table';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  selectedTodo: any =  {id: null, name: null, completed: null, date: null}
  displayedColumns: string[] = ['completed', 'todo', 'date', 'remove'];
  items: any[] = [];  
  @ViewChild(MatTable) table: MatTable<any> | any;
  constructor() {}

  ngOnInit(): void {
    const getLocalData: any = localStorage.getItem('todoList');
    this.items = JSON.parse(getLocalData);
  }

  addTodo(todo: any) {
    if(todo.id) {
      this.items.forEach(item => {
        if(item.id === todo.id) {
          item.name = todo.name;
          item.completed = todo.completed;
        }
      });
    } else if(todo.name){
      const newTodo = {
        id: this.items.length + 1,
        name: todo.name,
        completed: false,
        date: new Date()
      };
      this.items.push(newTodo);
    }
    this.table.renderRows();
    this.selectedTodo = {id: null, name: null, completed: null, date: null};
  }

  removeData(element: any) {
    this.items = this.items.filter(item => {
      return item.id !== element.id
    });
    this.table.renderRows();
  }

  selectTodo(todo: any) {
    this.selectedTodo = JSON.parse(JSON.stringify(todo));
  }

  makeComplete(todo: any) {
    this.items.forEach(item => {
      if(item.id === todo.id) {
        item.completed = !item.completed;
      }
      if(this.selectedTodo?.id === item.id) {
        this.selectedTodo = {id: null, name: null, completed: null, date: null};
      }
    });
  }

  @HostListener('window:beforeunload', ['$event'])
  ngOnDestroy(): void {
    localStorage.setItem('todoList', JSON.stringify(this.items));
  }
}
