/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ogg8fg39dwfmwzm")

  collection.options = {
    "query": "SELECT (ROW_NUMBER() OVER()) as id, u.username as sender, m.description, m.`Recipient`, m.`typeMessage`\n  from users u, message m  \nWHERE m.`typeMessage` = \"excuse\" and u.rol = \"user\""
  }

  // remove
  collection.schema.removeField("evdsxxsb")

  // remove
  collection.schema.removeField("o3jo2be1")

  // remove
  collection.schema.removeField("xolvwfyc")

  // remove
  collection.schema.removeField("o9judt9v")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "lls9wemp",
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "s6k7oj5k",
    "name": "description",
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "8ujavqg6",
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "1kikn1nl",
    "name": "typeMessage",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "excuse",
        "report"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ogg8fg39dwfmwzm")

  collection.options = {
    "query": "SELECT (ROW_NUMBER() OVER()) as id, u.username as sender, m.description, m.`Recipient`, m.`typeMessage`\n  from users u, message m  \nWHERE m.`typeMessage` = \"excuse\""
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "evdsxxsb",
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "o3jo2be1",
    "name": "description",
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "xolvwfyc",
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "o9judt9v",
    "name": "typeMessage",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "excuse",
        "report"
      ]
    }
  }))

  // remove
  collection.schema.removeField("lls9wemp")

  // remove
  collection.schema.removeField("s6k7oj5k")

  // remove
  collection.schema.removeField("8ujavqg6")

  // remove
  collection.schema.removeField("1kikn1nl")

  return dao.saveCollection(collection)
})
