function checkString (string, maxLength) {
  if (string.length <= maxLength) {
    return true;
  }
  return false;
}

function checkPalindrome (string) {
  const newString = string.toLowerCase().replaceAll(' ', '');
  let emptyString = '';
  for (let i = newString.length - 1; i >= 0; --i) {
    emptyString += newString[i];
  }
  return newString === emptyString;
}

function getNumber (string) {
  const modifiedString = string.toString().replaceAll(/\D/g, '');
  if (modifiedString.length === 0) {
    return NaN;
  }
  return Number(modifiedString);
}

checkString('Hello');

checkPalindrome('Hello');

getNumber('He22llo');

const getTime = (time) => {
  const timeRemade = time.split(':');
  const hours = parseInt(timeRemade[0] * 60, 10);
  const minutes = parseInt(timeRemade[1], 10);
  return hours + minutes;
};

function checkTime (dayStart, dayEnd, meetingStart, meetingDuration) {
  const dayStartTime = getTime(dayStart);
  const dayEndTime = getTime(dayEnd);
  const meetingStartTime = getTime(meetingStart);
  const meetingEndTime = meetingStartTime + meetingDuration;
  if (dayStartTime > meetingStartTime || meetingEndTime > dayEndTime) {
    return false;
  } return true;
}

checkTime('08:00', '17:30', '14:00', 90);
checkTime('8:0', '10:0', '8:0', 120);
checkTime('08:00', '14:30', '14:00', 90);
checkTime('14:00', '17:30', '08:0', 90);
checkTime('8:00', '17:30', '08:00', 900);
