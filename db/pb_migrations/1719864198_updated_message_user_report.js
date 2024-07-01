/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ft0xiwcwz69llm2")

  collection.options = {
    "query": "SELECT \n   (ROW_NUMBER() OVER())  AS id,\n    u.username AS sender,\n    m.description,\n    m.Recipient,\n    m.field,\n    m.created,\n    m.updated\n  \nFROM \n    message m, users u\nWHERE \n  u.id = m.`idUser` and\n    m.typeMessage = 'report'\n    "
  }

  // remove
  collection.schema.removeField("qfz2rdfu")

  // remove
  collection.schema.removeField("8z04kfnd")

  // remove
  collection.schema.removeField("baolzyfp")

  // remove
  collection.schema.removeField("pio5akec")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "qjj4uivi",
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
    "id": "met6ralb",
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
    "id": "dqnaixzc",
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
    "id": "vahfnmr2",
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
    "query": "SELECT \n   (ROW_NUMBER() OVER())  AS id,\n    u.username AS sender,\n    m.description,\n    m.Recipient,\n    m.field\n  \nFROM \n    message m, users u\nWHERE \n  u.id = m.`idUser` and\n    m.typeMessage = 'report'\n    "
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "qfz2rdfu",
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
    "id": "8z04kfnd",
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
    "id": "baolzyfp",
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
    "id": "pio5akec",
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
  collection.schema.removeField("qjj4uivi")

  // remove
  collection.schema.removeField("met6ralb")

  // remove
  collection.schema.removeField("dqnaixzc")

  // remove
  collection.schema.removeField("vahfnmr2")

  return dao.saveCollection(collection)
})
