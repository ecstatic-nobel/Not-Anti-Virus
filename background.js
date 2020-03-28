var match = false

// Content-Disposition
var cd_guloader = /attachment;(\s+)?filename=\"\w+_encrypted_([0-9]|[a-f]|[0-9a-f])+\.bin\".*/gi;

// Set-Cookie
var sc_emotet = /(^|\n)5[a-z][a-f0-9].*/gi;

// URI
var uri_guloader = /\w+_encrypted_([0-9]|[a-f]|[0-9a-f])+\.bin$/gi;
var uri_mozi = /\/Mozi\.m$/gi;

function blockRequest(r) {
  if (
    r.url.match(uri_guloader) ||
    r.url.match(uri_mozi)
  ) {
    return {
      redirectUrl: "http://127.0.0.1/"
    }
  }
};

function blockResponse(rr) {
  if (rr.statusCode == 200) {
    if (rr.method == "GET" || rr.method == "POST") {
      var resp_headers = rr.responseHeaders;

      for (var i = 0, l = resp_headers.length; i < l; ++i) {
        if (
          (resp_headers[i].name.toLowerCase() == "set-cookie" &&
          resp_headers[i].value.match(sc_emotet))
          ||
          (resp_headers[i].name.toLowerCase() == "content-disposition" &&
          resp_headers[i].value.match(cd_guloader))
        ) {
          return {
            redirectUrl: "http://127.0.0.1/"
          }
        }
      }
    }
  }
};

var api = "webRequest";
var _this = this;

try {
  if (chrome[api]) {
    _this[api] = chrome[api];
    params = ['blocking', 'responseHeaders', 'extraHeaders']
  } else if (browser[api]) {
    _this[api] = browser[api];
    params = ['blocking', 'responseHeaders']
  }
} catch (e) {};

try {
  _this[api].onBeforeRequest.addListener(
    blockRequest, {
      urls: ["<all_urls>"]
    },
    ['blocking']
  );
} catch (e) {};

try {
  _this[api].onHeadersReceived.addListener(
    blockResponse, {
      urls: ["<all_urls>"]
    },
    params
  );
} catch (e) {};
