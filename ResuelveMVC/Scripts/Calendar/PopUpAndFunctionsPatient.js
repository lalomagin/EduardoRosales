$(document).ready(function () {

    $('.PatientClick').on('click', function () {
        if ($('#CustomerId').val() != null && $('#CustomerId').val() != '') {
            SetCustomerByMethod(null, $('#CustomerId').val(), false, true);
        }
    });

});

function SetAvatarPatientImage(BoolGender, IdImage) {
    var nameImage = BoolGender ? "patientM.ico" : "patientF.ico";
    IdImage.attr("src", currentDomain + nameImage);
}

//function CleanPatientForm() {
//    $('#ModalEmail').attr("style", "");
//    $('#FirstName').val("");
//    $('#LastName').val("");
//    $('#ModalEmail').val("");
//    $('#BirthDateModal').val("");
//    $('#btnCreateProfile').hide();
//    $('#btnEditProfile').hide();
//}

function FillDetailPatient(result) {
    $('#Name').text(result["FullName"]);
    $('#PhoneNumber').text(result["PhoneNumber"]);
    $('#Email').text(result["Email"] == null ? "" : result["Email"]);
    $('#CustomerId').val(result["CustumerId"]);
    $('#Age').text(result["AgeCalculated"]);
    SetAvatarPatientImage(result["Gender"], $('#AvatarPacient'));
}

//function FillBigDetailPatient(result) {
//    $('#BDP_FullName').text(result["FullName"]);
//    $('#BDP_PhoneNumber').text(result["PhoneNumber"]);
//    $('#BDP_Correo').text(result["Email"] == null ? "" : result["Email"]);
//    $('#BDP_Age').text(result["AgeCalculated"]);
//    $('#BDP_BirthDate').text(result["FormatBirthDate"]);
//    SetAvatarPatientImage(result["Gender"], $('#BigAvatarPacient'));
//}

function SetCustomerByMethod(strPhone, strIdCustomer, IsLoadCalendar, IsBigDetail) {

    LoadingInfo('DivGroupCitas');

    $.get("/Customer/ExistsCustomerByParam", {
        IdCustomer: strIdCustomer,
        PhoneNumber: strPhone
    },
        function (result) {
            

            if (result == true) {   // Existe el usuario
                if (IsBigDetail) {      //Es para el detalle mayor
            
                    $.get("/Customer/PopUpPatient", {
                        idDiv: "divBigPatientDetail",
                        IdPatient: strIdCustomer,
                        PhonePatient:strPhone
                    },
                    function (resultCustomer) {
                        FinishLoading('DivGroupCitas');                        
                        $('#divBigPatientDetail').html(resultCustomer);
                        Modal.openCustom('#divBigPatientDetail');
                    });                    
                }
                else {      //Es para el detalle menor
                    $.get("/Customer/GetCustomerData", {
                        IdPatient: strIdCustomer,
                        PhonePatient: strPhone
                    },
                    function (resultCustomer) {                        
                        FillDetailPatient(resultCustomer);  // Cambiar para llenar el div
                        FinishLoading('DivGroupCitas');
                        SetModeToCreateEditAppointment();

                        if (IsLoadCalendar) {
                            LoadCalendar(null, null, null, null, true);
                        }

                    });

                }
            }
            else {
                    $.get("/Customer/PopUpPatientEdition", {
                        idDiv: "modalito",
                        IsForCreate: "1",
                        PhonePatient: strPhone
                    },
                        function (resultCustomer) {
                            FinishLoading('DivGroupCitas');
                            $('#modalito').html(resultCustomer);
                            $('#FirstName').focus();
                            $('#DivBirthDateModal').datetimepicker({
                                viewMode: 'years',
                                format: strformatDate
                            });
                            Modal.openCustom('#modalito');



                        });


                //Modal.openCustom('#modalito');
                //CleanPatientForm();
                //$('#ModalPhoneNumber').text(strPhone);
                //$('#FirstName').focus();
                //$('#btnCreateProfile').show();
            }

        });







    //$.ajax({
    //    type: "GET",
    //    url: '/Appointments/GetCustomerDataByParam',
    //    headers: { 'X-Requested-With': 'XMLHttpRequest' },
    //    data: {
    //        IdCustomer: strIdCustomer,
    //        PhoneNumber: strPhone
    //    },
    //    success: function (result) {
    //        FinishLoading('DivGroupCitas');

    //        if (IsBigDetail && result["CustumerId"] != null && result["CustumerId"] > 0) {
    //            FillBigDetailPatient(result);
    //            Modal.openCustom('#divBigPatientDetail');
    //            $('#BtnBDP_Cerrar').focus();
    //        }
    //        else {
    //            if (result["CustumerId"] != null && result["CustumerId"] > 0) {
    //                FillDetailPatient(result);
    //                SetModeToCreateEditAppointment();

    //                if (IsLoadCalendar) {
    //                    LoadCalendar(null, null, null, null, true);
    //                }
    //            }
    //            else {
    //                Modal.openCustom('#modalito');
    //                CleanPatientForm();
    //                $('#ModalPhoneNumber').text(strPhone);
    //                $('#FirstName').focus();
    //                $('#btnCreateProfile').show();
    //            }
    //        }
    //    },
    //    error: function (error) {
    //        FinishLoading('DivGroupCitas');
    //        ShowError(error);
    //    }
    //});

}

function CreateEditProfile(IsToCreate)
{
    email_address = $('#ModalEmail');
    email_regex = /^\w+([-+.'][^\s]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    if (email_address.val().trim().length > 0 && !email_regex.test(email_address.val()))
    {
        $('#ModalEmail').attr("style", "border-color:red");
        return false;
    }
    else
    {
        LoadingInfo('modalito2');
        $('#ModalEmail').attr("style", "");

        $.ajax({
            type: "POST",
            url: '/Customer/CreateCustumer',
            headers: { 'X-Requested-With': 'XMLHttpRequest' },
            data: {
                CustumerId: $('#CustomerId').val(),
                ForCreate : IsToCreate,
                OperationCenterId: $('#OperationCenterId').val(),
                FirstName: $('#FirstName').val(),
                LastName: $('#LastName').val(),
                PhoneNumber: $('#ModalPhoneNumber').text(),
                Active:true,
                Email: $('#ModalEmail').val(),
                Gender: $("input[name='ModalGender']:checked").val() == "true" ? true:false,
                BirthDate: $('#BirthDateModal').val()
            },

            success: function (result) {

                if (result["CustumerId"] != null && result["CustumerId"] > 0) {
                    FillDetailPatient(result);
                    SetModeToCreateEditAppointment();
                    LoadCalendar();
                }

                FinishLoading('modalito2');
                Modal.close('#modalito');


            },
            error: function (error) {
                FinishLoading('modalito2');
                Modal.close('#modalito');
                ShowError(error);
            }
        });
    }


}

//function EditPatient()
//{
//    if ($('#CustomerId').val() != null && $('#CustomerId').val() != '')
//    {
//        Modal.openCustom('#modalito');
//        CleanPatientForm();

//        $.ajax({
//            type: "GET",
//            url: '@Url.Action("GetCustomerDataById", "Appointments")',
//            headers: { 'X-Requested-With': 'XMLHttpRequest' },
//            data: {
//                IdCustomer: $('#CustomerId').val()
//            },
//            success: function (result) {
//                if (result["CustumerId"] != null && result["CustumerId"] > 0) {

//                    $('#ModalPhoneNumber').text(result["PhoneNumber"]);
//                    $('#FirstName').val(result["FirstName"]);
//                    $('#LastName').val(result["LastName"]);
//                    $('#ModalEmail').val(result["Email"] == null ? "" : result["Email"]);
//                    $('#BirthDateModal').val(result["FormatBirthDate"]);
//                    $('#FirstName').focus();


//                    if (result["Gender"]) {
//                        $('#RBMale').prop('checked', true);
//                        $('#RBFemale').prop('checked', false);
//                    }
//                    else {
//                        $('#RBMale').prop('checked', false);
//                        $('#RBFemale').prop('checked', true);
//                    }

//                    $('#btnEditProfile').show();
//                }

//            },
//            error: function (error) {
//                ShowError(error);
//            }
//        });
//    }
//}