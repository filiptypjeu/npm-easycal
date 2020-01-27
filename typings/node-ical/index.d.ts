declare module "node-ical" {
    // https://github.com/jens-maus/node-ical/blob/master/node-ical.js
    
    export const fromURL: (url: string, options: Object, callback: (error: any, data: ICal) => void) => void;

    export const parseFile: (filename: string, callback: (error: any, data: any) => void) => void;

    interface ICal {
        [key: string]: ICalendar;
    }

    enum ComponentTypes {
        "VCALENDAR",
        "VEVENT",
        "VTODO",
        "VJOURNAL",
        "VFREEBUSY",
        "VTIMEZONE",
        "VALARM",
        "STANDARD",
        "DAYLIGHT",
    }

    interface ComponentDescription {
        params: any;
        val: string;
    }

    interface ICalendar {
        type: keyof typeof ComponentTypes;
        params: any[];
        uid: string;
        categories: string[];
        created: any;
        summary: string;
        location: string;
        description: ComponentDescription;
        contact: string;
        dtstamp: any;
        start: any;
        datetype: string;
        end: any;
        sequence: string;
        transparency: "OPAQUE" | "TRANSPARENT";
    }
}