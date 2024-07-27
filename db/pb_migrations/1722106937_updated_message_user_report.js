/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ft0xiwcwz69llm2")

  collection.options = {
    "query": "SELECT \n   (ROW_NUMBER() OVER())  AS id,\n    u.id as idUser,\n    u.name AS sender,\n    m.description,\n    m.Recipient,\n    m.field,\n    m.created,\n    m.updated\n  \nFROM \n    message m, users u\nWHERE \n  (u.rol = \"manager\" or u.rol =\"admin\") and\n  u.id = m.`idUser`and\n  m.type_message = 'report' and \n  m.`Recipient` != \" \";\n    "
  }

  // remove
  collection.schema.removeField("lfiqvlja")

  // remove
  collection.schema.removeField("rodq3dkk")

  // remove
  collection.schema.removeField("m4yknln2")

  // remove
  collection.schema.removeField("peoagblo")

  // remove
  collection.schema.removeField("aesrey6a")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "gxgqzv7s",
    "name": "idUser",
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
    "id": "hdebtviv",
    "name": "sender",
    "type": "text",
    "required": true,
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
    "id": "wtvhretq",
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
    "id": "yabivkqz",
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
    "id": "61iz889a",
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
    "query": "SELECT \n   (ROW_NUMBER() OVER())  AS id,\n    u.id as idUser,\n    u.name AS sender,\n    m.description,\n    m.Recipient,\n    m.field,\n    m.created,\n    m.updated\n  \nFROM \n    message m, users u\nWHERE \n  (u.rol = \"manager\" or u.rol =\"admin\") and\n  u.id = m.`idUser`and\n  m.type_message = 'report' ;\n    "
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "lfiqvlja",
    "name": "idUser",
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
    "id": "rodq3dkk",
    "name": "sender",
    "type": "text",
    "required": true,
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
    "id": "m4yknln2",
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
    "id": "peoagblo",
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
    "id": "aesrey6a",
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
  collection.schema.removeField("gxgqzv7s")

  // remove
  collection.schema.removeField("hdebtviv")

  // remove
  collection.schema.removeField("wtvhretq")

  // remove
  collection.schema.removeField("yabivkqz")

  // remove
  collection.schema.removeField("61iz889a")

  return dao.saveCollection(collection)
})
