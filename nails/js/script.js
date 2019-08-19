$(document).ready(function(){
  $('.photo__list').owlCarousel({
    loop:true,
    margin:10,
    nav:true,
    responsive:{
        0:{
            stagePadding: 40,
            items:1
        },
        660:{
            stagePadding: 40,
            items:2
        },
        1200:{
            stagePadding: 40,
            items:3
        }
    }
})

  $('.reviews__list').owlCarousel({
    loop:true,
    margin:10,
    nav:true,
    responsive:{
        0:{
            items:1
        },
        660:{
            items:1
        },
        1200:{
            items:3
        }
    }
})
});

// Main navigation toggle

var mainNav = document.querySelector('.main-nav');
var mainNavToggle = document.querySelector('.main-nav__toggle');
mainNavToggle.addEventListener('click', function() {
    if(mainNav.classList.contains('main-nav--closed')) {
        mainNav.classList.remove('main-nav--closed');
        mainNav.classList.add('main-nav--opened');
    } else {
        mainNav.classList.remove('main-nav--opened');
        mainNav.classList.add('main-nav--closed');
    }
}) 



// Form

$(document).ready(function() { // вся магия после загрузки страницы
    $("#booking__form").submit(function(){ // перехватываем все при событии отправки
        var form = $(this); // запишем форму, чтобы потом не было проблем с this
        var error = false; // предварительно ошибок нет
        var nameInput = document.querySelector('#name');
        var phoneInput = document.querySelector('#phone');
        var counter = 0; // счетчик пустых инпутов
        var message = document.querySelector('.booking__message');
        
        form.find('input, textarea').each( function(){ // пробежим по каждому полю в форме
            var inputId = $(this).attr('id'); // получаем id поля
            var input = document.querySelector('#'+inputId); // получаем DOM элемент
            
            if ($(this).val() == '') { // если находим пустое
                input.classList.add('booking__form-input--error'); // добавляем ему класс (выделение красным)
                message.innerHTML = 'Заполните все поля!'; // выводим надпись
                message.classList.add('booking__message--error');
                // alert('Заполните поле "'+$(this).attr('placeholder')+'"!'); // говорим заполняй!
                error = true; // ошибка
                counter++;
            } else {
                if(input.classList.contains('booking__form-input--error')) {
                    input.classList.remove('booking__form-input--error');
                }
            }    

            if (counter == 0) {
                message.innerHTML = '';  // нет пустых инпутов - убираем предупреждение
                if (message.classList.contains('booking__message--error')) {
                    message.classList.remove('booking__message--error');
                }
            }
                
            
            
        });
        if (!error) { // если ошибки нет
            var data = form.serialize(); // подготавливаем данные
            $.ajax({ // инициализируем ajax запрос
               type: 'POST', // отправляем в POST формате, можно GET
               url: 'gogogo.php', // путь до обработчика, у нас он лежит в той же папке
               dataType: 'json', // ответ ждем в json формате
               data: data, // данные для отправки
               beforeSend: function(data) { // событие до отправки
                    form.find('input[type="submit"]').attr('disabled', 'disabled'); // например, отключим кнопку, чтобы не жали по 100 раз
                  },
               success: function(data){ // событие после удачного обращения к серверу и получения ответа
                    if (data['error']) { // если обработчик вернул ошибку
                        alert(data['error']); // покажем её текст
                    } else { // если все прошло ок
                        message.innerHTML = 'Спасибо! <br/>Мы перезвоним Вам в ближайшее время!'; // пишем что все ок
                        document.querySelector('.booking__form').reset();
                    }
                 },
               error: function (xhr, ajaxOptions, thrownError) { // в случае неудачного завершения запроса к серверу
                    alert(xhr.status); // покажем ответ сервера
                    alert(thrownError); // и текст ошибки
                 },
               complete: function(data) { // событие после любого исхода
                    form.find('input[type="submit"]').prop('disabled', false); // в любом случае включим кнопку обратно
                 }
                          
                 });
        }
        return false; // вырубаем стандартную отправку формы
    });
});



// B-Lazy
    var bLazy = new Blazy({
    //     breakpoints: [{
    //     width: 420 // Max-width
    //       , src: 'data-src-small'
    // }]
    //   , 
        success: function(element){
        setTimeout(function(){
        // We want to remove the loader gif now.
        // First we find the parent container
        // then we remove the "loading" class which holds the loader image
        var parent = element.parentNode;
        parent.className = parent.className.replace(/\bloading\b/,'');
        }, 200);
        }
   });