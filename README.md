## Affin Hwang Assignment (Customer Information Management - DEMO)

### Node.js In Typescript
- This Project is using Node.js for API server, Vue SPA for Web Application, Firestore for Database.
- Hosting Vue SPA with node.js Express.
- I already hosted this demo project with Google Cloud Run, you may refer here [https://cim-api-7apwve7oma-as.a.run.app/]
- Reason for using Firestore: Easier way to showcase an end to end project without much setup needed.
- For project structure, I refer to [https://github.com/microsoft/TypeScript-Node-Starter]

### Vue.js
- For Vue.js, the structure is quite simple, I've only use one page, so no router needed.
- Store all the state in Vuex, calling action to do CRUD job.
- Use only one share component for Create, Edit & View. (views -> src -> components -> Customer -> CustomerDetail.vue).

### Infra
- Hosting this project with Google Cloud Run.
- Run it with docker (Dockerfile).
- Used pm2-runtime to run node.js, because this is the recommended way to run node.js on production.
- For gcr setup, you can refer to Makefile.
- Due to security issue, I didnt upload service-accoun.json.

Due to lack of time, I didn't have time to come out with any unit test.

And Finally, thanks.

