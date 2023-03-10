import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { FilterInterface } from 'src/app/core/shared/Interface/filter.interface';
import { genresInterface } from 'src/app/core/shared/Interface/genres.interface';

import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  @Output() filterDataEvent = new EventEmitter<FilterInterface>();
  @Output() resetFilterEvent = new EventEmitter();
 
ren = this.element.nativeElement;

  
checked : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  form: FormGroup;
  @Input() genresToFilter: string = '';
  rating = '';

  constructor(private fb: FormBuilder, public element: ElementRef, public render: Renderer2) {
    this.form = this.fb.group({
      checkArray: this.fb.array([], [Validators.required]),
    });
  }

  ngOnInit(): void {}

  filter() {
    let genresToFilter = this.form.value;
    if (genresToFilter.checkArray) {
      const filterValue: FilterInterface = {
        rating: this.rating,
        genres: genresToFilter.checkArray.toString(),
      };

      this.filterDataEvent.emit(filterValue);
    }
  }

  resetFilter() {
    this.form.reset();
    this.checked.next(false);
    this.resetFilterEvent.emit();
  }
  

  submitForm() {
    this.filter();
  }
  

  Data: genresInterface[] = [

    { id: 28, name: 'Action' },

    { id: 12, name: 'Adventure' },

    { id: 16, name: 'Animation' },

    { id: 35, name: 'Comedy' },

    { id: 80, name: 'Crime' },

    { id: 99, name: 'Documentary' },

    { id: 18, name: 'Drama' },

    { id: 10751, name: 'Family' },

    { id: 14, name: 'Fantasy' },

    { id: 36, name: 'History' },

    { id: 27, name: 'Horror' },

    { id: 10402, name: 'Music' },

    { id: 9648, name: 'Mystery' },

    { id: 10749, name: 'Romance' },

    { id: 878, name: 'Science Fiction' },

    { id: 10770, name: 'TV Movie' },

    { id: 53, name: 'Thriller' },

    { id: 10752, name: 'War' },

    { id: 37, name: 'Western' },
  ];

  onCheckboxChange(e: any) {
    const checkArray: FormArray = this.form.get('checkArray') as FormArray;
    if (e.target.checked) {
      checkArray.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      checkArray.controls.forEach((item: any) => {
        if (item.value == e.target.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

}
