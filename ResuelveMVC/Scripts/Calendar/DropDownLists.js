var selectItemLegendCountry = 'Selecciona una Ciudad';
var selectItemLegendSpeciality = 'Selecciona Especialidad';
var selectItemLegendDoctor = 'Selecciona un Doctor';
var selectItemLegendDuration = 'Selecciona Duración';

$(document).ready(function () {

    //Se comenta hasta que exista en usa
    //AddDefault($('#CountryCodeSelected'), selectItemLegendCountry);
    AddDefault($('#SpecialtySelected'), selectItemLegendSpeciality);
    AddDefault($('#PhysicianIdSelected'), selectItemLegendDoctor);
    //AddDefault($('#TimezoneSelected'), selectItemLegendTimeZone);
    AddDefault($('#DurationSelected'), selectItemLegendDuration);
    
    $('#DurationSelected').on('change', function (e) {
        ChangeDurationInCalendar();
    });

    $('#SpecialtySelected').on('change', function (e) {

        if (this.value == "-1") {
            $('#strtime').val("");
            $('#DurationSelected').find('option[value="-1"]').prop('selected', true);
        }
        LoadPhysiciansSelect();
    });

    $('#PhysicianIdSelected').on('change', function () {
        if (this.value == "-1") {
            $('#strtime').val("");
            $('#DurationSelected').find('option[value="-1"]').prop('selected', true);
            $("#DurationSelected").prop("disabled", true);
            $("#txtPhoneNumber").prop("disabled", true);
        }
    });

});


function LoadPhysiciansSelect(itemSelected, SpecialtySelected) {

    var $select = $('#PhysicianIdSelected');
    $select.prop('readonly', 'true');

    $.ajax({
        type: "GET",
        url: '/Physician/ListPhysicians',
        headers: { 'X-Requested-With': 'XMLHttpRequest' },
        data: {
            SpecialtyCode: (SpecialtySelected == null ? $('#SpecialtySelected').val() : SpecialtySelected)
        },
        success: function (list) {
            $select.empty();

            $.each(list, function (i, item) {
                $('<option>', { value: item.Key, selected: (item.Key == itemSelected) }).html(item.Value).appendTo($select);
            });

            if ($select.find('option[value="-1"]').length <= 0)
                $('<option>', { value: -1 }).html(selectItemLegendDoctor).prependTo($select);


            if ($select.find('option').length == 2)
                $select.find('option:eq(1)').prop('selected', true);

            $select.change();

            $select.prop('readonly', 'false');
        },
        error: function (error) { ShowError(error); }
    });
}

function AddDefault($select, selectItemPar) {
    if ($select.find('option[value="-1"]').length <= 0)
        $('<option>', { value: -1 }).html(selectItemPar).prependTo($select);
}

function SetSelectsEnable(isEnable) {
    var $selectPhys = $('#PhysicianIdSelected');
    var $selectSpec = $('#SpecialtySelected');
    var $selectDurs = $('#DurationSelected');
    var $ctrlCalendar = $('#Time');

    if (isEnable) {
        $selectPhys.removeAttr('disabled');
        $selectSpec.removeAttr('disabled');
        $selectDurs.removeAttr('disabled');
        $ctrlCalendar.removeAttr("readonly");
    }
    else {
        $selectPhys.attr('disabled', 'disabled');
        $selectSpec.attr('disabled', 'disabled');
        $selectDurs.attr('disabled', 'disabled');
        $ctrlCalendar.attr("readonly", "true");
    }
}

// Se encarga de setear la duracion de la cita en el dropdownlist, recibe el datetime inicial de la cita y datetime final de la cita y valida que sea una duracion correcta
function SetDurationByEvent(event) {
    var date1 = event.start;
    var date2 = event.end;

    differenceInMs = date2.diff(date1); // diff yields milliseconds
    duration = moment.duration(differenceInMs); // moment.duration accepts ms
    differenceInMinutes = duration.asMinutes(); // if you would like to have the output 559

    var strAlertType = "";

    if (differenceInMinutes > 555)
        strAlertType = "La duración maxima de una cita es 9 horas, si necesita mas tiempo elija la opción 'Todo el día'";

    if (differenceInMinutes < 0)
        strAlertType = "Duración incorrecta de cita";


    if (strAlertType != "") {
        fnCreateModalAlert('ModalRojo', 'Generación de Citas', '1==1', 'mensagem-alerta.png', strAlertType, 'fnCloseModal(1==1);', 'OK', 400, 0);
        return false;
    }
    else {
        var $selectTZOption = $('#DurationSelected').find('option[value="' + differenceInMinutes + '"]');
        if ($selectTZOption.length > 0)
            $selectTZOption.prop('selected', true);
    }
    return true;
}


function LoadDropDownList(list, selectid, selectItemLegend) {
    var $select = $('#' + selectid);
    $select.empty();
    AddDefault($select, selectItemLegend);
    $.each(list, function (i, item) {
        $('<option>', { value: item.Value, selected: false }).html(item.Text).appendTo($select);
    });
    if ($select.find('option').length == 2) {
        $select.find('option:eq(1)').prop('selected', true);
        if (jQuery.hasData($select[0])) {
            $select.change();
        }
    }
}

