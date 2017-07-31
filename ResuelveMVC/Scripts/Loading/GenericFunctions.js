function fnCreateModalAlert(ClassHead, Title, fnJSClose, ModalIcon, ModalMessage, fnJSButton, ModalTextButton, Width, Height) {
    ClassHead = typeof ClassHead !== 'undefined' ? ClassHead : "ModalAzul";
    Title = typeof Title !== 'undefined' ? Title : 'Information';
    fnJSClose = typeof fnJSClose !== 'undefined' ? fnJSClose : "";
    ModalIcon = typeof ModalIcon !== 'undefined' ? ModalIcon : 'mensagem-info.png';
    ModalMessage = typeof ModalMessage !== 'undefined' ? ModalMessage : '';
    fnJSButton = typeof fnJSButton !== 'undefined' ? fnJSButton : '';
    ModalTextButton = typeof ModalTextButton !== 'undefined' ? ModalTextButton : 'Acept';
    Width = typeof Width !== 'undefined' ? Width : 500;
    Height = typeof Height !== 'undefined' ? Height : 250;

    var ModalContent = '<link href="https://fonts.googleapis.com/css?family=Candal" rel="stylesheet" type="text/css">'
        + '<div id="DivModalWithLayout">'
            + '<div id="DivModalLayoutHead" class="#ClassHead">'
                + '<span id="SpanModalLayoutTitle" style="color:white;">#Title</span>'
                + '<a class="" style="cursor:pointer;" href="Javascript:fnCloseModal(\'#fnJSClose\');">'
                    + '<img id="imgModalLayoutClose" src="/Content/Imgs/close.png" />'
                + '</a>'
            + '</div>'
            //+ '<div id="DivModalLayoutContent" style="height: ' + Height + 'px; width: 100%; background-color: white; position: relative;">'
            + '<div id="DivModalLayoutContent" style="width: 100%; background-color: white;">'
                //+ '<br />'
                //+ '<br />'
                //+ '<br />'
                //+ '<br />'
                + '<div id="ModalMessagecontent" style="margin-bottom: 15px; margin-top: 15px; display: flex;">';

    if (ModalIcon != "NA") {
        ModalContent = ModalContent
        + '<div style="background: url(/Content/Imgs/#ModalIcon) 50% 50% no-repeat;float: left;width: 62px;height: initial; min-height: 60px;"></div>'
                    //+ '<img id="ImgMessageView" src="/Content/Imgs/#ModalIcon" alt="Icon" style="float:left; margin-right: 10px;" />'
                    + '<div style="width: 85%; margin-left: 15px; text-align: justify;"><span id="MessageModal">#ModalMessage</span></div>';
    }
    else {
        ModalContent = ModalContent
        + '<div style="width: 100%; margin: 0px; text-align: center;">#ModalMessage</div>';
    }


    ModalContent = ModalContent
                + '</div>'
                + '<div style=" text-align: center;margin-bottom: 20px;">'
                    + '<a href="Javascript:fnAcetpModal(\'#fnJSButton\');" class="HierarchyItemButton #btn">#ModalTextButton</a>'
                + '</div>'
            + '</div>'
            + '<a id="CloseModal" class="button b-close" style="display:none;"></a>'
        + '</div>';
    ModalContent = ModalContent.replace("#ClassHead", ClassHead);
    ModalContent = ModalContent.replace("#Title", Title);
    ModalContent = ModalContent.replace("#fnJSClose", fnJSClose);
    ModalContent = ModalContent.replace("#ModalIcon", ModalIcon);
    ModalContent = ModalContent.replace("#ModalMessage", ModalMessage);
    ModalContent = ModalContent.replace("#fnJSButton", fnJSButton);
    ModalContent = ModalContent.replace("#ModalTextButton", ModalTextButton);
    ModalContent = ModalContent.replace("#btn", (ClassHead + "btn"));
    //$("#DivInformativo").html(ModalContent).width(Width).height(Height).bPopup({ modalClose: false });
    $("#DivInformativo").html(ModalContent).width(Width).bPopup({ modalClose: false });
}

function fnCreateModalAlertOptional(ClassHead, Title, fnJSClose, ModalIcon, ModalMessage, fnJSButtonLeft, ModalTextButtonLeft, fnJSButtonRight, ModalTextButtonRight, Width, Height) {
    ClassHead = typeof ClassHead !== 'undefined' ? ClassHead : "ModalAzul";
    Title = typeof Title !== 'undefined' ? Title : 'Information';
    fnJSClose = typeof fnJSClose !== 'undefined' ? fnJSClose : "";
    ModalIcon = typeof ModalIcon !== 'undefined' ? ModalIcon : 'mensagem-info.png';
    ModalMessage = typeof ModalMessage !== 'undefined' ? ModalMessage : '';
    fnJSButtonLeft = typeof fnJSButtonLeft !== 'undefined' ? fnJSButtonLeft : '';
    fnJSButtonRight = typeof fnJSButtonRight !== 'undefined' ? fnJSButtonRight : '';
    ModalTextButtonLeft = typeof ModalTextButtonLeft !== 'undefined' ? ModalTextButtonLeft : 'Acept';
    ModalTextButtonRight = typeof ModalTextButtonRight !== 'undefined' ? ModalTextButtonRight : 'Acept';

    Width = typeof Width !== 'undefined' ? Width : 500;
    Height = typeof Height !== 'undefined' ? Height : 250;

    var ModalContent = '<link href="https://fonts.googleapis.com/css?family=Candal" rel="stylesheet" type="text/css">'
        + '<div id="DivModalWithLayout">'
            + '<div id="DivModalLayoutHead" class="#ClassHead">'
                + '<span id="SpanModalLayoutTitle" style="color:white;">#Title</span>'
                + '<a class="" style="cursor:pointer;" href="Javascript:fnCloseModal(\'#fnJSClose\');">'
                    + '<img id="imgModalLayoutClose" src="/Content/Imgs/close.png" />'
                + '</a>'
            + '</div>'
            //+ '<div id="DivModalLayoutContent" style="height: ' + Height + 'px; width: 100%; background-color: white; position: relative;">'
            + '<div id="DivModalLayoutContent" style="width: 100%; background-color: white;">'
                //+ '<br />'
                //+ '<br />'
                //+ '<br />'
                //+ '<br />'
                + '<div id="ModalMessagecontent" style="margin-bottom: 15px; margin-top: 15px; display: flex;">';

    if (ModalIcon != "NA") {
        ModalContent = ModalContent
        + '<div style="background: url(/Content/Imgs/#ModalIcon) 50% 50% no-repeat;float: left;width: 62px;height: initial; min-height: 60px;"></div>'
                    //+ '<img id="ImgMessageView" src="/Content/Imgs/#ModalIcon" alt="Icon" style="float:left; margin-right: 10px;" />'
                    + '<div style="width: 85%; margin-left: 15px; text-align: justify;"><span id="MessageModal">#ModalMessage</span></div>';
    }
    else {
        ModalContent = ModalContent
        + '<div style="width: 100%; margin: 0px; text-align: center;">#ModalMessage</div>';
    }


    ModalContent = ModalContent
                + '</div>'
                + '<div style=" text-align: center;margin-bottom: 20px;">'
                    + '<a href="Javascript:fnAcetpModal(\'#fnJSButtonLeft\');" class="HierarchyItemButton ModalRojobtn">#ModalTextButtonLeft</a>'
                    + '<a href="Javascript:fnAcetpModal(\'#fnJSButtonRight\');" class="HierarchyItemButton ModalAzulbtn">#ModalTextButtonRight</a>'
                + '</div>'
            + '</div>'
            + '<a id="CloseModal" class="button b-close" style="display:none;"></a>'
        + '</div>';
    ModalContent = ModalContent.replace("#ClassHead", ClassHead);
    ModalContent = ModalContent.replace("#Title", Title);
    ModalContent = ModalContent.replace("#fnJSClose", fnJSClose);
    ModalContent = ModalContent.replace("#ModalIcon", ModalIcon);
    ModalContent = ModalContent.replace("#ModalMessage", ModalMessage);
    ModalContent = ModalContent.replace("#fnJSButtonLeft", fnJSButtonLeft);
    ModalContent = ModalContent.replace("#fnJSButtonRight", fnJSButtonRight);
    ModalContent = ModalContent.replace("#ModalTextButtonLeft", ModalTextButtonLeft);
    ModalContent = ModalContent.replace("#ModalTextButtonRight", ModalTextButtonRight);
    ModalContent = ModalContent.replace("#btn", (ClassHead + "btn"));
    //$("#DivInformativo").html(ModalContent).width(Width).height(Height).bPopup({ modalClose: false });
    $("#DivInformativo").html(ModalContent).width(Width).bPopup({ modalClose: false });
}


/////////////////////////////////NUEVO
function fnCreateModalAlertOptionalThree(ClassHead, Title, fnJSClose, ModalIcon, ModalMessage, fnJSButtonLeft, ModalTextButtonLeft, fnJSButtonMiddle, ModalTextButtonMiddle, fnJSButtonRight, ModalTextButtonRight, Width, Height) {
    ClassHead = typeof ClassHead !== 'undefined' ? ClassHead : "ModalAzul";
    Title = typeof Title !== 'undefined' ? Title : 'Information';
    fnJSClose = typeof fnJSClose !== 'undefined' ? fnJSClose : "";
    ModalIcon = typeof ModalIcon !== 'undefined' ? ModalIcon : 'mensagem-info.png';
    ModalMessage = typeof ModalMessage !== 'undefined' ? ModalMessage : '';
    fnJSButtonLeft = typeof fnJSButtonLeft !== 'undefined' ? fnJSButtonLeft : '';
    fnJSButtonRight = typeof fnJSButtonRight !== 'undefined' ? fnJSButtonRight : '';
    ModalTextButtonLeft = typeof ModalTextButtonLeft !== 'undefined' ? ModalTextButtonLeft : 'Acept';
    ModalTextButtonMiddle = typeof ModalTextButtonMiddle !== 'undefined' ? ModalTextButtonMiddle : 'Acept';
    ModalTextButtonRight = typeof ModalTextButtonRight !== 'undefined' ? ModalTextButtonRight : 'Acept';

    Width = typeof Width !== 'undefined' ? Width : 500;
    Height = typeof Height !== 'undefined' ? Height : 250;

    var ModalContent = '<link href="https://fonts.googleapis.com/css?family=Candal" rel="stylesheet" type="text/css">'
        + '<div id="DivModalWithLayout">'
            + '<div id="DivModalLayoutHead" class="#ClassHead">'
                + '<span id="SpanModalLayoutTitle" style="color:white;">#Title</span>'
                + '<a class="" style="cursor:pointer;" href="Javascript:fnCloseModal(\'#fnJSClose\');">'
                    + '<img id="imgModalLayoutClose" src="/Content/Imgs/close.png" />'
                + '</a>'
            + '</div>'            
            + '<div id="DivModalLayoutContent" style="width: 100%; background-color: white;">'                
                + '<div id="ModalMessagecontent" style="margin-bottom: 15px; margin-top: 15px; display: flex;">';

    if (ModalIcon != "NA") {
        ModalContent = ModalContent
        + '<div style="background: url(/Content/Imgs/#ModalIcon) 50% 50% no-repeat;float: left;width: 62px;height: initial; min-height: 60px;"></div>'
                    //+ '<img id="ImgMessageView" src="/Content/Imgs/#ModalIcon" alt="Icon" style="float:left; margin-right: 10px;" />'
                    + '<div style="width: 85%; margin-left: 15px; text-align: justify;"><span id="MessageModal">#ModalMessage</span></div>';
    }
    else {
        ModalContent = ModalContent
        + '<div style="width: 100%; margin: 0px; text-align: center;">#ModalMessage</div>';
    }


    ModalContent = ModalContent
                + '</div>'
                + '<div style=" text-align: center;margin-bottom: 20px;">'
                    + '<a href="Javascript:fnAcetpModal(\'#fnJSButtonLeft\');" class="HierarchyItemButton ModalVerdebtn">#ModalTextButtonLeft</a>'
                    + '<a href="Javascript:fnAcetpModal(\'#fnJSButtonMiddle\');" class="HierarchyItemButton ModalRojobtn">#ModalTextButtonMiddle</a>'
                    + '<a href="Javascript:fnAcetpModal(\'#fnJSButtonRight\');" class="HierarchyItemButton ModalAzulbtn">#ModalTextButtonRight</a>'                    
                + '</div>'
            + '</div>'
            + '<a id="CloseModal" class="button b-close" style="display:none;"></a>'
        + '</div>';
    ModalContent = ModalContent.replace("#ClassHead", ClassHead);
    ModalContent = ModalContent.replace("#Title", Title);
    ModalContent = ModalContent.replace("#fnJSClose", fnJSClose);
    ModalContent = ModalContent.replace("#ModalIcon", ModalIcon);
    ModalContent = ModalContent.replace("#ModalMessage", ModalMessage);
    ModalContent = ModalContent.replace("#fnJSButtonLeft", fnJSButtonLeft);
    ModalContent = ModalContent.replace("#fnJSButtonMiddle", fnJSButtonMiddle);
    ModalContent = ModalContent.replace("#fnJSButtonRight", fnJSButtonRight);
    ModalContent = ModalContent.replace("#ModalTextButtonLeft", ModalTextButtonLeft);
    ModalContent = ModalContent.replace("#ModalTextButtonMiddle", ModalTextButtonMiddle);
    ModalContent = ModalContent.replace("#ModalTextButtonRight", ModalTextButtonRight);
    ModalContent = ModalContent.replace("#btn", (ClassHead + "btn"));
    //$("#DivInformativo").html(ModalContent).width(Width).height(Height).bPopup({ modalClose: false });
    $("#DivInformativo").html(ModalContent).width(Width).bPopup({ modalClose: false });
}




function fnCreateModalConfirm(Title, fnJSClose, ModalMessage, fnJSButtonYes, fnJSButtonNo, Width, Height) {
    Title = typeof Title !== 'undefined' ? Title : 'Information';
    fnJSClose = typeof fnJSClose !== 'undefined' ? fnJSClose : "";
    ModalMessage = typeof ModalMessage !== 'undefined' ? ModalMessage : '';
    fnJSButton = typeof fnJSButton !== 'undefined' ? fnJSButton : '';
    fnJSButtonYes = typeof fnJSButtonYes !== 'undefined' ? fnJSButtonYes : '';
    fnJSButtonNo = typeof fnJSButtonNo !== 'undefined' ? fnJSButtonNo : '';
    Width = typeof Width !== 'undefined' ? Width : 500;
    Height = typeof Height !== 'undefined' ? Height : 250;

    var ModalContent = '<link href="https://fonts.googleapis.com/css?family=Candal" rel="stylesheet" type="text/css">'
        + '<div id="DivModalWithLayout">'
            + '<div id="DivModalLayoutHead">'
                + '<span id="SpanModalLayoutTitle" style="color:white;">#Title</span>'
                + '<a class="" style="cursor:pointer;" href="Javascript:fnCloseModal(\'#fnJSClose\');">'
                    + '<img id="imgModalLayoutClose" src="/Content/Imgs/close.png" />'
                + '</a>'
            + '</div>'
            //+ '<div id="DivModalLayoutContent" style="height: ' + Height + 'px; display:table; width: 100%; background-color: white; position: relative;">'
            + '<div id="DivModalLayoutContent" style="width: 100%; background-color: white;">'
                //+ '<br />'
                //+ '<br />'
                //+ '<br />'
                //+ '<br />'
                + '<div id="ModalMessagecontent" style="margin-bottom: 15px; margin-top: 15px; display: flex;">'
                    + '<div style="background: url(/Content/Imgs/mensagem-info.png) 50% 50% no-repeat;float: left;width: 62px;height: initial; min-height: 60px;"></div>'
                    //+ '<img id="ImgMessageView" src="/Content/Imgs/mensagem-info.png" alt="Icon" style="float:left; margin-right: 10px;" />'
                    + '<div style="width: 85%; margin-left: 15px; text-align: justify;"><span id="MessageModal">#ModalMessage</span></div>'
                + '</div>'
                + '<div style=" text-align:center; margin-bottom: 20px;">'
                    + '<a href="Javascript:fnYesModal(\'#fnJSButtonYes\');" class="HierarchyItemButton ModalConfirmbtnYes">YES</a>'
                    + '<a href="Javascript:fnNoModal(\'#fnJSButtonNo\');" class="HierarchyItemButton ModalConfirmbtnNo">NO</a>'
                + '</div>'
            + '</div>'
            + '<a id="CloseModal" class="button b-close" style="display:none;"></a>'
        + '</div>';
    ModalContent = ModalContent.replace("#Title", Title);
    ModalContent = ModalContent.replace("#fnJSClose", fnJSClose);
    ModalContent = ModalContent.replace("#ModalMessage", ModalMessage);
    ModalContent = ModalContent.replace("#fnJSButtonYes", fnJSButtonYes);
    ModalContent = ModalContent.replace("#fnJSButtonNo", fnJSButtonNo);
    //$("#DivInformativo").html(ModalContent).width(Width).height(Height).bPopup({ modalClose: false });
    $("#DivInformativo").html(ModalContent).width(Width).bPopup({ modalClose: false });
}

function fnCloseModal(fnJS) {
    eval(fnJS);
    $("#CloseModal").click();
}
function fnAcetpModal(fnJS) {
    eval(fnJS);
}

function fnYesModal(fnJS) {
    eval(fnJS);
}

function fnNoModal(fnJS) {
    eval(fnJS);
}