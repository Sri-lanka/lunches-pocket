/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ogg8fg39dwfmwzm")

  collection.options = {
    "query": "SELECT c.id ,us.id_user, c.`N_sheet`\n  from characterization_sheet c,user_sheet us  \nWHERE c.id =  us.id_sheet;"
  }

  // remove
  collection.schema.removeField("bt4fww9z")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "tuunbppn",
    "name": "id_user",
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ntd6lwzb",
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

  // remove
  collection.schema.removeField("tuunbppn")

  // remove
  collection.schema.removeField("ntd6lwzb")

  return dao.saveCollection(collection)
})
