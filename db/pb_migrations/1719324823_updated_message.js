/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ijeexdeukgs6nez")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "bn9qckjp",
    "name": "Recipient",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ijeexdeukgs6nez")

  // remove
  collection.schema.removeField("bn9qckjp")

  return dao.saveCollection(collection)
})
