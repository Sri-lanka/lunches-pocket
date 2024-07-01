/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ijeexdeukgs6nez")

  // remove
  collection.schema.removeField("cu4kc4ya")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ijeexdeukgs6nez")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "cu4kc4ya",
    "name": "dateSent",
    "type": "date",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": "",
      "max": ""
    }
  }))

  return dao.saveCollection(collection)
})
