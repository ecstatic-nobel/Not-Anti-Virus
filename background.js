var match = false

function blockRequest(d) {
  if (d.statusCode == 200) {
    if (d.method == "GET" || d.method == "POST") {
      var headers = d.responseHeaders;

      for (var i = 0, l = headers.length; i < l; ++i) {
        if (
          headers[i].name.toLowerCase() == "set-cookie" &&
          headers[i].value.match(/((^|\n)5[a-z][a-f0-9].*)/gi)
        ) {
          return {
            redirectUrl: "http://127.0.0.1/"
          }
        }
      }
    }
  }
};

var api = "webRequest"
var _this = this;

try {
  if (chrome[api]) {
    _this[api] = chrome[api];

    _this[api].onHeadersReceived.addListener(
      blockRequest, {
        urls: ["*://*/*"]
      },
      ['blocking', 'responseHeaders', 'extraHeaders']
    );
  }
} catch (e) {}

try {
  if (browser[api]) {
    _this[api] = browser[api];

    _this[api].onHeadersReceived.addListener(
      blockRequest, {
        urls: ["*://*/*"]
      },
      ['blocking', 'responseHeaders']
    );
  }
} catch (e) {}
