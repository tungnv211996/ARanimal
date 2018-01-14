

$(function () {
  var name;
  var cost;
  var state;
  var area;
  var summary;
  var idAnimal;
  var path;
  var pathTester;
  var checkTester =0;

  // const HOST = 'http://localhost:3000'
  const HOST = 'https://aranimal.herokuapp.com'
  document.getElementById("urlAnimal").multiple = true;

  var functions = {
    GetURLParameter: function (sParam) {
      var sPageURL = window.location.search.substring(1);
      var sURLVariables = sPageURL.split('&');
      for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) {
          return sParameterName[1];
        }
      }
    },
      // Get the value from form
    getValueForm: function() {
      name = $('#nameAnimal').val();
      state = $('#stateAnimal').val();
      cost = $('#costAnimal').val();
      area = $('#areaAnimal').val();
      summary = $('#summaryAnimal').val();
    }
  }
  var check =  functions.GetURLParameter('check')
  if(check == 'true'){
    $('#post-button').hide()
    $('#edit-button').show()
    console.log('a')
    $.ajax({
      url: '/api/view/' + functions.GetURLParameter('idAnimal'),
      method: 'GET',
      contentType: 'application/json',
      headers: {
        token: functions.GetURLParameter('token')
      },
      success: function (res) {
        $('#nameAnimal').val(res.animal.nameAnimal)
        // console.log(res)
        // $('#urlAnimal').val(res.animal.url);
        $('#stateAnimal').val(res.animal.status)
        $('#costAnimal').val(res.animal.cost)
        $('#areaAnimal').val(res.animal.area)
        $('#summaryAnimal').val(res.animal.summary)
      }
    })
  }else {
    $('#edit-button').hide()
    $('#post-button').show()
  }
  //EDIT
  $(document).on('click', '#edit-button', function () {

    functions.getValueForm();
    idAnimal = functions.GetURLParameter('idAnimal')
    var model = $('#urlAnimal')[0].files[0];
    var image = $('#urlImage')[0].files[0];
    var formData = new FormData();
    formData.append('file', model);
    formData.append('file', image);
    var formData1 = new FormData();
    if($('#tester0').length) formData1.append('file', $('#tester0')[0].files[0]);
    if($('#tester1').length) formData1.append('file', $('#tester1')[0].files[0]);
    if($('#tester2').length) formData1.append('file', $('#tester2')[0].files[0]);
    if($('#tester3').length) formData1.append('file', $('#tester3')[0].files[0]);
    if($('#tester4').length) formData1.append('file', $('#tester4')[0].files[0]);
    if($('#tester5').length) formData1.append('file', $('#tester5')[0].files[0]);
    if($('#tester6').length) formData1.append('file', $('#tester6')[0].files[0]);


    //Post file
    $.ajax({
      url: '/file/api/save',
      method: 'POST',
      contentType: false, // NEEDED, DON'T OMIT THIS (requires jQuery 1.6+)
      processData: false, // NEEDED, DON'T OMIT THIS
      async: false,
            headers: {
        token: functions.GetURLParameter('token')
      },
      data: formData,
      success: function (response) {
        // Materialize.toast(response.message, 4000);
        path = response;
        console.log(path);
      }
    })

 
    $.ajax({
      url: '/file/api/save/tester',
      method: 'POST',
      contentType: false, // NEEDED, DON'T OMIT THIS (requires jQuery 1.6+)
      processData: false, // NEEDED, DON'T OMIT THIS
      async: false,
            headers: {
        token: functions.GetURLParameter('token')
      },
      data: formData1,
      success: function (response) {
        // Materialize.toast(response.message, 4000);
        pathTester = response.path;
        console.log(pathTester);
      }
    })

    
    functions.getValueForm();
    // Post value
    $.ajax({
      url: '/api/edit/' + idAnimal,
      method: 'PUT',
      contentType: 'application/json',
      headers: {
        token: functions.GetURLParameter('token')
      },
      data: JSON.stringify({
        nameAnimal: name,
        stateAnimal: state,
        costAnimal: cost,
        areaAnimal: area,
        summaryAnimal: summary,
        urlAnimal: path.model,
        imageAnimal: path.image,
        testerAnimal: pathTester
      }),
      success: function (response) {
        window.location.href = HOST + '/index';
        $('#get-button').trigger('click');

      }
    });
  });

  // POST function
  $(document).on('click', '#post-button', function () {

    var model = $('#urlAnimal')[0].files[0];
    var image = $('#urlImage')[0].files[0];
    var formData = new FormData();
    formData.append('file', model);
    formData.append('file', image);
    var formData1 = new FormData();
    if($('#tester0').length) formData1.append('file', $('#tester0')[0].files[0]);
    if($('#tester1').length) formData1.append('file', $('#tester1')[0].files[0]);
    if($('#tester2').length) formData1.append('file', $('#tester2')[0].files[0]);
    if($('#tester3').length) formData1.append('file', $('#tester3')[0].files[0]);
    if($('#tester4').length) formData1.append('file', $('#tester4')[0].files[0]);
    if($('#tester5').length) formData1.append('file', $('#tester5')[0].files[0]);
    if($('#tester6').length) formData1.append('file', $('#tester6')[0].files[0]);

    //Post file
    $.ajax({
      url: '/file/api/save',
      method: 'POST',
      contentType: false, // NEEDED, DON'T OMIT THIS (requires jQuery 1.6+)
      processData: false, // NEEDED, DON'T OMIT THIS
      async: false,
            headers: {
        token: functions.GetURLParameter('token')
      },
      data: formData,
      success: function (response) {
        // Materialize.toast(response.message, 4000);
        path = response;
        console.log(path);
      }
    })

    $.ajax({
      url: '/file/api/save/tester',
      method: 'POST',
      contentType: false, // NEEDED, DON'T OMIT THIS (requires jQuery 1.6+)
      processData: false, // NEEDED, DON'T OMIT THIS
      async: false,
            headers: {
        token: functions.GetURLParameter('token')
      },
      data: formData1,
      success: function (response) {
        // Materialize.toast(response.message, 4000);
        pathTester = response.path;
        console.log(pathTester);
      }
    })


 

    
    functions.getValueForm();
    // Post value
    $.ajax({
      url: '/api/save',
      method: 'POST',
      contentType: 'application/json',
      headers: {
        token: functions.GetURLParameter('token')
      },
      data: JSON.stringify({
        nameAnimal: name,
        stateAnimal: state,
        costAnimal: cost,
        areaAnimal: area,
        summaryAnimal: summary,
        urlAnimal: path.model,
        imageAnimal: path.image,
        testerAnimal: pathTester
      }),
      success: function (response) {
        window.location.href = HOST + '/index';
        $('#get-button').trigger('click');

      }
    });


  }
  );
  $(document).on('click', '#add-tester', function () {
    if(checkTester>6){
      Materialize.toast('Bạn đã nhập nhiều hơn 10', 4000);     
    }else {
    $('#urlTester').after('<input type="file" class="image" id="tester' + checkTester + '" name="image" />');
    $('#urlTester').off('change');
    checkTester++;
    }
  })

})
