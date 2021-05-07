import { Component, OnInit } from '@angular/core';
import { Display, MyList } from '../structure.type';

@Component({
  selector: 'app-mylist',
  templateUrl: './mylist.component.html',
  styleUrls: ['./mylist.component.css'],
})
export class MylistComponent implements OnInit {
  isEmpty = true;
  displayF: Display[][] = [];

  constructor() {}

  splitCarousel<T>(array: T[]): T[][] {
    const res: T[][] = [];
    while (array.length) res.push(array.splice(0, 6));
    return res;
  }

  ngOnInit(): void {
    let mylist: MyList = { data: [] };
    let mylistData = localStorage.getItem('mylist');
    if (mylistData !== null) {
      mylist = JSON.parse(mylistData);
    }
    if (mylist.data.length > 0) {
      this.displayF = this.splitCarousel(mylist.data);
      this.isEmpty = false;
    }
  }
}
