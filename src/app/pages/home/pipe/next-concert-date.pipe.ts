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
@Pipe({ name: "nextConcertDate" })
export class NextConcertDate implements PipeTransform {
  transform(date: string) {
    var dateToDate = new Date(date);

    var day = dateToDate.getDate();
    var month = dateToDate.getMonth();
    var year = dateToDate.getFullYear();

    var hours = dateToDate.getHours();
    var minutes = dateToDate.getMinutes();

    var monthStr = this.getMonth(month);

    return (
      day +
      " de " +
      monthStr +
      " del " +
      year +
      " a las " +
      (hours < 10 ? "0" + hours : hours) +
      ":" +
      (minutes < 10 ? "0" + minutes : hours)
    );
  }

  getMonth(month) {
    if (month === 0) return "Enero";
    else if (month === 1) return "Febrero";
    else if (month === 2) return "Marzo";
    else if (month === 3) return "Abril";
    else if (month === 4) return "Mayo";
    else if (month === 5) return "Junio";
    else if (month === 6) return "Julio";
    else if (month === 7) return "Agosto";
    else if (month === 8) return "Septiembre";
    else if (month === 9) return "Octubre";
    else if (month === 10) return "Noviembre";
    else if (month === 11) return "Diciembre";
  }
}
