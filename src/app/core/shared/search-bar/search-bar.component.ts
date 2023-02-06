import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
  term:string ='';

  constructor() { }

  ngOnInit(): void {
  }
onInput(event) {
  this.term = event.target.value;
}
}
