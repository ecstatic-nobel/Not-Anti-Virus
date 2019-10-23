# [Not Anti-Virus (Not AV)™]  
##### An attmept to block malware before AV scans it.  

#### Description  
Not all things are seen as equal until you stare at it long enough!  

With malware causing havoc across the globe, this browser extension is a PoC for blocking Emotet downloads using just the response headers. The research can be found in this thread: https://twitter.com/ecstatic_nobel/status/1176267975537713152?s=19.   

#### Demonstration blocking Emotet:  
- Connect to URLhaus  
- Open three (3) database entries for recent and active Emotet URLs  
- Hightlight and open the URL in a new tab  
- Not AV detects it, file download is blocked, and the browser is redirected to 127.0.0.1  

**NOTE: Out of the box, this will block the majority of Emotet (or other file download) that has a cookie name built with the PHP uniqid function (or something similar) in the Set-Cookie header. This PoC can be strengthened by adding other indicators found in the response (or request) headers to avoid false-positives.**  

![Not Anti-Virus](https://raw.githubusercontent.com/ecstatic-nobel/Not-Anti-virus/master/notav.gif)  

Support: notav [at] protonmail  
