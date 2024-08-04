/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ogg8fg39dwfmwzm")

  collection.options = {
    "query": "SELECT (ROW_NUMBER() OVER()) as id,m.id as idMessage, m.idUser, u.name as sender, m.description, m.`Recipient`, m.field, m.approved, m.created,m.updated\n  from users u, message m  \nWHERE  u.rol = \"user\" and m.`idUser` = u.id and (m.`Recipient` = \"\")   ;"
  }

  // remove
  collection.schema.removeField("vojbshwm")

  // remove
  collection.schema.removeField("yzezvmic")

  // remove
  collection.schema.removeField("gs4zdhpe")

  // remove
  collection.schema.removeField("wjcsgoxe")

  // remove
  collection.schema.removeField("hllddxwy")

  // remove
  collection.schema.removeField("lclzo7mi")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "a9z4xnim",
    "name": "idMessage",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "ijeexdeukgs6nez",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "grydijjt",
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
    "id": "vjfu9u1l",
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
    "id": "vhwczjyp",
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
    "id": "b7utp2wi",
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
    "id": "hvrtt0co",
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "zyx7yqur",
    "name": "approved",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "Yes",
        "No",
        "Pending"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ogg8fg39dwfmwzm")

  collection.options = {
    "query": "SELECT (ROW_NUMBER() OVER()) as id, m.idUser, u.name as sender, m.description, m.`Recipient`, m.field, m.approved, m.created,m.updated\n  from users u, message m  \nWHERE  u.rol = \"user\" and m.`idUser` = u.id and (m.`Recipient` = \"\")   ;"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "vojbshwm",
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
    "id": "yzezvmic",
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
    "id": "gs4zdhpe",
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
    "id": "wjcsgoxe",
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
    "id": "hllddxwy",
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "lclzo7mi",
    "name": "approved",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "Yes",
        "No",
        "Pending"
      ]
    }
  }))

  // remove
  collection.schema.removeField("a9z4xnim")

  // remove
  collection.schema.removeField("grydijjt")

  // remove
  collection.schema.removeField("vjfu9u1l")

  // remove
  collection.schema.removeField("vhwczjyp")

  // remove
  collection.schema.removeField("b7utp2wi")

  // remove
  collection.schema.removeField("hvrtt0co")

  // remove
  collection.schema.removeField("zyx7yqur")

  return dao.saveCollection(collection)
})
