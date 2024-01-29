"use strict";

const TIME_WRITER = 300;

function shuffle(arr) {
  let ctr = arr.length;
  // While there are elements in the array
  while (ctr > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * ctr);
    // Decrease ctr by 1
    ctr--;
    // And swap the last element with it
    [arr[ctr], arr[index]] = [arr[index], arr[ctr]];
  }
  return arr;
}

const arrayList = [
  "Chúc mừng năm mới, đầy đủ sức khỏe, hạnh phúc và thành công.\nMong rằng mọi điều tốt lành sẽ đến với bạn và gia đình trong năm mới.",
  "Năm mới an khang, tài lộc đầy nhà.\nChúc bạn gặp nhiều may mắn và thăng tiến trong công việc cũng như trong cuộc sống cá nhân.",
  "Năm mới rộn ràng như bông hoa nở, hạnh phúc nhưng tia nắng sáng.\nChúc bạn có những trải nghiệm đáng nhớ và ngập tràn niềm vui.",
  "Chúc mừng năm mới, tình thân thắm thiết, tình bạn bền vững.\nMong rằng mối quan hệ của bạn sẽ ngày càng mạnh mẽ và ý nghĩa.",
  "Năm mới đến, hãy để những lo lắng ở năm cũ, mở cửa trái tim đón nhận niềm tin mới, hy vọng mới và những cơ hội mới.",
  "Chúc bạn và gia đình có một năm mới tràn đầy năng lượng tích cực, đầy đủ niềm vui và thành công rực rỡ.",
  "Năm mới, hãy để những bước chân của bạn dẫn đến những con đường mới, mở ra những trang mới trong cuộc đời.",
  "Chúc bạn có một năm mới thú vị, đầy ắp những chuyến phiêu lưu, và khám phá những điều mới mẻ.",
  "Năm mới hạnh phúc, công việc thuận lợi, tình yêu mãnh liệt.\nChúc bạn có một năm mới đáng nhớ và ý nghĩa.",
  "Chúc mừng năm mới, hãy sống mỗi ngày với đầy đủ nghĩa lý và trân trọng từng khoảnh khắc.",
];

// The typewriter element
const typeWriterElement = document.getElementById("typewriter");

// The TextArray:
const textArray = [shuffle(arrayList)[0]];

// function to generate the backspace effect
function delWriter(text, i, cb) {
  if (i >= 0) {
    typeWriterElement.innerHTML = text.substring(0, i--);
    // generate a random Number to emulate backspace hitting.
    let rndBack = 10 + Math.random() * 100;
    setTimeout(function () {
      delWriter(text, i, cb);
    }, rndBack);
  } else if (typeof cb == "function") {
    setTimeout(cb, TIME_WRITER);
  }
}

// function to generate the keyhitting effect
function typeWriter(text, i, cb) {
  if (i < text.length + 1) {
    typeWriterElement.innerHTML = text.substring(0, i++);
    // generate a random Number to emulate Typing on the Keyboard.
    let rndTyping = 250 - Math.random() * 100;
    setTimeout(function () {
      typeWriter(text, i++, cb);
    }, rndTyping);
  } else if (i === text.length + 1) {
    setTimeout(function () {
      delWriter(text, i, cb);
    }, TIME_WRITER);
  }
}

// the main writer function
function StartWriter(i) {
  if (typeof textArray[i] == "undefined") {
    setTimeout(function () {
      StartWriter(0);
    }, TIME_WRITER);
  } else if (i < textArray[i].length + 1) {
    typeWriter(textArray[i], 0, function () {
      StartWriter(i + 1);
    });
  }
}
// wait one second then start the typewriter
setTimeout(function () {
  StartWriter(0);
}, TIME_WRITER);
