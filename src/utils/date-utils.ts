import * as moment from 'moment';

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
    if (date.includes('/')){
      var splitedDate = date.split('/');
      console.log(splitedDate)

      var year = splitedDate[2]
      var month = splitedDate[1];
      var day = splitedDate[0];

      return moment(day +"/"+ month +"/"+ year, 'DD/MM/YYYY',true).isValid();

    } else return false;
  }
}