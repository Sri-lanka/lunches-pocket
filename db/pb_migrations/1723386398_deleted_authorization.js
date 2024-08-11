/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("5hm1n2lwr3s1f4z");

  return dao.deleteCollection(collection);
}, (db) => {
  const collection = new Collection({
    "id": "5hm1n2lwr3s1f4z",
    "created": "2024-05-29 20:17:20.336Z",
    "updated": "2024-07-18 13:57:41.234Z",
    "name": "authorization",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "gt5ihjn9",
        "name": "idAssistance",
        "type": "relation",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "4jkfz9jm1c8ngje",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": null
        }
      },
      {
        "system": false,
        "id": "ey6vbzkk",
        "name": "dateAplication",
        "type": "date",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": "",
          "max": ""
        }
      }
    ],
    "indexes": [],
    "listRule": "",
    "viewRule": "",
    "createRule": "",
    "updateRule": "",
    "deleteRule": "",
    "options": {}
  });

  return Dao(db).saveCollection(collection);
})
