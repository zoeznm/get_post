const http = require('http');
const fs = require('fs');
const qs = require("querystring");

const server = http.createServer((request,response)=> {
  if(request.method === "GET") {
    if(request.url==="/") {
      const index =fs.readFileSync("./public/html/index.html");
      response.setHeader("Content-Type", "text/html", "charset=utf8");
      response.writeHead(200);
      response.write(index);
      response.end();
    }
  }
  if(request.method === "POST") {
    if(request.url === "/login") {
      let body = "";
      request.on("data",(data)=>{
        body += data;
      });
      request.on ("end",()=> {
        response.setHeader("Content-Type", "text/html", "charset=utf8");
        response.writeHead(200);
        
        // const parseData = new URLSearchParams(body);
        const parseData =qs.parse(body);
        console.log(parseData.id);
        const data = parseData.get(data);
        const html =`
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Document</title>
        </head>
        <body>
          <div>${parseData}</div>
        </body>
        </html>`;
response.write(html);
response.end();
      });
    };
  };
});

server.listen(3000);

fs.writeFile("안녕하세요","웹디자인", (err)=> {
  console.log(err)
})