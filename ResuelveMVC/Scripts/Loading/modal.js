
var Modal = {
    version: 0.42,
    idModal: "#ModalMessages",
    idBG: "fundoModal",
    opacityBG: "0.6",
    parent: "body",
    contentPlaceHolder: "#ModalMessages .conteudo-modal",
    titlePlaceHolder: '#ModalMessages .titulo-modal-azul',
    source: '',
    sourceHTML: '',
    bind: function () {
        $(this.idModal + " .modal-close").on("click", function (e) {
            e.preventDefault();
            Modal.close();
        });
    },
    createCustom: function (elem) {

        if (!($("#" + this.idBG).length > 0)) {
            $(this.parent).append("<div id='" + this.idBG + "' />");
            $("#" + this.idBG).width($(document).width()).height($(document).height()).css('opacity', this.opacityBG);
            this.bind();
        }
    },
    create: function () {
        if (!($(this.idModal).length > 0)) {
            $(this.parent).append("<div id='" + this.idModal.replace(/\#/, "") + "' /><div id='" + this.idBG + "' />");
            $("#" + this.idBG).width($(document).width()).height($(document).height()).css('opacity', this.opacityBG);
            $(this.idModal).append("<a href='javascript:void(0)' class='modal-close' />");
            this.bind();
        }
    },
    updateSize: function () {
        var modalHeight = $(".modal-mensagem-conteudo").outerHeight() > ($(window).outerHeight() * .9) ? $(window).outerHeight() * .9 : $(".modal-mensagem-conteudo").outerHeight() + 15;
        var modalTop = ($(window).outerHeight() - modalHeight) / 2;

        $(this.idModal).animate({
            height: modalHeight + "px",
            top: modalTop + "px"
        }, 500, function () {
            //$(".conteudo-modal-js .msg").css("overflow", "auto").height($(Modal.idModal).height() - 120).width(250);
            $(".msg").css("overflow", "auto").height($(Modal.idModal).height() - 120).width(250);
        });
    },
    isCreated: function () {
        if ($(this.idModal).length > 0) return true;
        else return false;
    },
    //-2000px
    isVisible: function () {
        if (this.isCreated()) {
            if ($(this.idModal).css("display") === "block" && $(this.idModal).css("top") != "-2000px") return { 'status': 'visible' };
            else return { 'status': 'hidden' };
        } else return { 'status': 'absent' };
    },
    setPosition: function (elem) {
        var e = $(elem);
        var ew = e.outerWidth();
        var eh = e.outerHeight();
        var ww = $(window).outerWidth();
        var wh = $(window).outerHeight();
        var cph = $(this.contentPlaceHolder);


        l = ew >= (ww * .9) ? (ww * .9) : ew;
        e.width(l);
        var ph = (ww / 2) - (l / 2);




        a = eh >= (wh * .9) ? (wh * .9) : eh;
        e.height(a);
        var pv = (wh / 2) - (a / 2);
        e.css({ "left": ph + "px", "top": "-2000px", 'overflow-y': 'hidden' });

        
        cph.css({ 'overflow-y': 'auto' }).height(e.height() - $(this.titlePlaceHolder).outerHeight());


        return { top: pv, left: ph };
    },
    worklist: function (objeto) {
        Modal.open(".modal-worklist", 'modal-worklist', 0);
        $(".modal-worklist").html("");
        var htmlWorklist = '<a href="javascript:void(0)" class="modal-close"></a><div class="conteudo-modal-js">' +
    						'<div class="modal-mensagem-conteudo">' +
        						'<h3>teste</h3>' +
            					'<div class="msg" style="overflow: auto; height: 48px; width: 250px;">teste</div>' +
        						'<a href="/" class="botao-desligamento botao-fechar-mensagem">Cerrar</a>' +
						    '</div>';
        $(".modal-worklist").append(htmlWorklist);
    },
    mensagem: {
        idModal: "#ModalMessages",
        alerta: function (titulo, mensagem, url) {
            Modal.open(".modal-mensagem", "modal-alerta", 0);
            $(this.idModal + " .modal-mensagem-conteudo H3").html(titulo);
            $(this.idModal + " .modal-mensagem-conteudo .msg").html(mensagem);
            this.fecha(url);
            Modal.updateSize();
        },
        info: function (titulo, mensagem, url) {
            Modal.open(".modal-mensagem", "modal-info", 0);
            $(this.idModal+" .modal-mensagem-conteudo H3").html(titulo);
            $(this.idModal + " .modal-mensagem-conteudo .msg").html(mensagem);
            this.fecha(url);
            Modal.updateSize();
        },        
        //ShowMessage: function (elem) {

        //    $(this.idModal).show().delay(5000).fadeOut();

        //        $(Modal.source).html(Modal.sourceHTML);
        //        $("#" + Modal.idBG).fadeOut(300, function () {
        //            $(elem).animate({ top: '-2000px' }, 900);
        //        });
        //        $("body").css("overflow", "auto");
        //        //$(document).trigger("Modal.close");
        //    },
        sucesso: function (titulo, mensagem, url) {

          //  Modal.create();
            Modal.open(".modal-mensagem", "modal-sucesso", 0);
            $(this.idModal + " .modal-mensagem-conteudo H3").html(titulo);
            $(this.idModal + " .modal-mensagem-conteudo .msg").html(mensagem);
            this.fecha(url);
            Modal.updateSize();
        },
        erro: function (titulo, mensagem, url) {
            Modal.open(".modal-mensagem", "modal-erro", 0);
            $(this.idModal + " .modal-mensagem-conteudo H3").html(titulo);
            $(this.idModal + " .modal-mensagem-conteudo .msg").html(mensagem);
            this.fecha(url);
            Modal.updateSize();
        },
        exception: function (titulo, mensagem, url, exception) {
            Modal.open(".modal-mensagem", "modal-erro", 0);
            $(this.idModal + " .modal-mensagem-conteudo H3").html(titulo);
            $(this.idModal + " .modal-mensagem-conteudo .msg").html(mensagem + "<textarea disabled rows='5' cols='20' style='max-width:227px;width:227px;margin-top:10px;'>" + exception + "</textarea>");
            this.fecha(url);
            Modal.updateSize();
        },
        confirmacao: function (titulo, mensagem, labelSim, labelNao, botaoSim) {
            if ($(".modal-msg-confirma").length <= 0) {
                var html = '<div class="modal-msg-confirma"> \
							    <div class="modal-mensagem-conteudo"> \
							        <h3></h3> \
							        <div class="contemfloat"> \
							            <div class="imagem"></div> \
							            <div class="msg"></div> \
							        </div> \
							        <div class="botoes-modal contemfloat">\
								        <a href="/" class="botao-desligamento botao-confirm-cancelar">'+ labelNao + '</a> \
								        <a href="/" class="botao-acao botao-confirm-confirmar">'+ labelSim + '</a> \
								    </div> \
								</div> \
							</div> ';

                $(html).appendTo("form");
            }

            Modal.open(".modal-msg-confirma", "modal-mensagem-confirma", 0);
            $(".modal-mensagem-confirma .modal-mensagem-conteudo H3").html(titulo);
            $(".modal-mensagem-confirma .modal-mensagem-conteudo .msg").html(mensagem);

            $(".modal-mensagem-confirma .botao-confirm-cancelar,.modal-mensagem-confirma .modal-close").on("click", function (e) {
                e.preventDefault();
                Modal.close();
            });
            $(".modal-mensagem-confirma .botao-confirm-confirmar").on("click", function (e) {
                e.preventDefault();
                if ($(botaoSim).attr("href").search("javascript") >= 0) {
                    eval($(botaoSim).attr("href"));
                } else {
                    self.location = $(botaoSim).attr("href");
                }
            });

        },
        confirma: function (titulo, mensagem, url) {
            // nao finalizado, foi feito para uma funcionalidade especifica, se precisar que seja genérico, tem que alterar.

            if ($(".modal-msg-confirma").length <= 0) {
                var html = '<div class="modal-msg-confirma"> \
								    <div class="modal-mensagem-conteudo"> \
								        <h3></h3> \
								        <div class="contemfloat"> \
								            <div class="imagem"></div> \
								            <div class="msg"></div> \
								        </div> \
								        <div class="botoes-modal contemfloat">\
									        <a href="/" class="botao-desligamento botao-confirm-cancelar">No</a> \
									        <a href="/" class="botao-acao botao-confirm-confirmar">S&#237;</a> \
									    </div> \
									</div> \
								</div> ';

                $(html).appendTo("form");
            }

            Modal.open(".modal-msg-confirma", "modal-mensagem-confirma", 0);
            $(".modal-mensagem-confirma .modal-mensagem-conteudo H3").html(titulo);
            $(".modal-mensagem-confirma .modal-mensagem-conteudo .msg").html(mensagem);

            $(".modal-mensagem-confirma .botao-confirm-cancelar,.modal-mensagem-confirma .modal-close").on("click", function (e) {
                e.preventDefault();
                Modal.close();
            });



            // Modal.updateSize();
        },
        fecha: function (url) {
            $(this.idModal + " .botao-fechar-mensagem,.modal-close").on("click", function (e) {
                e.preventDefault();
                if (url) {
                    $(this).off("click");
                    self.location = url;
                } else {
                    Modal.close();
                }
            });
        }
    },
    resetSize: function (elem) {
        $(elem).width(0).height(0).css({ "width": "auto", "height": "auto" });
    },
    open: function (elem, cssClass) {

        this.createCustom(elem);

        if ($(elem).length > 0) {
            this.resetSize(elem);
            $(elem).removeAttr("class");
            $(elem).removeAttr("style");
            $(elem).addClass(cssClass);
            $(elem).Attr("style", "position:fixed; z-index: 998; padding:0px; background:#FFF; box-shadow: 2px 2px 1px #444; display:none;");
            //$(this.idModal).append("<div class='conteudo-modal-js'>" + $(elem).html() + "</div>").addClass(cssClass);


            var pos = this.setPosition(elem);
            $(elem).css({ display: 'block' }).animate({ top: pos.top }, 700);
            $("#" + Modal.idBG).css({ display: 'block' }).animate({ opacity: .6 });
            $("body").css("overflow", "hidden");
            $(document).trigger("Modal.open");
        }










    },
    OpenInformative: function (elem, title, Content) {

        this.createCustom(elem);

        if ($(elem).length > 0) {
            this.resetSize(elem);         
            $(elem).removeAttr("style");         
            //$(elem).Attr("style", "position:fixed; z-index: 998; padding:0px; background:#FFF; box-shadow: 2px 2px 1px #444; display:none;");
            $(elem).css({ position: "fixed", "z-index": "998", "padding": "0px", "background": "#FFF", "box-shadow": "2px 2px 1px #444", "display": "none" });
         
            $(elem + " .modal-mensagem-conteudo H3").html(title);
            $(elem + " .modal-mensagem-conteudo .msg").html(Content);

            var pos = this.setPosition(elem);
            //$(elem).css({ display: 'block' }).animate({ top: pos.top }, 700);

            //$("#" + Modal.idBG).css({ display: 'block' }).animate({ opacity: .6 });
            //$("body").css("overflow", "hidden");
            $(elem).css({ top: pos.top });
            $(elem).show().delay(2000).fadeOut();


            $(document).trigger("Modal.OpenInformative");
        }

    },
    openCustom: function (elem) {
        

        //if (Custom == 0 && !this.isCreated())
        //    this.create();
        //else
        //if (Custom == 1)
            this.createCustom(elem);



            if ($(elem).length > 0) {
                this.resetSize(elem);
                //$(elem).removeAttr("class");
                $(elem).removeAttr("style");
                //$(elem).addClass(cssClass);
               // $(elem).Attr("style", "position:fixed; z-index: 998; padding:0px; background:#FFF; box-shadow: 2px 2px 1px #444; display:none;");

                $(elem).css({position:"fixed", "z-index": "998", "padding":"0px", "background":"#FFF", "box-shadow": "2px 2px 1px #444", "display":"none"});

            //$(this.idModal).append("<div class='conteudo-modal-js'>" + $(elem).html() + "</div>").addClass(cssClass);
            

            var pos = this.setPosition(elem);
            $(elem).css({ display: 'block' }).animate({ top: pos.top }, 700);
            $("#" + Modal.idBG).css({ display: 'block' }).animate({ opacity: .6 });
            $("body").css("overflow", "hidden");
            $(document).trigger("Modal.openCustom");
        }



    },
    close: function (elem) {
        $(Modal.source).html(Modal.sourceHTML);
        $("#" + Modal.idBG).fadeOut(300, function () {            
            $(elem).animate({ top: '-2000px' }, 900);
        });
        $("body").css("overflow", "auto");
        $(document).trigger("Modal.close");
    }
}
