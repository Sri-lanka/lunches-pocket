/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ft0xiwcwz69llm2")

  collection.options = {
    "query": "SELECT \n   (ROW_NUMBER() OVER())  AS id,\n    u.username AS sender,\n    m.description,\n    m.Recipient,\n    m.field\nFROM \n    message m, users u\nWHERE \n  u.id = m.`idUser` and\n    m.typeMessage = 'report'\n    AND m.Recipient IS NOT NULL;"
  }

  // remove
  collection.schema.removeField("9l829khy")

  // remove
  collection.schema.removeField("x4jegzrj")

  // remove
  collection.schema.removeField("ts6kgrbt")

  // remove
  collection.schema.removeField("y0pebbbo")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "yesxjhqd",
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
    "id": "hzqdg6k5",
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
    "id": "61r258yu",
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
    "id": "uclhuqfr",
    "name": "field",
    "type": "file",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "mimeTypes": [],
      "thumbs": [],
      "maxSelect": 1,
      "maxSize": 5242880,
      "protected": false
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ft0xiwcwz69llm2")

  collection.options = {
    "query": "SELECT \n   (ROW_NUMBER() OVER())  AS id,\n    u.username AS sender,\n    m.description,\n    m.Recipient,\n    m.field\nFROM \n    message m, users u\nWHERE \n    m.typeMessage = 'report'\n    AND m.Recipient IS NOT NULL;"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "9l829khy",
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
    "id": "x4jegzrj",
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
    "id": "ts6kgrbt",
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
    "id": "y0pebbbo",
    "name": "field",
    "type": "file",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "mimeTypes": [],
      "thumbs": [],
      "maxSelect": 1,
      "maxSize": 5242880,
      "protected": false
    }
  }))

  // remove
  collection.schema.removeField("yesxjhqd")

  // remove
  collection.schema.removeField("hzqdg6k5")

  // remove
  collection.schema.removeField("61r258yu")

  // remove
  collection.schema.removeField("uclhuqfr")

  return dao.saveCollection(collection)
})
