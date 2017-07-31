using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ResuelveMVC.Models
{
    public static partial class DateTimeExtensions
    {

        /// <summary>
        /// Formate una fecha a "yyyy/MM/dd"
        /// </summary>
        /// <param name="dt">Fecha a formatear</param>
        /// <returns>Fecha formateada</returns>
        public static string FormatWS(this DateTime dt)
        {
            return dt.ToString("yyyy/MM/dd");
        }

        /// <summary>
        /// Obtiene numero de dias entre fechas opcionalmente contando el ultimo dia
        /// </summary>
        /// <param name="dt">Fecha Inicial</param>
        /// <param name="dt2">Fecha Final</param>
        /// <returns>No. de dias entre las fechas</returns>
        public static int DaysBetween(this DateTime dt, DateTime dt2)
        {
            return (dt2.Date - dt.Date).Duration().Days + 1;
        }

        /// <summary>
        /// Divide un periodo de tiempo a dos
        /// </summary>
        /// <param name="dt">Fecha Inicial del Periodo</param>
        /// <param name="dt2">Fecha Final del Periodo</param>
        /// <returns>Objeto Node_Invoice que contiene dos conguntos de fechas, correspondiente a los dos periodos</returns>
        public static Node_Invoice GetNodeParts(this DateTime dt, DateTime dt2)
        {

            try
            {
                Node_Invoice noi = new Node_Invoice();
                noi.DTFirstStart = dt;                  //Establece fecha inicial para el primer periodo
                noi.DTSecondEnd = dt2;                  //Establece fecha final para el segundo periodo

                double dbet = (double)dt.DaysBetween(dt2);
          
                if (dbet % 2 != 0)                      //Si no es divisible entre dos el numero de dias se le suma uno para que sea posible hacer la division
                    dbet++;

                dbet = (dbet / 2);
                noi.DTFirstEnd = dt.AddDays(dbet - 1);  //Establece fecha final para el primer periodo
                noi.DTSecondStart = dt.AddDays(dbet);   //Establece fecha inicial para el segundo periodo
                return noi;
            }
            catch (Exception e)
            {
                return null;
            }           
        }
        
    }

    /// <summary>
    /// Objeto que corresponde a dos periodos de fechas consecutivos
    /// </summary>
    public class Node_Invoice
    {
        /// <summary>
        /// Fecha inicial para el primer periodo
        /// </summary>
        public DateTime DTFirstStart { get; set; }
        /// <summary>
        /// Fecha final para el primer periodo
        /// </summary>
        public DateTime DTFirstEnd { get; set; }
        /// <summary>
        /// Fecha inicial para el segundo periodo
        /// </summary>
        public DateTime DTSecondStart { get; set; }
        /// <summary>
        /// Fecha final para el segundo periodo
        /// </summary>
        public DateTime DTSecondEnd { get; set; }
    }
}