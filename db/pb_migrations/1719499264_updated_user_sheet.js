/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("jvoraxb6ymu5euq")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "tkaddpnh",
    "name": "id_sheet",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "m9lpazfajk6x5os",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("jvoraxb6ymu5euq")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "tkaddpnh",
    "name": "id_file",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "m9lpazfajk6x5os",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
})
