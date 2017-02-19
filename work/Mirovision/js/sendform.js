(function($){
    $(function(){
        //alert('success');
        $('.inp_submt').on('click', function(){
            var num = $(this).parents('form').find('.inp_num').val();
            var text = $(this).parents('form').find('.inp_name').val();
            var phone = $(this).parents('form').find('.inp_phone').val();
            var theme = $(this).parents('form').find('.inp_mail').val();
            var pop1 = '.popup'+num;
            var pop2 = '.overlay'+num;
            if(phone.length != 0){
                $(this).parents('form').find('.inp_phone, .inp_name, .inp_mail').css('border-color', '#E4E4E4');
                var data = {name: text, phone: phone, theme: theme};
                var allData = JSON.stringify(data);
                $.post(
                    './sendform.php',
                    {'data': allData},
                    function(data){
                        if(data == 'Success'){
                            // Сюда записываем что должно происходить после успешной отправки.
                            // Сначала закрываем попапы, что были открыты
                            $(pop1).css('opacity','0');
                            $(pop1).css('visibility','hidden');
                            $(pop2).css('opacity','0');
                            $(pop2).css('visibility','hidden');

                            //Открываем попап благодарности
                            $('.popup16, .overlay16').css('opacity','1');
                            $('.popup16, .overlay16').css('visibility','visible');
                        }
                    }
                );
                return false;
            }else{
                $(this).parents('form').find('.inp_phone, .inp_name, .inp_mail').css('border', '1px solid red');
                return false;
            }
        });

        
    })
})(jQuery);