using System.Web;
using System.Web.Optimization;

namespace ResuelveMVC
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {


            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js",
                        "~/Scripts/jquery-ui-1.12.1.custom/jquery-ui.min.js",
                        "~/Scripts/jquery.unobtrusive-ajax.min.js"));



            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));

            
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js",
                      "~/Scripts/respond.js",
                      "~/Scripts/jquery.validate.js",
                      "~/Scripts/jquery.validate.unobtrusive.js"
                      ));


            
            

            bundles.Add(new ScriptBundle("~/CalendarJS").Include(
                      "~/Scripts/moment-with-locales.min.js",
                      "~/Scripts/moment.js",
                      "~/Scripts/datetimepicker-init.js",
                      "~/Scripts/bootstrap-datetimepicker.js"));



            //ya
            bundles.Add(new ScriptBundle("~/FullCalendar").Include(
          "~/Scripts/fullcalendar.min.js",
          "~/Scripts/locale-all.js"));

        

            /////////////////////////////////////////////COMIENZAN LOS ESTILOS/////////////////////////////////////////

            bundles.Add(new StyleBundle("~/ContentCss").Include(
                     "~/Content/bootstrap.min.css",
                     "~/Scripts/jquery-confirm/demo/libs/bundled.css",  // Este es la version de bootstrap mas nueva
                     "~/Content/bootstrap-theme.min.css",
                     "~/Content/Site.css"
                     ));
            
            

            bundles.Add(new StyleBundle("~/CalendarCSS").Include(
                      "~/Content/css/bootstrap-datetimepicker.min.css",
                      "~/Content/css/datePicker.css"));

            


        }
    }
}
