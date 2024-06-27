/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("zzk2ei6mrdlhbzw")

  collection.options = {
    "query": "SELECT (ROW_NUMBER() OVER()) as id,c.N_sheet, u.username\nFROM characterization_sheet c, user_sheet us, users u\nWHERE c.id = us.id_sheet AND us.id_user = u.id;\n"
  }

  // remove
  collection.schema.removeField("0kl2grck")

  // remove
  collection.schema.removeField("sga7ne4k")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "otb5o0ol",
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
    "id": "3acgef3y",
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

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("zzk2ei6mrdlhbzw")

  collection.options = {
    "query": "SELECT c.N_sheet, u.username,(ROW_NUMBER() OVER()) as id\nFROM characterization_sheet c, user_sheet us, users u\nWHERE c.id = us.id_sheet AND us.id_user = u.id;\n"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "0kl2grck",
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
    "id": "sga7ne4k",
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
  collection.schema.removeField("otb5o0ol")

  // remove
  collection.schema.removeField("3acgef3y")

  return dao.saveCollection(collection)
})
