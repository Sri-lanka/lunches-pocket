/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ft0xiwcwz69llm2")

  collection.options = {
    "query": "SELECT \n   (ROW_NUMBER() OVER())  AS id,\n    u.username AS sender,\n    m.description,\n    m.Recipient,\n    m.field\nFROM \n    message m, users u\nWHERE \n    m.typeMessage = 'report'\n    AND m.Recipient IS NOT NULL;"
  }

  // remove
  collection.schema.removeField("tdhkljfm")

  // remove
  collection.schema.removeField("y6rrczj6")

  // remove
  collection.schema.removeField("ldcy22yh")

  // remove
  collection.schema.removeField("wn98noi0")

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

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ft0xiwcwz69llm2")

  collection.options = {
    "query": "SELECT (ROW_NUMBER() OVER()) as id, u.username as sender, m.description, m.`Recipient`, m.field\n  from users u, message m  \n  WHERE m.`typeMessage` = \"report\" and m.`Recipient` is NOT NULL;"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "tdhkljfm",
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
    "id": "y6rrczj6",
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
    "id": "ldcy22yh",
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
    "id": "wn98noi0",
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
  collection.schema.removeField("9l829khy")

  // remove
  collection.schema.removeField("x4jegzrj")

  // remove
  collection.schema.removeField("ts6kgrbt")

  // remove
  collection.schema.removeField("y0pebbbo")

  return dao.saveCollection(collection)
})
