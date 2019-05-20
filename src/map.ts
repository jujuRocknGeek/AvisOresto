/******** ouvrir une nouvelle fenetre au clic *********/
$(document).ready(function(){
var info:any;
console.log("je suis dans map.ts")
$(".case").click(function(){
  info = $('p').html();
  console.log("tu as cliqué sur .case");
  PopupImage(info) 
});
})

function PopupImage(detail:any) 
{ 
  var titre:string;
  titre="test fonction"; 
  let w:any;
	w=open("",'image','width=400,height=400,toolbar=no,scrollbars=no,resizable=no'); 
	w.document.write("<HTML><HEAD><TITLE>"+titre+"</TITLE></HEAD>"); 
	w.document.write("<SCRIPT language=javascript>function checksize() { if (document.images[0].complete) { window.resizeTo(document.images[0].width+30,document.images[0].height+150); window.focus();} else { setTimeout('checksize()',250) } }</"+"SCRIPT>"); 
	w.document.write("<BODY onload='checksize()' onblur='window.close()' onclick='window.close()' leftMargin=0 topMargin=0 marginwidth=0 marginheight=0>");
	w.document.write("<TABLE width='100%' border='0' cellspacing='0' cellpadding='0' height='100%'><TR>");
        w.document.write("<TD valign='middle' align='center'>"); 
        w.document.write('<p>'+ detail +'</p>');
	w.document.write("</TD></TR></TABLE>");
	w.document.write("</BODY></HTML>"); 
	w.document.close(); 
}

