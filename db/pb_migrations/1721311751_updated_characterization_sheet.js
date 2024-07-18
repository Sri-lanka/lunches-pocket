/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("m9lpazfajk6x5os")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "knavrmex",
    "name": "end",
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
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("m9lpazfajk6x5os")

  // remove
  collection.schema.removeField("knavrmex")

  return dao.saveCollection(collection)
})
