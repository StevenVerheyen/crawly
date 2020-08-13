exports.isUrl = (string) => {
  // source: https://www.w3resource.com/javascript-exercises/javascript-regexp-exercise-9.php
  const regexp = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
  return regexp.test(string);
};

exports.isValidDevice = (device) => {
  if (!device || device.length === 0) {
    return false;
  }
  switch (device) {
    case 'Moto G4':
    case 'Galaxy S5':
    case 'Pixel 2':
    case 'Pixel 2 XL':
    case 'iPhone 5/SE':
    case 'iPhone 6/7/8':
    case 'iPhone 6/7/8 Plus':
    case 'iPhone X':
    case 'iPad':
    case 'iPad Pro':
    case 'Surface Duo':
    case 'Galaxy Fold':
      return true;
    default:
      console.log(
        `🟡 invalid device provided: "${device}". valid devices are: "Moto G4", "Galaxy S5", "Pixel 2", "Pixel 2 XL", "iPhone 5/SE", "iPhone 6/7/8", "iPhone 6/7/8 Plus", "iPhone X", "iPad", "iPad Pro", "Surface Duo" and "Galaxy Fold".`
      );
      return false;
  }
};
