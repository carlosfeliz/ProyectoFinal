$(document).ready(function(){
  $("#myInput").on("keyup", function() {
    $("#tipo option[value='2'").attr("selected",true);
     // alert('xcv');
    var value = $(this).val().toLowerCase();
    $("#myTable tr").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });

 $("#myInput2").on("keyup", function() {
    // alert('xcv');
   var value = $(this).val().toLowerCase();
   $("#myTable2 tr").filter(function() {
     $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
   });
 });

 /*$('select').on('change', function() {
    alert( $(this).find(":selected").val() );
});*/

$("#tipo").on("change", function() {
    // alert('xcv');
   var value = $(this).val().toLowerCase();
   $("#myTable tr").filter(function() {
     $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
   });
 });



});