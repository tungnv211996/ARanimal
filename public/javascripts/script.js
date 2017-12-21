
$(function () {

  var name;
  var cost;
  var state;
  var area;
  var summary;
  var idAnimal;
  var path;
  var data
  $(".button-collapse").sideNav();
  // $('#p').hide();
  localStorage.setItem('check', false)
  $('#get-button').trigger('click');
  //user

  const HOST = 'https://aranimal.herokuapp.com'
  // const HOST = 'http://localhost:3000'
  $("#login").on("click", function (event) {
    var username = $('#username').val();
    var password = $('#password').val();
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    $.ajax({
      url: "/login",
      method: 'POST',
      contentType: 'application/json',
      dataType: "json",
      data: JSON.stringify({
        username: username,
        password: password
      }),
      success: function (result) {
        localStorage.setItem('token', result.token)
        localStorage.setItem('username', username)
        //Materialize.toast('Loggin successful', 4000);
        window.location.href = HOST + "/index";
      },
      error: function (jqXHR, exc) {
        let json = $.parseJSON(jqXHR.responseText)
        Materialize.toast(json['status'], 4000);

      }
    });
  })

  // GET function
  $(document).on('click', '#get-button', function () {

    $('#view').show();
    $('#form').hide();

    $.ajax({
      url: '/api/view',
      method: 'GET',
      contentType: 'application/json',
      headers: {
        token: localStorage.getItem('token')
      },
      success: function (res) {
        var data = res.animals;
        // Clear the thead, tbody
        $('tbody').html('');
        $('thead').html('');
        // Loop and append

        $('thead').append(
          `  <tr>
            <th>Name </th>
            <th>State</th>
            <th>Cost</th>
            <th>Area</th>
            <th>Summary</th>
            <th></th>
          </tr>`
        )
        data.forEach(function print(animal) {
          $('tbody').append(
            '<tr>' +
            "<td class='nameAnimal'>" + animal.nameAnimal + "</td>" +
            "<td class='stateAnimal'>" + animal.status + "</td>" +
            "<td class='costAnimal'>" + animal.cost + "</td>" +
            "<td class='areaAnimal'>" + animal.area + "</td>" +
            "<td class='col-md-4 summaryAnimal'>" + animal.summary + "</td>" +
            "<td><i class='material-icons delete'>delete</i></td>" +
            "<td><i class='material-icons edit'>edit</i></td>" +
            "<td class='idAnimal' hidden>" + animal._id + "</td>" +
            '</tr>'
          );
        });
      }
    });
  });

  //Get feedback
  $(document).on('click', '#view-fb-button', function () {

    $('#view').show();
    $('#form').hide();

    $.ajax({
      url: '/api/viewfeedback',
      method: 'GET',
      contentType: 'application/json',
      headers: {
        token: localStorage.getItem('token')
      },
      success: function (res) {
        var data = res.feedbacks;
        // Clear the thead, tbody
        $('tbody').html('');
        $('thead').html('');
        // Loop and append

        $('thead').append(
          `  <tr>
                <th>Animal </th>
                <th>UserName</th>
                <th>Title</th>
                <th>Content</th>
                <th>Status</th>
                <th></th>
              </tr>`
        )
        data.forEach(function print(feedback) {
          $('tbody').append(
            '<tr>' +
            "<td class='nameAnimal'>" + feedback.animalName + "</td>" +
            "<td class='userNameFeedback'>" + feedback.userName + "</td>" +
            "<td class='statusFeedback'>" + feedback.status + "</td>" +
            "<td class='titleFeedback'>" + feedback.title + "</td>" +
            "<td class='col-md-4 contentFeeback'>" + feedback.content + "</td>" +
            "<td><i class='material-icons delete-fb'>delete</i></td>" +
            "<td><i class='material-icons accept'>accept</i></td>" +
            "<td class='idFeedback' hidden>" + feedback._id + "</td>" +
            '</tr>'
          );
        });
      }
    });
  });


  //DELETE Button
  $(document).on('click', '.delete', function () {
    var del = $(this).closest('tr');
    idAnimal = del.find('.idAnimal').text();
    $.ajax({
      url: '/api/delete/' + idAnimal,
      method: 'PUT',
      contentType: 'application/json',
      headers: {
        token: localStorage.getItem('token')
      },
      success: function (response) {
        Materialize.toast(response.message, 4000);
        $('#get-button').trigger('click');
      }
    });
  });

  //DELETE fb Button
  $(document).on('click', '.delete-fb', function () {
    var del = $(this).closest('tr');
    idFeedback = del.find('.idFeedback').text();
    $.ajax({
      url: '/api/delete/' + idFeedback,
      method: 'PUT',
      contentType: 'application/json',
      headers: {
        token: localStorage.getItem('token')
      },
      success: function (response) {
        Materialize.toast(response.message, 4000);
        $('#get-button').trigger('click');
      }
    });
  });
  //ADD buttton
  $(document).on('click', '#add-button', function () {
    localStorage.setItem('check', false)

    $.ajax({
      url: '/api',
      method: 'GET',
      contentType: 'application/json',
      processData: false, // NEEDED, DON'T OMIT THIS
      async: false,
      headers: {
        token: localStorage.getItem('token')
      },
      success: function (response) {
        window.location.href = HOST + "/api"
      }
    })
  })
  //EDIT button
  $(document).on('click', '.edit', function () {
    var edt = $(this).closest('tr');
    idAnimal = edt.find('.idAnimal').text();
    localStorage.setItem('check', true)
    $.ajax({
      url: '/api',
      method: 'GET',
      processData: false, // NEEDED, DON'T OMIT THIS
      async: false,
      contentType: 'application/json',
      headers: {
        token: localStorage.getItem('token')
      },
      success: function (res) {
        window.location.href = HOST + "/api/?idAnimal=" + idAnimal + "&token=" + localStorage.getItem('token') + "&check=" + localStorage.getItem('check')

      }
    })


  })

  // Get the value from form
  function getValueForm() {
    name = $('#nameAnimal').val();
    state = $('#stateAnimal').val();
    cost = $('#costAnimal').val();
    area = $('#areaAnimal').val();
    summary = $('#summaryAnimal').val();
  }
  // Function to validate the email entered.
  function validateEmail(email) {
    var reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    if (reg.test(email)) {
      return true;
    } else {
      return false;
    }
  }
  function getInfoAnimal(animal) {
    localStorage.setItem('idAnimal', animal._id)
    localStorage.setItem('name', animal.nameAnimal)
    localStorage.setItem('cost', animal.cost)
    localStorage.setItem('status', animal.status)
    localStorage.setItem('area', animal.area)
    localStorage.setItem('summary', animal.summary)
    localStorage.setItem('url', animal.url)
  }

});

