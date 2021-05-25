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
@Pipe({ name: "bookedTicketsPipe" })
export class BookedTicketsPipe implements PipeTransform {
  transform(tickets: Number) {
    if (tickets == 1) {
      return "one ticket";
    } else if (tickets == 2) {
      return "two tickets";
    } else if (tickets == 3) {
      return "three tickets";
    } else if (tickets == 4) {
      return "four tickets";
    } else if (tickets == 5) {
      return "five tickets";
    } else if (tickets == 6) {
      return "six tickets";
    } else if (tickets == 7) {
      return "seven tickets";
    } else if (tickets == 8) {
      return "eight tickets";
    } else if (tickets == 9) {
      return "nine tickets";
    } else {
      return tickets + " tickets";
    }
  }

  getMonth() {}
}
