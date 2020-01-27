import { fromURL } from "node-ical";

export const getEvents = (url: string): Promise<ICalendarResponse> => {
  const dateNow = new Date();

  return new Promise((resolve, reject) => {
    fromURL(url, {}, (err: any, data) => {
      if (err) { return reject(new Error(`getEvents * ${err}`)); }

      const events: ICalendarResponse = {
        past: [],
        ongoing: [],
        future: [],
      };

      for (const k in data) {
        if (data[k].type !== "VEVENT") {
          continue;
        }
        
        const ev = data[k];
        const startDate = new Date(ev.start);
        const endDate = ev.end ? new Date(ev.end) : new Date(startDate.setHours(startDate.getHours() + 1));

        const event: ICalendarEvent = {
          summary: ev.summary,
          description: ev.description.val,
          contact: ev.contact,
          location: ev.location,
          start: startDate,
          end: endDate,
        }

        if (dateNow > endDate) {
          events.past.push(event);
        } else if (dateNow < startDate) {
          events.future.push(event);
        } else {
          events.ongoing.push(event);
        }
      }

      resolve(events);
    });
  });
};

interface ICalendarEvent {
  summary: string;
  description: string;
  contact: string;
  location: string;
  start: Date;
  end: Date;
}

interface ICalendarResponse {
  past: ICalendarEvent[];
  ongoing: ICalendarEvent[];
  future: ICalendarEvent[];
}
