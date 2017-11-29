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

  // GET function
  $(document).on('click', '#get-button', function() {

    $('#view').show();
    $('#form').hide();

    $.ajax({
      url: '/animal/api/view',
      method: 'GET',
      contentType: 'application/json',
      success: function(res) {
        var data = res.animals;
        // Clear the tbody
        $('tbody').html('');
        // Loop and append
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
      url: '/animal/api/save',
      method: 'POST',
      contentType: 'application/json',
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
      }
    });

  
    }
  );

  //DELETE Button
  $(document).on('click', '.delete', function() {
    var del = $(this).closest('tr');
    idAnimal = del.find('.idAnimal').text();
    $.ajax({
      url: '/animal/api/delete/'+idAnimal,
      method: 'PUT',
      contentType: 'application/json',
      success: function(response) {
        Materialize.toast(response.message, 4000);
        $('#get-button').trigger('click');
      }
    });
  });

  //EDIT button
  $(document).on('click', '.edit', function(){
    $('#view').hide();
    $('#form').show();
    $('#edit-button').show();
    $('#post-button').hide();

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
      url: '/animal/api/edit/'+idAnimal,
      method: 'PUT',
      contentType: 'application/json',
      data: JSON.stringify({nameAnimal: name, stateAnimal:state, costAnimal: cost, areaAnimal: area, summaryAnimal: summary}),
      success: function(response) {
        Materialize.toast(response.message, 4000);
        $('#get-button').trigger('click');
      }
    });
  });

  // GET STARTED button function
  $('.get-started').on('click', function() {
    $('#o').fadeOut();
    $('.get-started').text('');
    $('#nav-side').hide();
    $('#sidenav-overlay').hide();
    $('.button-collapse').hide();
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
