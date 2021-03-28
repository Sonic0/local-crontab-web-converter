import configs from "./config.json";
import Selectr from 'mobius1-selectr';
import { zones } from 'tzdata';
import 'regenerator-runtime/runtime';

// Update UTC crontab list. ApiKey is in clear text
const updateCrontab = async (config = {}, data = {}) => {
  if (data['cron'].split(' ').length !== 5 ) {
    document.querySelector('#output').innerHTML = `error: Wrong crontab string length`;
    return
  }

  let output = "";
  try {
    const res = await fetch(config.RestApiEndpoint, {
      method: 'POST',
      cache: 'no-cache',
      mode: "cors",
      headers: {
        'Content-Type': 'application/json', 
        'X-api-key': config.RestApiKey
      },
      body: JSON.stringify(data)
    });

    if ([500, 404].includes(res['status'])) {
      const json = await res.json();
      output = `Error --> ${res['status']}, ${json['message']}`;
    } else {
      const json = await res.json();
      output = json.join('<br>');
    }
    
  } catch (error){
    output = `error: ${error}`;
  }

  document.querySelector('#output').innerHTML = output;
};


document.querySelector('#timezone').innerHTML = Object.keys(zones)
  .map(zone => `<option value="${zone}">${zone}</option>`)
  .join('');
document.querySelector('#timezone').value = "America/New_York";
const selector = new Selectr('#timezone', {width: 250});

// Create variables with current values
let localCrontab = document.querySelector('#input').value;
let timezone = document.querySelector('#timezone').value;

document.querySelector('#input').onkeyup = () => {
  localCrontab = document.querySelector('#input').value
  updateCrontab(configs, {"cron": localCrontab, "timezone": timezone});
};
document.querySelector('#timezone').onchange = () => {
  timezone = document.querySelector('#timezone').value;
};

// Update Crontab when Timezone changes
selector.on('selectr.change', () => updateCrontab(configs, {"cron": localCrontab, "timezone": timezone}));

// Default - Update Crontab when site opened
updateCrontab(configs, {"cron": localCrontab, "timezone": timezone});