import { Component, Input, OnInit } from '@angular/core';
import { actorsDetailsInterface } from 'src/app/Interface/actorsDetails.interface';

@Component({
  selector: 'app-actors-card-details',
  templateUrl: './actors-card-details.component.html',
  styleUrls: ['./actors-card-details.component.scss']
})
export class ActorsCardDetailsComponent implements OnInit {
@Input() actorsDetails: actorsDetailsInterface = null;

  
  constructor() { }

  ngOnInit(): void {
  }

}
