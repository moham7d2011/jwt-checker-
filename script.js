function jwt() {
  const input = document.getElementById("input").value.trim();
  const result = document.getElementById("result");
  
  result.textContent = "";
  
if (input=="") {
  result.textContent = "please enter jwt";
  return;
}
const parts = input.split('.');
if (parts.length!==3) {
  result.textContent = "invalid input (must be 3 parts)";
return;
}
let headerDecoded = atob(base64UrlToBase64(parts[0]));
let payloadDecoded = atob(base64UrlToBase64(parts[1]));
if (!headerDecoded.startsWith("{") || !payloadDecoded.startsWith("{")) {
  result.textContent = "invalid base 64 or not json";
return;
}
let header = JSON.parse(headerDecoded);
let payload = JSON.parse(payloadDecoded);
let output = '';
output += '[Header]\n' ;
output += JSON.stringify(header, null , 2) + "\n\n";
if (header.alg==='none') {
  output += '❌ mistake : alg = none \n';
}
output += '[payload]\n';
output += JSON.stringify(payload, null , 2) + "\n\n";
if (payload.role==='admin') {
  output += "[!] Warning: role = admin\n";
}
if (!payload.exp) {
  output += "[!] Missing exp (token never expires)\n";
}
if (parts[2]==="") {
  output += "\n[!] Missing signature\n";
}
else{
  output += "\n[!] Signature exists but not verified client-side\n";
}
result.textContent = output ;
}




function base64UrlToBase64(str) {
  str = str.replace(/-/g, "+").replace(/_/g, "/");
  while (str.length % 4) str += "=";
  return str;
}
