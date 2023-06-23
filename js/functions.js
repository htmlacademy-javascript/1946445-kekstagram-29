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

checkString('Hello', 15);

checkPalindrome('Hello');

getNumber('He22llo');
