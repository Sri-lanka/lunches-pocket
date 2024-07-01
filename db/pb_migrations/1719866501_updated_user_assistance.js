/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("8lsety9gonrjqhw")

  collection.options = {
    "query": "SELECT (ROW_NUMBER() OVER()) as id, u.id as idUser, u.username, a.verification, a.created\n  from users u, assistance a  \nWHERE  u.rol = \"user\" and u.id = a.`idUser` ;"
  }

  // remove
  collection.schema.removeField("c8wf2lov")

  // remove
  collection.schema.removeField("sxibdfag")

  // remove
  collection.schema.removeField("sc4ewri5")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ewtkavjw",
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
    "id": "gf5mzuvr",
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
    "id": "o4dur0z2",
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
    "query": "SELECT (ROW_NUMBER() OVER()) as id, u.id as idUser, u.username, a.verification, a.created\n  from users u, assistance a  \nWHERE  u.rol = \"user\" ;"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "c8wf2lov",
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
    "id": "sxibdfag",
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
    "id": "sc4ewri5",
    "name": "verification",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  // remove
  collection.schema.removeField("ewtkavjw")

  // remove
  collection.schema.removeField("gf5mzuvr")

  // remove
  collection.schema.removeField("o4dur0z2")

  return dao.saveCollection(collection)
})
