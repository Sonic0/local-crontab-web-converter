import configs from "./config.json";
import Selectr from 'mobius1-selectr';
import { zones } from 'tzdata';
import 'regenerator-runtime/runtime';

// Update UTC crontab list. ApiKey is in clear text
const updateCrontab = async (url = '', apiKey = '', data = {}) => {
  try {
    const res = await fetch(url, {
      method: 'POST',
      cache: 'no-cache',
      mode: "cors",
      headers: {
        'Content-Type': 'application/json', 
        'X-api-key': apiKey
      },
      body: JSON.stringify(data)
    });
    const json = await res.json();

    document.querySelector('#output').innerHTML = json.join('<br>');
  } catch (error){
    document.querySelector('#output').innerHTML = `error: ${error}`;
  }
};


document.querySelector('#timezone').innerHTML = Object.keys(zones)
  .map(zone => `<option value="${zone}">${zone}</option>`)
  .join('');
document.querySelector('#timezone').value = "America/New_York";
const selector = new Selectr('#timezone', {width: 250});

document.querySelector('#input').onkeyup = updateCrontab;
document.querySelector('#timezone').onchange = updateCrontab;
selector.on('selectr.change', updateCrontab);

const localCrontab = document.querySelector('#input').value;
const timezone = document.querySelector('#timezone').value;

updateCrontab(configs.RestApiEndpoint, configs.RestApiKey, {"cron": localCrontab, "timezone": timezone});