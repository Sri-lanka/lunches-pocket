/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ogg8fg39dwfmwzm")

  collection.options = {
    "query": "SELECT c.id ,us.id_user, c.`N_sheet`,u.username\n  from characterization_sheet c,user_sheet us,users u  \nWHERE c.id =  us.id_sheet and us.id_user = u.id;"
  }

  // remove
  collection.schema.removeField("tuunbppn")

  // remove
  collection.schema.removeField("ntd6lwzb")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "8dj8pxxi",
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
    "id": "51fhoqb4",
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "uzqgv2wx",
    "name": "username",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ogg8fg39dwfmwzm")

  collection.options = {
    "query": "SELECT c.id ,us.id_user, c.`N_sheet`\n  from characterization_sheet c,user_sheet us  \nWHERE c.id =  us.id_sheet;"
  }

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

  // remove
  collection.schema.removeField("8dj8pxxi")

  // remove
  collection.schema.removeField("51fhoqb4")

  // remove
  collection.schema.removeField("uzqgv2wx")

  return dao.saveCollection(collection)
})
