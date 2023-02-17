import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { map, Observable } from 'rxjs';

@UntilDestroy()
@Directive({
  selector: '[appBackground]'
})
export class BackgroundDirective {


@Input() imageUrl$: Observable<string>;

    constructor(private elementRef:ElementRef, private renderer: Renderer2) {}
    
    ngOnInit() {
        this.showBackGroundImg();
      }

      showBackGroundImg() {
        this.imageUrl$.pipe(untilDestroyed(this)).subscribe((url:string) => {
          this.renderer.setStyle(
            this.elementRef.nativeElement,
            'backgroundImage',
            `url(${url})`,
            
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
        })
        
    }



}
