/* Timelines could have been written in a better way, I am sorry if I wrote them in a hurry. :D */
(function () {
  let animation = {
    newYear: document.querySelector(".new-year"),
    range: function (min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    },
    get period() {
      let dateFuture = new Date("02/10/2024").getTime();
      let dateNow = new Date();
      let seconds = Math.floor((dateFuture - dateNow) / 1000);
      let minutes = Math.floor(seconds / 60);
      let hours = Math.floor(minutes / 60);
      let days = Math.floor(hours / 24);
      hours = hours - days * 24;
      minutes = minutes - days * 24 * 60 - hours * 60;
      seconds = seconds - days * 24 * 60 * 60 - hours * 60 * 60 - minutes * 60;
      if (days < 0) {
        days = 0;
        hours = 0;
        minutes = 0;
        seconds = 0;
      }
      return {
        year: new Date().getFullYear(),
        days: days,
        hours: hours,
        minutes: minutes,
        seconds: seconds,
      };
    },
    element: function (parent, type, className, html) {
      let element = document.createElement(type);
      element.className = className;
      if (typeof html !== "undefined") element.innerHTML = html;
      parent.appendChild(element);
      return element;
    },
    year: function (className) {
      let timeline = new TimelineMax();
      let year = animation.element(animation.newYear, "div", className);
      let welcomeNewYear = "Welcome " + String(animation.period.year);
      for (let i = 0; i <= welcomeNewYear.length - 1; i++) {
        let digit = animation.element(
          year,
          "div",
          "digit",
          welcomeNewYear.substr(i, 1)
        );
        digit.style.top = 0 - digit.clientHeight * 2 + "px";
        timeline.to(digit, 0.5, { top: 0, opacity: 1, ease: Bounce.easeOut });
      }
      return year;
    },
    animate: function () {
      let year1 = animation.year("year year1");
      animation.year("year year2");
      let controls = animation.element(animation.newYear, "div", "controls");
      let days = animation.element(controls, "div", "control days");
      let hours = animation.element(controls, "div", "control hours");
      let minutes = animation.element(controls, "div", "control minutes");
      let seconds = animation.element(controls, "div", "control seconds");
      animation.controls = {
        controls: controls,
        days: days,
        hours: hours,
        minutes: minutes,
        seconds: seconds,
      };
      animation.render();
      let triangles = animation.element(year1, "div", "triangles");
      let fullTimeline = new TimelineMax();
      let triangleStorage = [];
      for (let i = 0; i <= 50 - 1; i++) {
        let timeline = new TimelineMax({ repeat: -1 });
        let triangle = animation.element(triangles, "div", "triangle");
        triangle.style.top = -50 + "px";
        let time = animation.range(0, 100) / 100;
        let duration = 1;
        let direction = animation.range(1, 2) == 1 ? -1 : 1;
        timeline
          .set(triangle, { scale: animation.range(10, 20) / 10 }, time)
          .to(triangle, duration * 0.5, { opacity: 1 }, time)
          .to(
            triangle,
            duration,
            {
              top: "200%",
              rotationZ: animation.range(180, 360) * direction,
              rotationX: animation.range(180, 360) * direction,
            },
            time
          )
          .to(triangle, duration * 0.5, { opacity: 0 }, time + duration * 0.5);
        fullTimeline.add(timeline, 0);
        triangleStorage.push(triangle);
      }
      let previousWidth = 0;
      let checkWidth = function () {
        if (Math.abs(previousWidth - year1.clientWidth) > 1) {
          for (let i = 0; i <= triangleStorage.length - 1; i++) {
            triangleStorage[i].style.left =
              -5 + animation.range(0, year1.clientWidth) + "px";
          }
          previousWidth = year1.clientWidth;
        }
        setTimeout(checkWidth, 100);
      };
      checkWidth();
      return new TimelineMax()
        .to(days, 0.5, { top: 0, opacity: 1 }, 0)
        .to(hours, 0.5, { top: 0, opacity: 1 }, 0.25)
        .to(minutes, 0.5, { top: 0, opacity: 1 }, 0.5)
        .to(seconds, 0.5, { top: 0, opacity: 1 }, 0.75)
        .set(triangles, { opacity: 1 }, 3)
        .add(fullTimeline, 3);
    },
    plural: function (property) {
      let period = animation.period;
      if (String(period[property]).length <= 1)
        period[property] = "0" + period[property];
      return Number(period[property]) > 1
        ? period[property] + " " + property
        : period[property] + " " + property.substr(0, property.length - 1);
    },
    render: function () {
      animation.controls.seconds.innerHTML = animation.plural("seconds");
      animation.controls.minutes.innerHTML = animation.plural("minutes");
      animation.controls.hours.innerHTML = animation.plural("hours");
      animation.controls.days.innerHTML = animation.plural("days");
      requestAnimationFrame(animation.render);
    },
  };
  animation.animate();
})();
