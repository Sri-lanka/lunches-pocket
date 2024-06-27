/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("zzk2ei6mrdlhbzw")

  collection.options = {
    "query": "SELECT (ROW_NUMBER() OVER()) as id,u.username, u.last_name,c.N_sheet,u.state\nFROM characterization_sheet c, user_sheet us, users u\nWHERE c.id = us.id_sheet AND us.id_user = u.id;\n"
  }

  // remove
  collection.schema.removeField("pexy2zzy")

  // remove
  collection.schema.removeField("8kwxqdvd")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "q01bv17h",
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
    "id": "yqvzgn7v",
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
    "id": "rxf9tmap",
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
    "id": "haiqreiq",
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

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("zzk2ei6mrdlhbzw")

  collection.options = {
    "query": "SELECT (ROW_NUMBER() OVER()) as id,c.N_sheet, u.username\nFROM characterization_sheet c, user_sheet us, users u\nWHERE c.id = us.id_sheet AND us.id_user = u.id;\n"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "pexy2zzy",
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
    "id": "8kwxqdvd",
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

  // remove
  collection.schema.removeField("q01bv17h")

  // remove
  collection.schema.removeField("yqvzgn7v")

  // remove
  collection.schema.removeField("rxf9tmap")

  // remove
  collection.schema.removeField("haiqreiq")

  return dao.saveCollection(collection)
})
