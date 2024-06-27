/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "zzk2ei6mrdlhbzw",
    "created": "2024-06-27 14:51:43.478Z",
    "updated": "2024-06-27 14:51:43.478Z",
    "name": "es",
    "type": "view",
    "system": false,
    "schema": [
      {
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
      },
      {
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
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {
      "query": "SELECT c.N_sheet, u.username,(ROW_NUMBER() OVER()) as id\nFROM characterization_sheet c, user_sheet us, users u\nWHERE c.id = us.id_sheet AND us.id_user = u.id;\n"
    }
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("zzk2ei6mrdlhbzw");

  return dao.deleteCollection(collection);
})
