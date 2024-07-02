/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("8lsety9gonrjqhw")

  collection.options = {
    "query": "SELECT a.id as id, u.id as idUser, u.username, a.verification, a.created\n  from users u, assistance a  \nWHERE  u.rol = \"user\" and u.id = a.`idUser` ;"
  }

  // remove
  collection.schema.removeField("nnldfi45")

  // remove
  collection.schema.removeField("rrcwe0mk")

  // remove
  collection.schema.removeField("atcpexw7")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "niron4p2",
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
    "id": "knbrjssk",
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "tiwvagih",
    "name": "verification",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("8lsety9gonrjqhw")

  collection.options = {
    "query": "SELECT (ROW_NUMBER() OVER()) as id, u.id as idUser, u.username, a.verification, a.created\n  from users u, assistance a  \nWHERE  u.rol = \"user\" and u.id = a.`idUser` ;"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "nnldfi45",
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
    "id": "rrcwe0mk",
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "atcpexw7",
    "name": "verification",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  // remove
  collection.schema.removeField("niron4p2")

  // remove
  collection.schema.removeField("knbrjssk")

  // remove
  collection.schema.removeField("tiwvagih")

  return dao.saveCollection(collection)
})
