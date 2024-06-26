/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("5hm1n2lwr3s1f4z")

  // remove
  collection.schema.removeField("lbijseb2")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("5hm1n2lwr3s1f4z")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "lbijseb2",
    "name": "idAuth",
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
})
