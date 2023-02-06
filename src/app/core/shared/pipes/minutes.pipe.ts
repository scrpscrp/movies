import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'MinutesPipe'
  })
  export class MinutesPipe implements PipeTransform {
    showTime:string ='';
    transform(value: number): string {
      const hours = Math.floor(value / 60);
      const minutes = value % 60;
  
      this.showTime += `${hours}h ${minutes}min`;
  
      return this.showTime;
    }
  }