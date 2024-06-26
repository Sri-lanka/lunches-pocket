/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("m9lpazfajk6x5os")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "6u3tgodz",
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
  const collection = dao.findCollectionByNameOrId("m9lpazfajk6x5os")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "6u3tgodz",
    "name": "2670120",
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
