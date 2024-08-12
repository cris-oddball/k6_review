# k6_review
Overview of using K6 for notification load testing
[K6](https://k6.io/)

1. [Install K6](https://grafana.com/docs/k6/latest/set-up/install-k6/)
2. Pull down repo
3. To run the closed model test, which will wait for one request to finish before executing the next test. run `k6 run closed-model.js`
4. To run the open model test, which decouples the number of requests from the time it takes to get back a response from the first request, run ` k6 run open-model.js `

Read more at [Open and closed models](https://grafana.com/docs/k6/latest/using-k6/scenarios/concepts/open-vs-closed/) to better understand the difference between these tests. It is a differentiator for using K6.
