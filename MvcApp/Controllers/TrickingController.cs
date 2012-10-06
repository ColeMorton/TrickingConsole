using System.Web.Mvc;
using Tricking.Core.Actions;
using Tricking.Mvc.Models;

namespace Tricking.Mvc.Controllers
{
    public class TrickingController : Controller
    {
        private readonly Console _console = new Console();

        public enum Actions
        {
            PerformTrick
        }

        [HttpGet]
        public ActionResult ConsolePage()
        {
            return View(new ConsolePageModel());
        }

        [HttpPost]
        public ActionResult ConsolePage(ConsolePageModel model, string action)
        {
            _console.Clear();

            if (model.TrickerId != 0 &&
                model.TrickId != 0 &&
                action == Actions.PerformTrick.ToString())
            {
                var result = Do.Trick(model.TrickerId, model.TrickId);
                _console.WriteLine(result ? "Success!" : "Fail!");
            }

            model.ConsoleText = _console.Text;
            return View("ConsolePage", model);
        }

        [HttpGet]
        public ActionResult Learn()
        {
            return View();
        }
    }
}