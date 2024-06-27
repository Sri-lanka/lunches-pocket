/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ogg8fg39dwfmwzm")

  collection.options = {
    "query": "SELECT c.id ,c.`N_sheet` \n  from characterization_sheet c;\n"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "bt4fww9z",
    "name": "N_sheet",
    "type": "number",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "noDecimal": false
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ogg8fg39dwfmwzm")

  collection.options = {
    "query": "SELECT m.id \n  from message m;"
  }

  // remove
  collection.schema.removeField("bt4fww9z")

  return dao.saveCollection(collection)
})
