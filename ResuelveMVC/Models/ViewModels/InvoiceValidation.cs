using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace ResuelveMVC.Models.ViewModels
{
    public class InvoiceValidation
    {
        [Required(ErrorMessage = "El Id del Cliente no puede estar en blanco")]
        [Display(Name = "Id Cliente:")]
        public string Id { get; set; }

        [Required(ErrorMessage = "La Fecha de Inicio no puede estar vacia")]
        [Display(Name = "Fecha Inicio:")]
        public string StartDate { get; set; }

        [Required(ErrorMessage = "La Fecha Final no puede estar vacia")]
        [Display(Name = "Fecha Final:")]
        public string EndDate { get; set; }

        [Display(Name = "Resultado:")]
        public string Result { get; set; }
        
    }
}