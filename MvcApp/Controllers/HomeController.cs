using System.Web.Mvc;
using MvcApp.Models;
using Tricking.Actions;

namespace MvcApp.Controllers
{
    public class HomeController : Controller
    {
        private readonly Console _console = new Console();

        [HttpGet]
        public ActionResult Index()
        {
            return View(new HomeModel());
        }

        [HttpPost]
        public ActionResult Index(HomeModel model, string action)
        {
            if (model.TrickerId != 0)
            {
                model.SetTrickersTricks();
                _console.WriteLine("You selected: " + model.SelectedTricker.Name);
            }

            if (model.TrickerId != 0 && model.TrickersTrickId != 0)
            {
                _console.WriteLine("You selected: " + model.SelectedTrickersTrick.Trick.Name);
            }

            if (action.ToLower() == "performtrick")
            {
                var result = Do.Trick(model.TrickersTrickId);

                _console.WriteLine(result ? "Success!" : "Fail!");
            }

            model.ConsoleText = _console.Text;
            return View("Index", model);
        }
    }
}
