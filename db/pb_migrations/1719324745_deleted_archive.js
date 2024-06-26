/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("r8rcurgufvb7s6h");

  return dao.deleteCollection(collection);
}, (db) => {
  const collection = new Collection({
    "id": "r8rcurgufvb7s6h",
    "created": "2024-05-29 20:06:29.002Z",
    "updated": "2024-05-29 20:06:29.002Z",
    "name": "archive",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "x8zkavoc",
        "name": "archivePdf",
        "type": "file",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "mimeTypes": [],
          "thumbs": [],
          "maxSelect": 1,
          "maxSize": 5242880,
          "protected": false
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
})
