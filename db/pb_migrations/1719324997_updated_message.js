/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ijeexdeukgs6nez")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "fwt2bf6v",
    "name": "typeMessage",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "excuse",
        "report"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ijeexdeukgs6nez")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "fwt2bf6v",
    "name": "typeMessage",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 2,
      "values": [
        "excuse",
        "report"
      ]
    }
  }))

  return dao.saveCollection(collection)
})
