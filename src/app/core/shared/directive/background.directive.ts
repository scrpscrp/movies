import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';


@Directive({
  selector: '[appBackground]'
})
export class BackgroundDirective {

@Input() imageUrl: string;

    constructor(private elementRef:ElementRef, private renderer: Renderer2) {}
    
    ngOnInit() {
        this.renderer.setStyle(
            this.elementRef.nativeElement,
            'backgroundImage',
            `url(${this.imageUrl})`,
            
        );
        this.renderer.setStyle(
          this.elementRef.nativeElement,
          'backgroundRepeat',
          `no-repeat`,
          
      );
      this.renderer.setStyle(
        this.elementRef.nativeElement,
        'backgroundSize',
        `cover`,
    );
    
  // );
    }



}
