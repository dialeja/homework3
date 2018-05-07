import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Activity } from '../Activity';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-activity-detail',
  templateUrl: './activity-detail.component.html',
  styleUrls: ['./activity-detail.component.css']
})
export class ActivityDetailComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  @Input()
  activity: Activity;

  @Output()
  out = new EventEmitter();
  
  delete(){
    this.out.emit({action:"remove",desc:this.activity.description});
  }


}
