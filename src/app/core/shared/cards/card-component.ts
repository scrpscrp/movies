import { Component, OnInit, Input  } from '@angular/core';

@Component({
  selector: 'app-cards',
  templateUrl: './card-component.html',
  styleUrls: ['./card-component.scss']
})
export class MovieCardComponent implements OnInit {
  @Input() title: string='';
  @Input() date: string='';
  @Input() poster_path: string='';
  @Input() vote_average!: number;

  constructor() { }

  ngOnInit(): void {
    if (this.title.length > 21) {
      this.title = `${this.title.substring(0,22)}...`
    }
  }

}
