import { Component } from '@angular/core';
import { Activity } from './Activity';
import { FormsModule } from '@angular/forms';
import {HttpClient} from '@angular/common/http'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  activities:Activity [] = [  ];
  originalActivities:Activity [] = [  ];
  url : string = 'https://gist.githubusercontent.com/jdjuan/165053e6cb479a840c88e3e94b33e724/raw/4542ef950b2b32fbe2eea0b3df0338ffe67eae12/todo.json';
  filtered=false;

  constructor(private http:HttpClient){
    this.activities=this.getData();
    this.originalActivities=this.activities;
  }
  ngOnInit() {
    //httpService.getData();
  }

  public getData() : Activity[] {
    let a = this.http.get<any>(this.url);
    console.log(a);

    this.http.get<any>(this.url).subscribe(data => {
      data.forEach(element => {
        this.activities.push({description:element,selected:false})
      });
    })   ;
    return this.activities;
  }

  save(event : Event){
    this.activities.push({description:event.target.value , selected:false});

  }

  showSelected(){
    if (this.filtered===true){
      this.activities=this.originalActivities;
    this.activities = this.activities.filter(a => a.selected === true);
    this.filtered=true;
    }
    else{
      this.activities = this.activities.filter(a => a.selected === true);
    this.filtered=true;
    }
  }

  showAll(){
    this.activities = this.originalActivities;
    this.filtered=false;
    
  }

  selectAll(){

    this.activities.forEach(a => a.selected = true);
    this.filtered=false;
    
  }

  unselectAll(){
    this.activities.forEach(activity => activity.selected = false);
    this.filtered=false;
  }

  showActive(){

   if (this.filtered===true){
    this.activities=this.originalActivities;
    this.activities = this.activities.filter(a => a.selected === false);
    this.filtered=true;
  }
  else{
    this.activities = this.activities.filter(a => a.selected === false);
    this.filtered=true;
  }
  }

  deleteCompleted(){
    this.originalActivities = this.activities.filter(a => a.selected === false);
    this.filtered=true;
    this.activities = this.originalActivities;
  }

  receiveEvent(value){
    console.log("value");
    if(value.action === "remove"){
      this.activities = this.activities.filter(a => a.description !== value.desc);
      }
  }
}
