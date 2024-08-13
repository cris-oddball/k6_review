import crypto from 'k6/crypto';
import encoding from 'k6/encoding';
import http from 'k6/http';
import { sleep } from 'k6';

console.log(__ENV.SERVICE_ID) // remove this after you've confirmed it is working
console.log(__ENV.API_KEY) // remove this after you've confirmed it is working

const url = 'https://sandbox-api.va.gov/vanotify/v2/notifications/email'

// Create a JWT token
function createJWT(header, payload, secret) {
  const encodedHeader = encoding.b64encode(JSON.stringify(header), 'url');
  const encodedPayload = encoding.b64encode(JSON.stringify(payload), 'url');
  
  const token = `${encodedHeader}.${encodedPayload}`;
  const signature = crypto.hmac('sha256', secret, token, 'hex');
  
  return `${token}.${encoding.b64encode(signature, 'url')}`;
}


export const options = {
  // A number specifying the number of VUs to run concurrently.
  vus: 1,
  // A string specifying the total duration of the test run.
  duration: '1s',
};

export function setup() {
  const serviceId = __ENV.SERVICE_ID;
  const apiKey = __ENV.API_KEY;
  const currentTimestamp = Math.floor(Date.now() / 1000);

  const header = {
      typ: 'JWT',
      alg: 'HS256',
  };

  const payload = {
      iss: serviceId,
      iat: currentTimestamp,
      exp: currentTimestamp + 30,
      jti: 'jwt_nonce',
  };

  const jwtToken = createJWT(header, payload, apiKey);
  console.log('Generated JWT:', jwtToken); // remove this after you've confirmed it is working
  return jwtToken
}

// The function that defines VU logic.
//
// See https://grafana.com/docs/k6/latest/examples/get-started-with-k6/ to learn more
// about authoring k6 scripts.
//
export default function(authToken) {

  console.log(authToken)
  const templateId = __ENV.EMAIL_TEMPLATE_ID
  const emailAddress = __ENV.EMAIL_ADDRESS

  let data = { 
    template_id: templateId,
    email_address: emailAddress
  };

  let res = http.post(url, JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ${authToken}' },
  });
  console.log(res.json())

  // http.get('https://test.k6.io');
  sleep(1);
}
