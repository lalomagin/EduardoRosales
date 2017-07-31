using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web.Mvc;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using ResuelveMVC;
using ResuelveMVC.Controllers;
using ResuelveMVC.Models;

namespace ResuelveMVC.Tests.Controllers
{
    

    [TestClass]
    public class HomeControllerTest
    {
        private HomeController controller;

        /// <summary>
        /// Inicializa mi variable HomeController
        /// </summary>
        [TestInitialize]
        public void InitializeMembers()
        {
            controller = new HomeController();
            controller.Errores = new List<string>();
        }

        /// <summary>
        /// Revida la llamada de Index
        /// </summary>
        [TestMethod]
        public void Index()
        {
            // Act
            ViewResult result = controller.Index() as ViewResult;

            // Assert
            Assert.IsNotNull(result);
        }

        /// <summary>
        /// Revisa si hay un campo vacio al llamar el web Service
        /// </summary>
        [TestMethod]
        public void CheckIfIsThereAnEmptyField__CallWS_GetInvoices()
        {
            //Arrange
            string Id = "717f076e-e13c-45b4-bcc4-51c229e1b326";
            string StartDate = "2017-01-01";
            string EndDate = "";    //Campo faltante
            int SumInvoices = 0;

            //Act
            string resultado = controller.CallWS_GetInvoices(Id, StartDate, EndDate, ref SumInvoices);
          
            //Assert
            Assert.IsTrue(resultado.Equals("-1"));
            Assert.IsTrue(controller.Errores.Any());
        }

        /// <summary>
        /// Revisa si hay un argumento invalido en la llamada al Web Service
        /// </summary>
        [TestMethod]
        public void CheckIfIsThereAnInvalidArgument__CallWS_GetInvoices()
        {
            //Arrange
            string Id = "717f076e-e13c-45b4-bcc4-51c229e1b326";
            string StartDate = "2017-01-01";
            string EndDate = "2017-03-99";  //Campo Invalido
            int SumInvoices = 0;

            //Act
            string resultado = controller.CallWS_GetInvoices(Id, StartDate, EndDate, ref SumInvoices);

            //Assert
            Assert.IsTrue(resultado.Equals("-1"));
            Assert.IsTrue(controller.Errores.Any());
        }

        /// <summary>
        /// Revisa todos los posibles errores al solicitar el numero de facturas en un periodo de tiempo
        /// </summary>
        [TestMethod]
        public void CheckGetAValidNumberOfInvoices__GetInvoicesNumber()
        {
            //Arrange
            string Id = "111111111111111111111111111111111111111111111111111";  //Invalid Customer
            DateTime StartDate = new DateTime(2017, 1, 1);
            DateTime EndDate = new DateTime(2017, 12, 31);
            int SumInvoices = 0;

            //Act
            int resultado = controller.GetInvoicesNumber(Id, StartDate, EndDate, ref SumInvoices);

            //Assert
            Assert.IsTrue(resultado==-1);
            Assert.IsTrue(controller.Errores.Any());
        }
        
    }


    [TestClass]
    public class DateTimeExtensionsTest
    {

        [TestInitialize]
        public void InitializeMembers()
        {
        }

        
        /// <summary>
        /// Valida que se pueda dividir correctamente un periodo de tiempo en dos
        /// </summary>
        [TestMethod]
        public void CheckIfIsThereAnErrorToCreatePeriods__GetNodeParts()
        {
            //Arrange
            DateTime dtStart = new DateTime(2017, 4, 12);
            DateTime dtEnd = new DateTime(2017, 8, 12);
            
            //Act
            Node_Invoice resultado = dtStart.GetNodeParts(dtEnd);

            //Assert
            Assert.IsFalse(resultado==null);
        }
    }
    }
