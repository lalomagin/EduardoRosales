function SetModeToSearchDoctor() {
    fnCloseModal(true);
    ResetCreateApp();

    $('#DivSearchPatient').hide();
    $('#DivDetailDoctor').hide();
    $('#DivResponsable').show();

    $('#searchbtnMultiple').val("Visualizar Calendario");
    $("#searchbtnMultiple").attr("OptionSearch", "SearchDoctor");
    HideCancelCreateEdit();

    var $select = $('#PhysicianIdSelected');

    $select.val("");

    $("#HDItemsShowed").val("");
    $('#HDFechaUltima').val("");
    $("#MuroGeneral").html("");

    if ($select.find('option').length == 2)
        $select.find('option:eq(1)').prop('selected', true);
    else
        $select.find('option:eq(0)').prop('selected', true);


    var viewts = $('#calendar').fullCalendar('getView');

    LoadCalendar(null, null, viewts.name, null, false);
}

function SetModeToSearchPatient() {
    fnCloseModal(true);
    $('#searchbtnMultiple').val("Buscar Paciente");
    ResetCreateApp();
    $('#DivSearchPatient').show();
    $("#searchbtnMultiple").attr("OptionSearch", "SearchPatient");
    HideCancelCreateEdit();
    var viewts = $('#calendar').fullCalendar('getView');
    LoadCalendar(null, null, viewts.name, false);
}

function SetModeToCreateEditAppointment() {
    $("#DivSearchPatient").hide();
    $("#DivDetailPacient").show();
    $("#DivDateAndDuration").show();
    $("#DivComments").show();
    $("#searchbtnMultiple").attr("OptionSearch", "CreateAppointment");
    SetLabelCreateEdit();
    $('#IdImgEditC').show();
    $("#DurationSelected").prop("disabled", false);
}


function ResetCreateApp() {
    $("#txtPhoneNumber").val("");
    $('#Comments').val("");
    $('#Comments').keyup();
    $("#txtPhoneNumber").focus();
    $("#DivDetailPacient").hide();
    $('#CustomerId').val("");
    $('#DivComments').hide();
    $('#DivDateAndDuration').hide();
}

function ShowCancelCreateEdit() {
    $("#searchbtnMultiple").attr("style", "width:68%");
    $("#btnCancelarMult").show();
}

function HideCancelCreateEdit() {
    $("#btnCancelarMult").hide();
    $("#searchbtnMultiple").attr("style", "width:100%");
}