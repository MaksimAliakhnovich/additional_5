module.exports = function check(str, bracketsConfig) {
  const bracketsConfigObject = {};
  const stack = [];
  let count = 0; // кол-во открытых одинаковых скобок, типа ||

  /* конвертируем массив с параметрами скобок в объект, чтобы было проще обращаться */
  for (let i = 0, j = 0, len = bracketsConfig.length; i < len; i++) {
    bracketsConfigObject[bracketsConfig[i][j]] = bracketsConfig[i][j + 1];
  }

  for (let i = 0, len = str.length; i < len; i++) {
    let curBrkt = str[i];
    let conditionOne = curBrkt == bracketsConfigObject[curBrkt]; // открывающая и закрывающая скобки одинаковые
    let conditionTwo = bracketsConfigObject[curBrkt]; // текущая скобка является открывающей
    let conditionThree = curBrkt == bracketsConfigObject[stack[stack.length - 1]]; // текущая скобка такая же как поседняя в стэке

    if (conditionOne && count == 0) {
      // кладём в стэк, если это открывающая скобка из одинаковых, типа ||
      stack.push(curBrkt);
      count++;             
    } else if (!conditionOne && conditionTwo) {
      // кладём в стэк, если это открывающая скобка из разных, типа ()
      stack.push(curBrkt);
    } else if (conditionOne && !conditionThree && count != 0) {
      // кладём в стэк, если это открывающая скобка из одинаковых, типа ||, но не такая как предыдущая, например 1221
      stack.push(curBrkt);
      count++;
    } else {        
      if (stack.length == 0) {
        return false;
      }
      if (conditionThree) {
      // выбрасываем из стэка, если это закрывающая скобка, либо вторая из одинкаовых.
      stack.pop();
      conditionOne ? count-- : null;      
      } else {
        return false;
      }
    }
  }
  return stack.length == 0;
}