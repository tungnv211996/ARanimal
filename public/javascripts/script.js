$(function () {
    
      $(".button-collapse").sideNav();
      $('#p').hide();
      // GET function
      $(document).on('click', '#get-button', function() {
        $.ajax({
          url: '/api/view',
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
        // Get the value from form
        var name = $('#nameAnimal').val();
        var state = $('#stateAnimal').val();
        var cost = $('#costAnimal').val();
        var area = $('#areaAnimal').val();
        var summary = $('#summaryAnimal').val();
      
          // Post value
          $.ajax({
            url: '/api/save',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({nameAnimal: name, stateAnimal:state, costAnimal: cost, areaAnimal: area, summaryAnimal: summary}),
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
        var idAnimal = del.find('.idAnimal').text();
        $.ajax({
          url: '/api/delete/'+idAnimal,
          method: 'PUT',
          contentType: 'application/json',
          success: function(response) {
            Materialize.toast(response.message, 4000);
            $('#get-button').trigger('click');
          }
        });
      });
      //EDIT button
      $(document).on('click', '.edit', function() {
        $('#p').hide();
        $('#edit').show();
        $.ajax({
          url: '/api/edit/'+idAnimal,
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
        $('#p').show();
        $('.get-started').text('');
        $('#nav-side').hide();
        $('#sidenav-overlay').hide();
        $('.button-collapse').hide();
      });
    
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
    