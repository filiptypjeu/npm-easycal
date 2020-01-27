import { getEvents } from "../index";
import { url } from "./variables/easycal.test_variables";

test("events", async () => {
  const res = await getEvents(url);
  console.log(res.past.map(e => e.summary));
  console.log(res.ongoing.map(e => e.summary));
  console.log(res.future.map(e => e.summary));
});
