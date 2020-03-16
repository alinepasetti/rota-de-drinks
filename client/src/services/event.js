import axios from 'axios';

const instance = axios.create({
  baseURL: '/api/event'
});

// service to connect create new event FE and BE
const createNewEvent = async data => {
  const result = await instance.post('/create-new', data);
  const event = result.data.event;
  return event;
};
// find all get.('/')
const findAllEvents = async () => {
  const result = await instance.get('/');
  const events = result.data.events;
  return events;
};

const findOneEvent = async eventId => {
  const result = await instance.get(`/${eventId}`);
  const event = result.data.event;
  return event;
};
const findOneEventAndAddAttendee = async (eventId, userId) => {
  const result = await instance.patch(`/${eventId}/add-attendee/${userId}`);
  const event = result.data.event;
  return event;
};

export { createNewEvent, findAllEvents, findOneEvent, findOneEventAndAddAttendee };
