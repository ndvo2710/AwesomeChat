import fs from "fs";

const content = fs.readFileSync("/home/ndvo/Desktop/vars/www/AwesomeChat/lang/mailerTemplate.html", 'utf8');

const temp = content.split("__HREF_LINK__").join("HELLO_WORLD")
console.log(temp);