import { Component, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';

@Component({
  selector: 'app-panel-list',
  templateUrl: './panel-list.component.html',
  styleUrls: ['./panel-list.component.css'],
})
export class PanelListComponent implements OnInit {
  dataSource!: any[];
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  search = '';
  result_length = 0;
  constructor() {}

  ngOnInit(): void {}

  sortChanged(sortState: Sort) {}
  clear() {}
}
