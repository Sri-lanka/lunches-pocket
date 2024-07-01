/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("4jkfz9jm1c8ngje")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "vws2qilb",
    "name": "verification",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("4jkfz9jm1c8ngje")

  // remove
  collection.schema.removeField("vws2qilb")

  return dao.saveCollection(collection)
})
