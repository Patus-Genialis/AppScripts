function SendEmail(){
    var name = "Name collum";
    var email = "Email collum";

    var emailTemp = HtmlService.createTemplateFromFile("HTMLfile");

    var ws = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("SpreadsheetName");
    var data = ws.getRange("B2:O" + ws.getLastRow()).getValues();

    data.forEach(function(row){
      emailTemp.nome = row[name];
      var htmlMessage = emailTemp.evaluate().getContent();

      GmailApp.sendEmail(row[email],
       "Email subject",
        "ERRO menssage",
        {name: "Email name", htmlBody: htmlMessage});
    });
}