/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("hxsyymd6tdt2ixx")

  collection.options = {
    "query": "SELECT (ROW_NUMBER() OVER()) as id, m.idUser, u.name as sender, m.description, m.`Recipient` as Recipient, m.field, m.created,m.updated\n  from users u, message m  \nWHERE  u.rol = \"admin\" and m.`idUser` = u.id and (m.`Recipient` = \"\") ;"
  }

  // remove
  collection.schema.removeField("si3l9hrt")

  // remove
  collection.schema.removeField("alu24vum")

  // remove
  collection.schema.removeField("hkl4vgxw")

  // remove
  collection.schema.removeField("aiepnwqo")

  // remove
  collection.schema.removeField("rgj2krew")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "mljmym84",
    "name": "idUser",
    "type": "relation",
    "required": true,
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
    "id": "2bhzrpog",
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
    "id": "eqofae1v",
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
    "id": "zoixijxe",
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
    "id": "llvu29c1",
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
  const collection = dao.findCollectionByNameOrId("hxsyymd6tdt2ixx")

  collection.options = {
    "query": "SELECT (ROW_NUMBER() OVER()) as id, m.idUser, u.name as sender, m.description, m.`Recipient`, m.field, m.created,m.updated\n  from users u, message m  \nWHERE  u.rol = \"admin\" and m.`idUser` = u.id and (m.`Recipient` = \"\") ;"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "si3l9hrt",
    "name": "idUser",
    "type": "relation",
    "required": true,
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
    "id": "alu24vum",
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
    "id": "hkl4vgxw",
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
    "id": "aiepnwqo",
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
    "id": "rgj2krew",
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
  collection.schema.removeField("mljmym84")

  // remove
  collection.schema.removeField("2bhzrpog")

  // remove
  collection.schema.removeField("eqofae1v")

  // remove
  collection.schema.removeField("zoixijxe")

  // remove
  collection.schema.removeField("llvu29c1")

  return dao.saveCollection(collection)
})
