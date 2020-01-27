export class CalendarManager {
  private ical: any;
  // private months = [
  //   "januari",
  //   "februari",
  //   "mars",
  //   "april",
  //   "maj",
  //   "juni",
  //   "juli",
  //   "augusti",
  //   "september",
  //   "oktober",
  //   "november",
  //   "december"
  // ];
  private weekdays = ["Sö", "Må", "Ti", "Ons", "To", "Fre", "Lö"];

  public constructor() {
    this.ical = require("node-ical");
  }

  public getEvents = (path: string, debug?: (msg: any, level?: number) => void): Promise<string[]> => {
    const self = this;
    return new Promise((resolve, reject) => {
      this.ical.fromURL(path, {}, (err: any, data: any) => {
        if (err) {
          reject(new Error(`getEvents * ${err}`));
        }
        const a = [];
        if (debug) {
          debug(data, 2);
        }
        const dateNow = new Date();
        for (const k in data) {
          if (data.hasOwnProperty(k) && data[k].type === "VEVENT") {
            const ev = data[k];
            if (ev.start > dateNow.valueOf()) {
              a.push(
                `${ev.start.valueOf()}${
                  ev.start.getDate() === dateNow.getDate() && ev.start.getMonth() === dateNow.getMonth() && ev.start.getFullYear() === dateNow.getFullYear()
                    ? "Idag"
                    : `${self.weekdays[ev.start.getDay()]} ${ev.start.getDate()}.${ev.start.getMonth() + 1}.${ev.start.getFullYear()}`
                } kl. ${ev.start.getHours() < 10 ? "0" + ev.start.getHours() : ev.start.getHours()}:${
                  ev.start.getMinutes() < 10 ? "0" + ev.start.getMinutes() : ev.start.getMinutes()
                } - ${ev.summary}`
              );
            } else if (ev.end > Date.now()) {
              a.push(
                `${ev.start.valueOf()}Just nu (till kl. ${ev.end.getHours() < 10 ? "0" + ev.end.getHours() : ev.end.getHours()}:${
                  ev.end.getMinutes() < 10 ? "0" + ev.end.getMinutes() : ev.end.getMinutes()
                }) - ${ev.summary}`
              );
            }
          }
        }
        resolve(a);
      });
    });
  };
}
