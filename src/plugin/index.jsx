import moment from 'moment/moment';

export const formatTime = (time) => {
  return time ? moment(time).format('MM-DD HH:mm') : '';
};
