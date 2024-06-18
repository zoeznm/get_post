const http = require('http');
const fs = require('fs');

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
        const parseData = new URLSearchParams(body);
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
          <div>${data}</div>
        </body>
        </html>`;
response.write(html);
response.end();
      });
    };
  };
});

server.listen(3000);