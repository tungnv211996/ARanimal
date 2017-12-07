$(function () {
    
  var name;
  var cost;
  var state;
  var area;
  var summary;
  var idAnimal;
  var path;

  $(".button-collapse").sideNav();
  // $('#p').hide();
  $('#edit-button').hide();

  //user

  const HOST = 'http://127.0.0.1:3000'
  $("#login").on("click", function (event) {
    var username = $('#username').val();
    var password =  $('#password').val();
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
        localStorage.setItem('token',result.token)
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
  $(document).on('click', '#get-button', function() {

    $('#view').show();
    $('#form').hide();

    $.ajax({
      url: '/api/view',
      method: 'GET',
      contentType: 'application/json',
      headers: {
        token: localStorage.getItem('token')
      },
      success: function(res) {
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
            "<td class='nameAnimal'>" + animal.nameAnimal +"</td>" +
            "<td class='stateAnimal'>" + animal.stateAnimal + "</td>" +
            "<td class='costAnimal'>" + animal.costAnimal + "</td>" + 
            "<td class='areaAnimal'>" + animal.areaAnimal + "</td>" + 
            "<td class='summaryAnimal'>" + animal.summaryAnimal + "</td>" + 
            "<td><i class='material-icons delete'>delete</i></td>" +
            "<td><i class='material-icons edit'>edit</i></td>" +
            "<td class='idAnimal' hidden>"+animal._id+"</td>"+
          '</tr>'
          );
        });
      }
    });
  });

  //Get feedback
  $(document).on('click', '#view-fb-button', function() {
    
        $('#view').show();
        $('#form').hide();
    
        $.ajax({
          url: '/api/viewfeedback',
          method: 'GET',
          contentType: 'application/json',
          headers: {
            token: localStorage.getItem('token')
          },
          success: function(res) {
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
                "<td class='nameAnimal'>" + feedback.animalName +"</td>" +
                "<td class='userNameFeedback'>" + feedback.userName + "</td>" +
                "<td class='statusFeedback'>" + feedback.status + "</td>" + 
                "<td class='titleFeedback'>" + feedback.title + "</td>" + 
                "<td class='contentFeeback'>" + feedback.content + "</td>" + 
                "<td><i class='material-icons delete-fb'>delete</i></td>" +
                "<td><i class='material-icons accept'>accept</i></td>" +
                "<td class='idFeedback' hidden>"+feedback._id+"</td>"+
              '</tr>'
              );
            });
          }
        });
      });
      //ADD buttton
  $(document).on('click', '#add-button', function(){
     // console.log(localStorage.getItem('token'))
    $.ajax({
        url: '/api',
        method: 'GET',
        contentType: 'application/json',
        headers: {
          token: localStorage.getItem('token')
        },
        success: function(response){

        }
      })
  })
  // POST function
  $(document).on('click', '#post-button', function() {
    
    var formData = new FormData();
    formData.append('file', $('input[type=file]')[0].files[0]); 

    //Post file
    $.ajax({
      url: '/file/api/save',
      method: 'POST',
      contentType: false, // NEEDED, DON'T OMIT THIS (requires jQuery 1.6+)
      processData: false, // NEEDED, DON'T OMIT THIS
      async: false,      
      data: formData,
      success: function(response){
        // Materialize.toast(response.message, 4000);
        path = response;
        console.log(path);
      }
    })
  
    getValueForm();
    // Post value
    $.ajax({
      url: '/api/save',
      method: 'POST',
      contentType: 'application/json',
      headers: {
        token: localStorage.getItem('token')
      },
      async: false, 
      data: JSON.stringify({
        nameAnimal: name, 
        stateAnimal:state, 
        costAnimal: cost, 
        areaAnimal: area, 
        summaryAnimal: summary, 
        urlAnimal: path
      }),
      success: function(response) {
        $('#get-button').trigger('click');
        Materialize.toast(response.message, 4000);
        window.location.href = HOST + '/index';
      }
    });

  
    }
  );

  //DELETE Button
  $(document).on('click', '.delete', function() {
    var del = $(this).closest('tr');
    idAnimal = del.find('.idAnimal').text();
    $.ajax({
      url: '/api/delete/'+idAnimal,
      method: 'PUT',
      contentType: 'application/json',
      headers: {
        token: localStorage.getItem('token')
      },
      success: function(response) {
        Materialize.toast(response.message, 4000);
        $('#get-button').trigger('click');
      }
    });
  });

   //DELETE fb Button
   $(document).on('click', '.delete-fb', function() {
    var del = $(this).closest('tr');
    idFeedback = del.find('.idFeedback').text();
    $.ajax({
      url: '/api/delete/'+idFeedback,
      method: 'PUT',
      contentType: 'application/json',
      headers: {
        token: localStorage.getItem('token')
      },
      success: function(response) {
        Materialize.toast(response.message, 4000);
        $('#get-button').trigger('click');
      }
    });
  });


  //EDIT button
  $(document).on('click', '.edit', function(){
  

    var edt = $(this).closest('tr');
    $('#nameAnimal').val(edt.find('.nameAnimal').text());
    $('#stateAnimal').val(edt.find('.stateAnimal').text());
    $('#costAnimal').val(edt.find('.costAnimal').text());
    $('#areaAnimal').val(edt.find('.areaAnimal').text());
    $('#summaryAnimal').val(edt.find('.summaryAnimal').text());
    idAnimal = edt.find('.idAnimal').text();
  })
  $(document).on('click', '#edit-button', function() {

    getValueForm();
    
    $.ajax({
      url: '/api/edit/'+idAnimal,
      method: 'PUT',
      contentType: 'application/json',
      headers: {
        token: localStorage.getItem('token')
      },
      data: JSON.stringify({nameAnimal: name, stateAnimal:state, costAnimal: cost, areaAnimal: area, summaryAnimal: summary}),
      success: function(response) {
        Materialize.toast(response.message, 4000);
        $('#get-button').trigger('click');
      }
    });
  });

  // Get the value from form
  function getValueForm(){
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
});
