import { ObjectType, Client } from "../dist/index.js"

var rc = new Client("http://localhost:8080/");

rc.createObject(ObjectType.GAME, {
})
    .then(console.log)
    .catch(console.error);
