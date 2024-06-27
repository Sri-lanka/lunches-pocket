/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "ogg8fg39dwfmwzm",
    "created": "2024-06-27 13:56:20.445Z",
    "updated": "2024-06-27 13:56:20.445Z",
    "name": "query",
    "type": "view",
    "system": false,
    "schema": [],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {
      "query": "SELECT m.id from message m;"
    }
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("ogg8fg39dwfmwzm");

  return dao.deleteCollection(collection);
})
