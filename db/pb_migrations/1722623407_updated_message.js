/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ijeexdeukgs6nez")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "l1hqntyi",
    "name": "approved",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "Yes",
        "No"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ijeexdeukgs6nez")

  // remove
  collection.schema.removeField("l1hqntyi")

  return dao.saveCollection(collection)
})
