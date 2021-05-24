function sendListCalendarOfTodayByEmail() {
  const calendar = getFirstCalendarWithName('YOUR CALENDAR NAME'); // <- REPLACE with your calendar's name!
  const now = new Date();
  const events = calendar.getEventsForDay(now);
  const data = events
    .map(getEventData)
    .sort(sortStartTime)
    .map(displayEvent);
  const list = data.join("<br>") + "<br><br>Send with script: PUT A LINK TO YOUR SCRIPT HERE";
  sendRichTextEmail(Session.getEffectiveUser().getEmail(), 'calendar today', list);
}

const sortStartTime = (a,b) => a.startTime - b.startTime;

const sendRichTextEmail = (email, subject, body) => MailApp.sendEmail(email, subject, body.replace(/<.+?>/g,""), {htmlBody: body});

const getFirstCalendarWithName = (name) => CalendarApp.getCalendarsByName(name)[0];

const getEventData = event => ({
    title: event.getTitle(),
    startTime: event.getStartTime(),
    endTime: event.getEndTime()
});

const displayEvent = info => "<strong>" + displayDate(info.startTime) + "</strong> " + info.title;

function displayDate(date) {
  const displayDate = date.getDate().twoDigits();
  const month = (date.getMonth() + 1).twoDigits();
  const fullYear = date.getFullYear();
  const hours = date.getHours().twoDigits();
  const minutes = date.getMinutes().twoDigits();
  return `${displayDate}-${month}-${fullYear} ${hours}:${minutes}`;
}

Number.prototype.twoDigits = function() {
  return ('00' + this.valueOf()).slice(-2);
}
