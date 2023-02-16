import { Component, Input, OnInit } from '@angular/core';
import { ActorsDetailsInterface } from 'src/app/core/shared/Interface/actorsDetails.interface';

@Component({
  selector: 'app-actors-card-details',
  templateUrl: './actors-card-details.component.html',
  styleUrls: ['./actors-card-details.component.scss']
})
export class ActorsCardDetailsComponent implements OnInit {
@Input() actorsDetails: ActorsDetailsInterface = null;

  constructor() { }

  ngOnInit(): void {
  }

}
