import './index.html';
import 'webpack-hot-middleware/client';
import $ from 'jquery';
import sum from './sum';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './main.css';

$(() => {
  console.log('Ready!')

  $('form').on('submit', (e) => {
    e.preventDefault();
    let mail = {};
    mail.address = $('input[type=email]').val();
    mail.subject = $('input[type=text]').val();
    mail.message = $('textarea').val();
    console.log(mail);

    $.ajax({
      url: "http://localhost:3000/mail",
      method: "POST",
      contentType: "application/json",
      dataType: "json",
      data: JSON.stringify(mail)
    }).done((data) => {
      console.log(data);
      if(data.err === 0) {
        $('form').empty();
        const success = `<div class="alert alert-primary" role="alert">
            Email was sent successfully.
        </div>`
        $('form').append(success);
      }
      else {
        $('form').empty();
        const success = `<div class="alert alert-primary" role="alert">
            There was an error sending the email.
        </div>`
        $('form').append(success);
      }
    }); // end done
  }) // end form submit event listener
}); // end ready