$(document).ready(function(){
    
    $(".selectAll").click(function(){
        let starAverage = $("aside");
        for(let i in starAverage){
            let noteStars:string = $(`aside:eq(${i})`).html();
            let noteNumber:number = parseInt(noteStars);
              $(`article:eq(${i})`).show();
        }  
      });
      
      $(".selectOne").click(selectOne);
      function selectOne(){
        let starAverage = $("aside");
        for(let i in starAverage){
            let noteStars:string = $(`aside:eq(${i})`).html();
            let noteNumber:number = parseInt(noteStars);
            if(noteNumber > 1){
              $(`article:eq(${i})`).hide();
              console.log("dans la fonction")
            }
            else{
                $(`article:eq(${i})`).show();
            }
        }
      }
      
      $(".selectTwoThree").click(selectTwoThree);
      function selectTwoThree(){
        let starAverage = $("aside");
        for(let i in starAverage){
            let noteStars:string = $(`aside:eq(${i})`).html();
            let noteNumber:number = parseInt(noteStars);
            if(noteNumber<2 || noteNumber>3){
              $(`article:eq(${i})`).hide();
            }
            else{
                $(`article:eq(${i})`).show();
            }
        }
      }
      
      $(".selectFourFive").click(selectFourFive);
      function selectFourFive(){
        let starAverage = $("aside");
        for(let i in starAverage){
            let noteStars:string = $(`aside:eq(${i})`).html();
            let noteNumber:number = parseInt(noteStars);
            if(noteNumber < 4){
              $(`article:eq(${i})`).hide();
            }
            else{
                $(`article:eq(${i})`).show();
            }
        }
      }

    $("#select").change(function (){
        $("#select option:selected").click();
    });

})
