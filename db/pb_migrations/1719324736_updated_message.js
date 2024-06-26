/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ijeexdeukgs6nez")

  // remove
  collection.schema.removeField("f79zn0bz")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ijeexdeukgs6nez")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "f79zn0bz",
    "name": "idArchive",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "r8rcurgufvb7s6h",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
})
