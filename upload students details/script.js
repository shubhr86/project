
$('#btn').on('click',function(){
    $("form").on("submit", function (e) {
        e.preventDefault();
    });
    var x = $('form').serializeArray();

    for(var i of x){
        if(i.value === ''){
            alert("Value can't be Empty");
            return;
        }
    }
    var detail = $(`<div>${x[0].name} - ${x[0].value}, ${x[1].value} has scored ${x[2].value}</div>`)
    $('#details-container').append(detail);
    $('form input').each(function(){
        $(this).val('');
    });
});