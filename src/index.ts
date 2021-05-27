import moment from "moment";
import { fromURL, VEvent } from "node-ical";

export const getEvents = (url: string): Promise<ICalendarResponse> => {
  const dateNow = new Date();

  return new Promise((resolve, reject) => {
    fromURL(url, {}, (err: any, data) => {
      if (err) {
        return reject(new Error(`getEvents * ${err}`));
      }

      const events: ICalendarResponse = {
        past: [],
        ongoing: [],
        future: [],
      };

      for (const k in data) {
        if (data[k].type !== "VEVENT") {
          continue;
        }

        const ev = data[k] as VEvent;

        if (dateNow > ev.end) {
          events.past.push(ev);
        } else if (dateNow < ev.start) {
          events.future.push(ev);
        } else {
          events.ongoing.push(ev);
        }
      }

      resolve(events);
    });
  });
};

export const groupByStartDate = (events: VEvent[]) => {
  const m = new Map<string, VEvent[]>();
  events.forEach(e => {
    const startDate = moment(new Date(e.start)).format("YYYY-MM-DD");
    m.set(startDate, (m.get(startDate) || []).concat(e));
  });

  return m;
};

export interface ICalendarResponse {
  past: VEvent[];
  ongoing: VEvent[];
  future: VEvent[];
}
