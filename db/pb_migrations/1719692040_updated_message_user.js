/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ogg8fg39dwfmwzm")

  collection.options = {
    "query": "SELECT (ROW_NUMBER() OVER()) as id, u.username as sender, m.description, m.`Recipient`, m.`typeMessage`\n  from users u, message m  \nWHERE  u.rol = \"user\" and m.`idUser` = u.id"
  }

  // remove
  collection.schema.removeField("lls9wemp")

  // remove
  collection.schema.removeField("s6k7oj5k")

  // remove
  collection.schema.removeField("8ujavqg6")

  // remove
  collection.schema.removeField("1kikn1nl")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ntjn8mlc",
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
    "id": "tqjdj8sw",
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
    "id": "9lazdyl1",
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
    "id": "dvkgzs39",
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
    "query": "SELECT (ROW_NUMBER() OVER()) as id, u.username as sender, m.description, m.`Recipient`, m.`typeMessage`\n  from users u, message m  \nWHERE m.`typeMessage` = \"excuse\" and u.rol = \"user\""
  }

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

  // remove
  collection.schema.removeField("ntjn8mlc")

  // remove
  collection.schema.removeField("tqjdj8sw")

  // remove
  collection.schema.removeField("9lazdyl1")

  // remove
  collection.schema.removeField("dvkgzs39")

  return dao.saveCollection(collection)
})
