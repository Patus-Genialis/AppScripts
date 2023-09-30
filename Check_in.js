function check_in() {
    var cpf = "cpf collum";
    var control = [];

    var ws = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("SpreadsheetName");
    var data = ws.getRange("B2:O" + ws.getLastRow()).getValues();

    var ck = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("check_inSpreadsheetName");
    var checked = ck.getRange("B2:B" + ck.getLastRow()).getValues();

    data.forEach(function(row){
      for (var i = 0; i <= ck.getLastRow(); i = i + 1){
        if (row[cpf] == checked[i]){
          ws.getRange(row[control], 14).setValue(true);
          break
        }
      }
    });
}