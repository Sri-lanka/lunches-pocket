/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("zzk2ei6mrdlhbzw")

  collection.options = {
    "query": "SELECT (ROW_NUMBER() OVER()) as id,u.id as idUser,u.username,u.name, u.last_name,c.N_sheet,u.state,u.document,u.email,u.telephone\nFROM characterization_sheet c, user_sheet us, users u\nWHERE c.id = us.id_sheet AND us.id_user = u.id;\n"
  }

  // remove
  collection.schema.removeField("mfesuyp8")

  // remove
  collection.schema.removeField("eheeiq9b")

  // remove
  collection.schema.removeField("orxcqkmi")

  // remove
  collection.schema.removeField("cukumeam")

  // remove
  collection.schema.removeField("nbdntvqj")

  // remove
  collection.schema.removeField("uktixdya")

  // remove
  collection.schema.removeField("bthxdhse")

  // remove
  collection.schema.removeField("8t9wmzju")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "wmthawe9",
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
    "id": "ympzc4cm",
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
    "id": "nehsj2uh",
    "name": "name",
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
    "id": "rdhlphqy",
    "name": "last_name",
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
    "id": "36aflxz5",
    "name": "N_sheet",
    "type": "number",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "noDecimal": false
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "jvr6yw2z",
    "name": "state",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "active",
        "disable"
      ]
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "4xmpzfxq",
    "name": "document",
    "type": "number",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "noDecimal": false
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "qxgtd2zo",
    "name": "email",
    "type": "email",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "exceptDomains": null,
      "onlyDomains": null
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "y9etlrtm",
    "name": "telephone",
    "type": "number",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "noDecimal": false
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("zzk2ei6mrdlhbzw")

  collection.options = {
    "query": "SELECT (ROW_NUMBER() OVER()) as id,u.id as idUser,u.username, u.last_name,c.N_sheet,u.state,u.document,u.email,u.telephone\nFROM characterization_sheet c, user_sheet us, users u\nWHERE c.id = us.id_sheet AND us.id_user = u.id;\n"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "mfesuyp8",
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
    "id": "eheeiq9b",
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
    "id": "orxcqkmi",
    "name": "last_name",
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
    "id": "cukumeam",
    "name": "N_sheet",
    "type": "number",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "noDecimal": false
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "nbdntvqj",
    "name": "state",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "active",
        "disable"
      ]
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "uktixdya",
    "name": "document",
    "type": "number",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "noDecimal": false
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "bthxdhse",
    "name": "email",
    "type": "email",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "exceptDomains": null,
      "onlyDomains": null
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "8t9wmzju",
    "name": "telephone",
    "type": "number",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "noDecimal": false
    }
  }))

  // remove
  collection.schema.removeField("wmthawe9")

  // remove
  collection.schema.removeField("ympzc4cm")

  // remove
  collection.schema.removeField("nehsj2uh")

  // remove
  collection.schema.removeField("rdhlphqy")

  // remove
  collection.schema.removeField("36aflxz5")

  // remove
  collection.schema.removeField("jvr6yw2z")

  // remove
  collection.schema.removeField("4xmpzfxq")

  // remove
  collection.schema.removeField("qxgtd2zo")

  // remove
  collection.schema.removeField("y9etlrtm")

  return dao.saveCollection(collection)
})
