import { getEvents } from "../index";
import { url } from "./variables/easycal.test_variables";

test("no url", async () => {
  expect(getEvents("url")).rejects.toBeDefined();
});

test("invalid url", async () => {
  const res = await getEvents("https://calendar.google.com/calendar");
  expect(res.future).toBeDefined();
  expect(res.past).toBeDefined();
  expect(res.ongoing).toBeDefined();
  expect(res.invalid).toBeDefined();

  expect(res.future).toHaveLength(0);
  expect(res.past).toHaveLength(0);
  expect(res.ongoing).toHaveLength(0);
  expect(res.invalid).toHaveLength(0);
});

if (url) {
  test("url", async () => {
    const res = await getEvents(url);
    expect(res.future).toBeDefined();
    expect(res.past).toBeDefined();
    expect(res.ongoing).toBeDefined();
    expect(res.invalid).toBeDefined();
  });
}
