# k6_review
Overview of using K6 for notification load testing
[K6](https://k6.io/)

1. [Install K6](https://grafana.com/docs/k6/latest/set-up/install-k6/)
2. Pull down repo
3. To run the closed model test, which will wait for one request to finish before executing the next test. run `k6 run closed-model.js`
4. To run the open model test, which decouples the number of requests from the time it takes to get back a response from the first request, run ` k6 run open-model.js `

Read more at [Open and closed models](https://grafana.com/docs/k6/latest/using-k6/scenarios/concepts/open-vs-closed/) to better understand the difference between these tests. It is a differentiator for using K6.


The email load test in  `email-load-test.js`, successfully generates a bearer token but returns a 403 
```
{"status_code":403,"errors":[{"error":"AuthError","message":"Invalid token: signature, api token is not valid"}]}
```

If you want to experiement with this test, run the following command, supplying the environment variables:
```
k6 run email-load-test.js --env API_KEY='<a perf api key>' --env SERVICE_ID='<a perf service id>' --env EMAIL_ADDRESS='<an email address>' --env EMAIL_TEMPLATE_ID='<a perf template id in the service>'
```

Note that something like dotenv cannot be used in k6. There are other options for passing in configs in k6, but this was the most straightfoward way for a POC.