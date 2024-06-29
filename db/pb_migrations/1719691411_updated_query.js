/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ogg8fg39dwfmwzm")

  collection.name = "message_user"

  // remove
  collection.schema.removeField("46ewkssr")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ieqxgxnp",
    "name": "username",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ogg8fg39dwfmwzm")

  collection.name = "query"

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "46ewkssr",
    "name": "username",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // remove
  collection.schema.removeField("ieqxgxnp")

  return dao.saveCollection(collection)
})
