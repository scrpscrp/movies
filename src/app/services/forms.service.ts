import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {
  FormGroup,
  FormArray,
  FormControl,
  Validators,
} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormsService {

  constructor(private fb:FormBuilder) { }

  
}
