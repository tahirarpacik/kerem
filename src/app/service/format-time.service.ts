export class FormatTimeService {
  static formatDate = date => {
    let d = new Date(date);
    let month = (d.getMonth() + 1).toString().padStart(2, "0");
    let day = d.getDate().toString().padStart(2, "0");
    let year = d.getFullYear();
    let hour = d.getHours();
    let minute = d.getMinutes();
    return [day, month, year].join("/") + " " + [hour, minute].join(":");
  };
}
