import { Pipe, PipeTransform } from "@angular/core";

/*
 * Raise the value exponentially
 * Takes an exponent argument that defaults to 1.
 * Usage:
 *   value | exponentialStrength:exponent
 * Example:
 *   {{ 2 | exponentialStrength:10 }}
 *   formats to: 1024
 */
@Pipe({ name: "dateConcertPipe" })
export class DayConcertPipe implements PipeTransform {

  months = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];

  transform(concertDate: string) {
      var date = new Date(concertDate);
      
      var month = date.getMonth();
      var monthString = this.months[month];

      var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();

      return day + " " + monthString;

  }

  getMonth(){
      
  }
}
