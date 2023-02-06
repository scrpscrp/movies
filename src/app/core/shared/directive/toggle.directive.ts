import { Directive, HostListener, Input } from '@angular/core';
import { Renderer2 } from '@angular/core';
import { ElementRef } from '@angular/core';

@Directive({
  selector: '[appToggle]'
})
export class ToggleDirective {

  constructor( private ren: Renderer2 , private el: ElementRef) { 
    // this.el.nativeElement.classList.add('hide');
    
  }
  

}
