const SLIDEID = "Certificate_Template_ID"
const FOLDERID = "Folder_ID"

var folder = DriveApp.getFolderById(FOLDERID); 
var emailTemp = HtmlService.createTemplateFromFile("HTMLemail");

function Select() {
  var ws = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("SpreadsheetName");
  var data = ws.getRange("B2:O" + ws.getLastRow()).getValues();

  generate_cert(data)
}

function cria_cert(data){
  var temp
  var name = "Name collum";
  var email = "Email collum";

  data.forEach(function(row){

    var file = temp.makeCopy(folder);
    var slide = SlidesApp.openById(file.getId());

    slide.replaceAllText("{{Name}}", row[name]);
    slide.setName(row[name]);
    slide.saveAndClose();
    var sid = slide.getId();
    var blob = DriveApp.getFileById(sid).getBlob();
    var pdf = folder.createFile(blob);
    DriveApp.getFileById(sid).setTrashed(true);

    emailTemp.nome = row[name];
    var htmlMessage = emailTemp.evaluate().getContent();

    GmailApp.sendEmail(row[email],
      "email subject",
      "ERRO menssage",
      {name: "Email name", htmlBody: htmlMessage, attachments: pdf});
  });
}