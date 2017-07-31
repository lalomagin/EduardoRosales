var BoolUltimo = false;
var Iniciado = false;

$(document).ready(function () {

    $('.DoctorClick').on('click', function () {
        if ($('#PhysicianIdSelected').val() != null && $('#PhysicianIdSelected').val() != '') {
            SetDoctorByMethod();
        }
    });

});

function FillDetailDoctor(PhysicianVM) {
    var objOpCenter = PhysicianVM.OperationCenterVM;
    SetAvatarDoctorImage(PhysicianVM.Gender, $('#AvatarDoctor'));
    $('#FullNameDoctor').text(GetMinString(PhysicianVM.FullName, 38));
    $('#MedicalCenterName').text(GetMinString(objOpCenter.OperationCenterName, 38));
    $('#MedicalCenterAdress').text(GetMinString(objOpCenter.GetFullAddress, 38));
    $('#MedicalCenterAdress').attr("title", objOpCenter.GetFullAddress);
    $('#OperationCenterId').val(objOpCenter.OperationCenterId);
    $('[data-toggle="tooltip"]').tooltip();
}

function SetAvatarDoctorImage(BoolGender, IdImage) {
    var nameImage = BoolGender ? "avatardocM.png" : "avatardocF.png";
    IdImage.attr("src", currentDomain + nameImage);
}


function SetDoctorByMethod() {

    LoadingInfo('DivGroupCitas');

                      
    $.get("/Physician/PopUpPhysician", {
        idDiv: "divBigDoctorDetail",
        IdPhys: $('#PhysicianIdSelected').val(),
        CodeSpeciality: $('#SpecialtySelected').val()
    },
                    function (resultPhysician) {
                        FinishLoading('DivGroupCitas');
                        $('#divBigDoctorDetail').html(resultPhysician);
                        movemarker();
                        Modal.openCustom('#divBigDoctorDetail');

                        $("#ContMuroGeneral").scroll(function () {

                            var measureScroll = $(this)[0].scrollHeight - $(this).scrollTop();
                            var docHeightRes = $(this).outerHeight();
                            var Tolerancia = 30;

                            if (measureScroll >= (docHeightRes - Tolerancia) && measureScroll <= (docHeightRes + Tolerancia) && Iniciado == false)
                                UpdateReviewsBottom();
                        });

                        $('#BtnBDD_Cerrar').focus();
                        UpdateReviewsBottom();

                        

                    });



    //$.ajax({
    //    type: "GET",
    //    url: '/Appointments/GetPhysicianByIdAndSpeciality',
    //    headers: { 'X-Requested-With': 'XMLHttpRequest' },
    //    data: {
    //        IdPhys: $('#PhysicianIdSelected').val(),
    //        CodeSpeciality: $('#SpecialtySelected').val()
    //    },
    //    success: function (result) {
    //        FinishLoading('DivGroupCitas');
    //        FillBigDetailDoctor(result);


    //        $('#BtnBDD_Cerrar').focus();
    //    },
    //    error: function (error) {
    //        FinishLoading('DivGroupCitas');
    //        ShowError(error);
    //    }
    //});

}

function UpdateReviewsBottom() {
    Iniciado = true;
    $('div#loadmoreajaxloader').show();
    ActualizaMuro('Final', $('#PhysicianIdSelected').val());
}

function ActualizaMuro(FechaRecP, ParamIdPhys) {
    var dobj = { ItemsMuroF: "vacio", ItemsMuroP: $("#HDItemsShowed").val() };
    var jlst = JSON.stringify(dobj);

    $.ajax({
        url: '/Physician/ActualizarMuroPorItems',
        data: { idsItems: jlst, FechaReciente: FechaRecP, FechaUltima: $('#HDFechaUltima').val(), IdPhys: ParamIdPhys },
        cache: false,
        type: "POST",
        dataType: "json",
        success: function (data) {

            var mensajesToMostrar = data.News;
            var MensajesMostrados = data.ItsAMostrar;

            if (mensajesToMostrar.length > 0)
                AgregaItem(mensajesToMostrar, 0, MensajesMostrados);
            else
                $('div#loadmoreajaxloader').hide();

        },
        error: function (error) {
            FinishLoading('DivGroupCitas');
            ShowError(error);
        }
    });


}


function AgregaItem(mensajesToMostrar, Contador, MensajesMostrados) {

    if (Contador < mensajesToMostrar.length) {
        $.post("/Physician/ReviewItemById", { "idItem": mensajesToMostrar[Contador] },
        function (result) {

            if (result != null && result.length > 0)
                $("#MuroGeneral").append(result);

            $('#HDFechaUltima').val($("#Item_" + mensajesToMostrar[Contador] + " input.FechaPubl").val());

            //Lo que ocurre si el item que se agrego fue el ultimo
            if ((Contador + 1) >= mensajesToMostrar.length)
                $("#HDItemsShowed").val(MensajesMostrados);

            AgregaItem(mensajesToMostrar, Contador + 1, MensajesMostrados);
        });
    }
    else {
        Iniciado = false;
        $('div#loadmoreajaxloader').hide();
        $('[data-toggle="tooltip"]').tooltip();
    }

}


//function SetAverageScoreByPhysician(ParamPhysicianId) {

//    //LoadingInfo('DivGroupCitas');
//    $.ajax({
//        type: "GET",
//        url: '/Appointments/GetScoreAverageByPhysician', 
//        headers: { 'X-Requested-With': 'XMLHttpRequest' },
//        data: {
//            PhysicianId: ParamPhysicianId
//        },
//        success: function (result) {
//            $('#ImgAverageDoctor').attr("src", currentDomain + result.ImageByAverage);
//            $('#REV_ReviewsRec').text(result.StrReviewsTotal);
//            $('#REV_ReviewsValor').text(result.StrValoracion);
//            $('#REV_AverageReviews').text(result.StrAverage);
//            $('#REV_NumExcellent').text(result.Excellent);
//            $('#REV_VeryGood').text(result.VeryGood);
//            $('#REV_Good').text(result.Good);
//            $('#REV_Regular').text(result.Regular);
//            $('#REV_Bad').text(result.Bad);
//        },
//        error: function (error) {
//            ShowError(error);
//        }
//    });

//}


//function FillBigDetailDoctor(PhysicianVM) {
//    var objOpCenter = PhysicianVM.OperationCenterVM;
//    SetAvatarDoctorImage(PhysicianVM.Gender, $('#BigAvatarDoctor'));
//    $('#BDD_FullName').text(PhysicianVM.FullName);
//    $('#BDD_Descripcion').text(PhysicianVM.Descripcion);
//    $('#BDD_Correo').text(PhysicianVM.Email);
//    $('#BDD_CedulaProfesional').text(PhysicianVM.ProfessionalID);
//    $('#BDD_CMedico').text(objOpCenter.OperationCenterName);
//    $('#BDD_CMAdress').text(objOpCenter.GetFullAddress);
//    $('.nav-tabs a[href="#menu0"]').tab('show')

//    Modal.openCustom('#divBigDoctorDetail');
//    SetAverageScoreByPhysician(PhysicianVM.PhysicianId);
//    UpdateReviewsBottom();
//    movemarker(objOpCenter.DLatitud, objOpCenter.DLongitud);
//}

var marker = null;
var myLatlng = null;
var map = null;
var image = null;
var mapOptions = null
var numMaps = 0;

function initializeMap() {
    myLatlng = new google.maps.LatLng(44.809122, -36.650391);

    mapOptions =
    {
        center: myLatlng,
        zoom: 12,
        //   minZoom: 12,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    map = new google.maps.Map(document.getElementById("map"), mapOptions);

    // image = 'http://x.com/x_icon.gif';
    //marker = new google.maps.Marker(
    //{
    //    position: myLatlng,
    //    map: map,
    //    //icon: image,
    //    //title: "Hello World!"
    //});

    //        window.setInterval("movemarker()", 5000);
}

function movemarker() {
    //if (numMaps == 0) {
        initializeMap();
     //   numMaps = 1;
   // }

    myLatlng = new google.maps.LatLng($('#HDlatitud').val(), $('#HDlongitud').val());
    //myLatlng = new google.maps.LatLng(20, -103);
    marker = new google.maps.Marker(
    {
        position: myLatlng,
        map: map
        //icon: image,
        //title: "Hello World!"
    });


    var myBounds = new google.maps.LatLngBounds();
    myBounds.extend(marker.position);


    //if (myBounds.length == 1) {
    map.setZoom(15);
    map.setCenter(marker.position);
    // }
    //else
    //if (myBounds.length > 1) {
    // map.fitBounds(myBounds);    //   # auto-zoom
    //  map.panToBounds(myBounds);  //   # auto-center
    // }



}



//function initMap(latitud, longitud) {
//    //var uluru = { lat: -25.363, lng: 131.044 };
//    var uluru = { lat: latitud, lng: longitud };

//        var map = new google.maps.Map(document.getElementById('map'), {
//            zoom: 15,
//            center: uluru
//        });


//    var marker = new google.maps.Marker({
//        position: uluru,
//        map: map
//    });
//}
