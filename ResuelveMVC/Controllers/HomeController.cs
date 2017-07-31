using ResuelveMVC.Models;
using ResuelveMVC.Models.ViewModels;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Globalization;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;

namespace ResuelveMVC.Controllers
{
    /// <summary>
    /// Controller Responsable de la revision del no de facturas en un periodo de tiempo
    /// </summary>
    public class HomeController : Controller
    {
        /// <summary>
        /// Lista de Errores registrados para las Unit Tests
        /// </summary>
        public List<string> Errores { get; set; }

        /// <summary>
        /// Pagina de Inicio que se empleara para recoleccion de no. de facturas en un periodo de tiempo establecido
        /// </summary>
        /// <returns>Un modelo con opciones por default a plasmar en el formulario</returns>
        public ActionResult Index()
        {
            InvoiceValidation objInvVal = new InvoiceValidation();
            objInvVal.Id = "717f076e-e13c-45b4-bcc4-51c229e1b326";
            objInvVal.StartDate = "2017-01-01";
            objInvVal.EndDate = "2017-03-30";


            return View(objInvVal);
        }


        /// <summary>
        /// Se hace la peticion al server para obtener el total de facturas por periodo y cliente seleccionado
        /// </summary>
        /// <param name="model">El modelo que contiene el id del cliente y las fechas de las cuales se pretenden obtener las facturas</param>
        /// <returns>Regresa el mismo modelo recibido con la variable Result alterada, que contendra el resultado de nuestra peticion</returns>
        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public ActionResult GetInvoicesNo(InvoiceValidation model)
        {
            CultureInfo provider = CultureInfo.InvariantCulture;
            DateTime dtStart = DateTime.ParseExact(model.StartDate, "yyyy/MM/dd", provider);
            DateTime dtEnd = DateTime.ParseExact(model.EndDate, "yyyy/MM/dd", provider);
            
            //Se hace una validacion mas, que corresponde a que no pueda ser mayor la fecha inicial a la final
            if (dtStart > dtEnd)
            {
                ModelState.AddModelError("", "La fecha de Inicio no puede ser mayor a la final");
                return View("Index", model);
            }
            else            
                if (ModelState.IsValid)     // Es valido todos los campos del formulario
                {
                    int SumInvoices = 0;
                    int TotalInvoices= GetInvoicesNumber(model.Id, dtStart, dtEnd, ref SumInvoices); //Iniciamos el proceso de recoleccion de numero de facturas
                    if (TotalInvoices < 0)
                        model.Result = "Ocurrio un error inesperado o es posible que dentro del rango de fechas exista un dia con mas de 100 facturas registradas.";
                    else
                        model.Result = "Por este periodo hay un numero total de "+TotalInvoices+" facturas registradas y se registraron "+SumInvoices+" llamadas al WebService.";
                }
            

            return View("Index", model);
        }

        /// <summary>
        /// Metodo Recursivo que trabaja a modo de arbol para la solucion de la obtencion del no. de facturas en un periodo de tiempo
        /// </summary>
        /// <param name="Id">Identificador del Cliente</param>
        /// <param name="StartDate">Fecha de Inicio para obtencion de facturas</param>
        /// <param name="EndDate">Fecha Final para obtencion de Facturas</param>
        /// <param name="SumInvoices">Un contador que permite recolectar el numero de llamadas al WebService</param>
        /// <returns>Numero de facturas registradas para el periodo de tiempo, si devuelve -1 hubo un fallo</returns>
        public int GetInvoicesNumber(string Id, DateTime StartDate, DateTime EndDate, ref int SumInvoices)
        {
            //Llama al WebService para obtencion de no de facturas
            string ResultInv= CallWS_GetInvoices(Id, StartDate.FormatWS(), EndDate.FormatWS(), ref SumInvoices);

            /* Condicional que refiere a si hubo un error en la llamada 
             * o bien si devolvio vacio, devolvera cual 
             * quiera que sea el caso un valor -1 que representa error */
            if (ResultInv == "-1" || string.IsNullOrEmpty(ResultInv))
            {
                Errores.Add("Hubo un error en la llamada al Web Service");
                return -1;
            }
            else
            {
                int NumInv = 0;

                if (int.TryParse(ResultInv, out NumInv))    // Revisa si puede hacer el cast a entero lo cual significa que pudo obtener el no. de facturas                    
                    return NumInv;
                else
                if (StartDate == EndDate)                                       // Este caso es excepcional corresponde a si hubiese encontrado en un solo dia mas de 100 facturas
                {
                    Errores.Add("Existen mas de 100 facturas en un solo dia");  // por lo cual genera un error, ejemplo que el 12 de Julio del 2017 haya mas de 100 facturas
                    return -1;                              
                }
                else
                {
                    Node_Invoice noi = StartDate.GetNodeParts(EndDate);                                     //Divide una periodo en dos, lo que permite mi recursividad tipo arbol
                    int FPart = GetInvoicesNumber(Id, noi.DTFirstStart, noi.DTFirstEnd, ref SumInvoices);   //Obtiene para el primer periodo de la division el no. de facturas
                    int SPart = GetInvoicesNumber(Id, noi.DTSecondStart, noi.DTSecondEnd, ref SumInvoices); //Obtiene para el segundo periodo de la division el no. de facturas
                    if (FPart == -1 || SPart == -1)         // Si alguno de los procesos para la recoleccion de no de facturas por periodo genero un error, devuelve el mismo error
                        return -1;
                    else
                        return FPart + SPart;               // El acumulado del no de facturas
                }
            }
            
        }

        /// <summary>
        /// Metodo que se encarga de hacer la llamada al Web Service para recoleccion de no de facturas
        /// </summary>
        /// <param name="Id">Identificador del cliente</param>
        /// <param name="StartDate">Fecha de Inicio para obtencion de no facturas</param>
        /// <param name="EndDate">Fecha final para obtencion de no facturas</param>
        /// <param name="SumInvoices">Contador de llamadas al WebService</param>
        /// <returns>El resultado de la llamada al Web Service</returns>
        public string CallWS_GetInvoices(string Id, string StartDate, string EndDate, ref int SumInvoices)
        {                
            try
            {
                string BaseUrl = ConfigurationManager.AppSettings["UrlWebService"].ToString();     // Url del WebService a invocar
                JavaScriptSerializer json_Serializer = new JavaScriptSerializer();                 // Objecto para uso de la deserializacion del contenido de la respuesta del WebService

                if (string.IsNullOrEmpty(BaseUrl) || string.IsNullOrEmpty(Id) || string.IsNullOrEmpty(StartDate) || string.IsNullOrEmpty(EndDate))
                {
                    Errores.Add("Alguno de los campos requeridos para el WebService esta vacio");
                    return "-1";
                }

                SumInvoices++;                                          //Contador de llamadas aumenta en uno
                var syncClient = new WebClient();

                // Se agregan los parametros requeridos en el WebService
                syncClient.QueryString.Add("id", Id);
                syncClient.QueryString.Add("start", StartDate);
                syncClient.QueryString.Add("finish", EndDate);
                
                var content = syncClient.DownloadString(BaseUrl);        //Se hace la llamada al Web Service
                if (content.Contains("Argumentos"))                       //Revisa si tiene argumentos invalidos
                {
                    Errores.Add("Al llamar al Web Service se registraron Argumentos Invalidos");
                    return "-1";
                }

                return json_Serializer.Deserialize<string>(content);     //Se deserializa el contenido
            }
            catch(Exception e)
            {
                Errores.Add(e.Message);
                return "-1";
            }
        }

        

    }
}