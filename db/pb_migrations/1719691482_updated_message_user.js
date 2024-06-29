/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ogg8fg39dwfmwzm")

  collection.options = {
    "query": "SELECT (ROW_NUMBER() OVER()) as id,u.username as sender\n  from users u, message m  "
  }

  // remove
  collection.schema.removeField("ieqxgxnp")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "geusaoml",
    "name": "sender",
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
    "query": "SELECT (ROW_NUMBER() OVER()) as id,u.username\n  from characterization_sheet c,user_sheet us,users u  \nWHERE c.id =  us.id_sheet and us.id_user = u.id;"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ieqxgxnp",
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

  // remove
  collection.schema.removeField("geusaoml")

  return dao.saveCollection(collection)
})
