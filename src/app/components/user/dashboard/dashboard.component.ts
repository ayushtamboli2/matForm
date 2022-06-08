import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BooktableService } from 'src/app/services/booktable.service';
import * as _ from 'lodash';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

   //search 
   search: String = "";

   //suggest list
   suggested: string[] = [
     'The Rainbow',
     'Tipping Point',
   'The Ask',
  ];

  //Author list
   Authors: string[] = [
     'William Shakespeare',
     'Agatha Christie',
     'Barbara Cartland',
  ];
  
  constructor(private service : BooktableService) { }

  columnsToDisplay = ['name','username','email','website'];

   dataSource!: MatTableDataSource<any>;
   apiResponse:any = [];
 
   @ViewChild(MatPaginator) paginator!: MatPaginator; //for paginator
   
   @ViewChild(MatSort) matSort!: MatSort; //Sort Data Table ascending or descending

  ngOnInit(){
    this.service.getUsers().subscribe((response:any) => {
      this.apiResponse = response;
      this.dataSource = new MatTableDataSource(response);
      this.dataSource.paginator = this.paginator; //for paginator
      this.dataSource.sort = this.matSort; //Sort Data Table ascending or descending
    })
  }

  //Method For Filter Data Table
  filterData($event : any){
    this.dataSource.filter = $event.target.value;
  }

  //Method for DropDown
  onChange($event:any){
    let filteredData = _.filter(this.apiResponse,(item) =>{
      return item.username.toLowerCase() ==  $event.value.toLowerCase();
    })
    this.dataSource = new MatTableDataSource(filteredData);
  }

  clearFilters(){
    this.dataSource.filter='';
  }


}