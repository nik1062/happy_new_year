let app = {
  start: function () {
    app.check();
  },
  check: function () {
    if (app.has(document.querySelector("body"))) {
      let link = document.createElement("a");
      link.className = "avnendv-ad";
      link.style.display = "none";
      link.setAttribute("target", "_blank");
      link.setAttribute("href", "https://avnendv.id.vn");
      link.innerHTML = `
        <div><img src="https://avnendv.id.vn/assets/images/favicon.png" /></div>
        <div class="hire-me">@avnendv<br/>Hire Me!</div>
      `;
      document.querySelector("body").appendChild(link);
    } else {
      setTimeout(app.check, 100);
    }
  },
};
(function () {
  app.startUps = [];
  app.has = function (value) {
    let found = true;
    for (let i = 0; i <= arguments.length - 1; i++) {
      let value = arguments[i];
      if (!(typeof value !== "undefined" && value !== null && value !== ""))
        found = false;
    }
    return found;
  };
  app.camelCase = function camelize(str, capitalFirst) {
    if (!app.has(capitalFirst)) capitalFirst = false;
    let result = str
      .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
        return index === 0 ? word.toLowerCase() : word.toUpperCase();
      })
      .replace(/\s+/g, "");
    if (capitalFirst)
      result = result.substr(0, 1).toUpperCase() + result.substr(1, 999);
    return result;
  };
  app.properCase = function (str) {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  };
})();
app["build"] = {};
app["config"] = {};
app["images"] = {};
app["styles"] = {};

(function () {
  if (app.has(app.api) === true) {
    // callbacks
    (function () {
      let callbackLevel = function (apiLevel) {
        if (app.has(apiLevel) && !app.has(apiLevel.length)) {
          for (let moduleName in apiLevel) {
            if (app.has(apiLevel[moduleName]) === true) {
              callbackLevel(apiLevel[moduleName]);
              for (let key in apiLevel[moduleName]) {
                (function (moduleName, key) {
                  let func = apiLevel[moduleName][key];
                  if (
                    key.split("Callback").length > 1 &&
                    typeof func === "function"
                  ) {
                    apiLevel[moduleName][
                      key.split("Callback").shift() + "Multi"
                    ] = async function (
                      count,
                      name,
                      callback,
                      arg1,
                      arg2,
                      arg3,
                      arg4,
                      arg5,
                      arg6,
                      arg7,
                      arg8,
                      arg9,
                      arg10,
                      arg11,
                      arg12,
                      arg13,
                      arg14,
                      arg15
                    ) {
                      return new Promise(function (resolve, reject) {
                        if (!app.has(count)) count = 1;
                        let rCount = 0;
                        let resolveCount;
                        for (let i = 0; i <= count - 1; i++) {
                          (async function (index) {
                            let countResult = await apiLevel[moduleName][
                              key.split("Callback").shift()
                            ](
                              name,
                              async function (arg1, arg2, arg3, arg4, arg5) {
                                if (typeof callback === "function") {
                                  let result = await callback(
                                    arg1,
                                    arg2,
                                    arg3,
                                    arg4,
                                    arg5
                                  );
                                  if (
                                    result === true &&
                                    !app.has(resolveCount)
                                  ) {
                                    console.log("MULTI INDEX:", index);
                                    resolveCount = index;
                                  }
                                  return result;
                                }
                              },
                              arg1,
                              arg2,
                              arg3,
                              arg4,
                              arg5,
                              arg6,
                              arg7,
                              arg8,
                              arg9,
                              arg10,
                              arg11,
                              arg12,
                              arg13,
                              arg14,
                              arg15
                            );
                            rCount += 1;
                            if (resolveCount === index || rCount >= count)
                              resolve(countResult);
                          })(i);
                        }
                      });
                    };
                    apiLevel[moduleName][key.split("Callback").shift()] =
                      async function (
                        name,
                        callback,
                        arg1,
                        arg2,
                        arg3,
                        arg4,
                        arg5,
                        arg6,
                        arg7,
                        arg8,
                        arg9,
                        arg10,
                        arg11,
                        arg12,
                        arg13,
                        arg14,
                        arg15
                      ) {
                        if (typeof callback !== "function") {
                          arg15 = arg13;
                          arg14 = arg12;
                          arg13 = arg11;
                          arg12 = arg10;
                          arg11 = arg9;
                          arg10 = arg8;
                          arg9 = arg7;
                          arg8 = arg6;
                          arg7 = arg5;
                          arg6 = arg4;
                          arg5 = arg3;
                          arg4 = arg2;
                          arg3 = arg1;
                          arg2 = callback;
                          arg1 = name;
                        }
                        let output, error;
                        await apiLevel[moduleName][key](
                          async function (data, page) {
                            let result =
                              typeof callback === "function"
                                ? await callback(data, page)
                                : undefined;
                            if (app.has(result) && app.has(result.length)) {
                              if (!app.has(output)) output = [];
                              output = output.concat(result);
                            } else {
                              output = data;
                            }
                            return result;
                          },
                          function (err, errorText) {
                            error = { error: err, errorText };
                          },
                          arg1,
                          arg2,
                          arg3,
                          arg4,
                          arg5,
                          arg6,
                          arg7,
                          arg8,
                          arg9,
                          arg10,
                          arg11,
                          arg12,
                          arg13,
                          arg14,
                          arg15
                        );
                        let obj = {};
                        if (typeof callback !== "function") return output;
                        obj[name] = output;
                        obj.error = error;
                        return obj;
                      };
                  }
                })(moduleName, key);
              }
            }
          }
        }
      };
      callbackLevel(app.api);
    })();
  }

  // call in the end
  if (typeof app.start === "function") {
    app.start();
  }

  for (let i = 0; i <= app.startUps.length - 1; i++) {
    if (typeof app.startUps[i] === "function") {
      app.startUps[i]();
    }
  }
  for (let i = 0; i <= app.startUps.length - 1; i++) {
    if (!(typeof app.startUps[i] === "function")) {
      setTimeout(app.startUps[i].callback, app.startUps[i].time);
    }
  }
})();
