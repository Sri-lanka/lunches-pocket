/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ft0xiwcwz69llm2")

  collection.options = {
    "query": "SELECT \n   (ROW_NUMBER() OVER())  AS id,\n    u.id as idUser,\n    u.name AS sender,\n    m.description,\n    m.Recipient,\n    m.field,\n    m.created,\n    m.updated\n  \nFROM \n    message m, users u\nWHERE \n  (u.rol = \"admin\" or \"manager\") and\n  u.id = m.`idUser`and\n    m.type_message = 'report' ;\n    "
  }

  // remove
  collection.schema.removeField("mbgemi9u")

  // remove
  collection.schema.removeField("b9qudzqw")

  // remove
  collection.schema.removeField("gr9gcmd6")

  // remove
  collection.schema.removeField("mkdusjoc")

  // remove
  collection.schema.removeField("f5sbsedh")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ebbimoxu",
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
    "id": "if5qck2i",
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
    "id": "dnr36dan",
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
    "id": "yy9kmucq",
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
    "id": "pmoeygyt",
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
    "query": "SELECT \n   (ROW_NUMBER() OVER())  AS id,\n    u.id as idUser,\n    u.name AS sender,\n    m.description,\n    m.Recipient,\n    m.field,\n    m.created,\n    m.updated\n  \nFROM \n    message m, users u\nWHERE \n  (u.rol = \"admin\" or \"manager\") and\n  u.id = m.`idUser`and\n    m.type_message = 'report' and\n  m.`Recipient` != \"\";\n    "
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "mbgemi9u",
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
    "id": "b9qudzqw",
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
    "id": "gr9gcmd6",
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
    "id": "mkdusjoc",
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
    "id": "f5sbsedh",
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
  collection.schema.removeField("ebbimoxu")

  // remove
  collection.schema.removeField("if5qck2i")

  // remove
  collection.schema.removeField("dnr36dan")

  // remove
  collection.schema.removeField("yy9kmucq")

  // remove
  collection.schema.removeField("pmoeygyt")

  return dao.saveCollection(collection)
})
