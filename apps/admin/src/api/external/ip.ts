/* eslint-disable import/prefer-default-export */

export async function getIp() {
  return fetch("https://ipv4.myip.wtf/text")
    .then(r => r.text())
    .then(r => r.trim())
}
