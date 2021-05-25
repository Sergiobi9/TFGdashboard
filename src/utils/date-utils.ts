
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
}