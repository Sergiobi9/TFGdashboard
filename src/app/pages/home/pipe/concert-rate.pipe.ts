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
@Pipe({ name: "concertRatePipe" })
export class ConcertRatePipe implements PipeTransform {
  transform(rate: Number) {
    if (rate == 1) {
      return "one star";
    } else if (rate == 2) {
      return "two stars";
    } else if (rate == 3) {
      return "three stars";
    } else if (rate == 4) {
      return "four starts";
    } else {
      return "five stars";
    }
  }

  getMonth() {}
}
