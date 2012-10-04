using System.Web.Mvc;
using MvcApp.Models;

namespace MvcApp.Controllers
{
    public class HomeController : Controller
    {
        [HttpGet]
        public ActionResult Index()
        {
            return View(new HomeModel());
        }

        [HttpPost]
        public ActionResult Tricker(HomeModel model)
        {
            model.SetTrickersTricks();
            model.ConsoleText = Console.WriteLine(model.ConsoleText, "You selected: " + model.SelectedTricker.Name);
            return View("Index", model);
        }

        [HttpPost]
        public ActionResult TrickersTrick(HomeModel model)
        {
            model.ConsoleText = Console.WriteLine(model.ConsoleText, "You selected: " + model.SelectedTrickersTrick.Trick.Name);
            return View("Index", model);
        }
    }
}
