import * as moment from 'moment';
import { min } from 'rxjs/operators';

export class DateUtilsHelper {


  static timeStamp() {
    var date = new Date();

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    var monthFixed = month < 10 ? "0" + month : month;
    var dayFixed = day < 10 ? "0" + day : day;
    return year + "-" + monthFixed + "-" + dayFixed + " 00:00:00.000+0100";
  }

  static checkDateFormat(date:string){
    if (date != null && date.includes('-')){
      var splitedDate = date.split('-');
      console.log(splitedDate)

      var year = splitedDate[0]
      var month = splitedDate[1];
      var day = splitedDate[2];

      console.log(year)
      console.log(month)
      console.log(day)

      return moment(year +"-"+ month +"-"+ day, 'YYYY-MM-DD',true).isValid();

    } else return false;
  }

  static checkHourFormat(hour: string){
    if (hour != null &&hour.includes(':')){
      var splitedDate = hour.split(':');
      console.log(splitedDate)

      var hour = splitedDate[0]
      var minutes = splitedDate[1];

      return Number(hour) < 24 && Number(hour) >= 0 && Number(minutes) < 60 && Number(minutes) >= 0
    } else return false;
  }
}