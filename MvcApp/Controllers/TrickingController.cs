using System.Web.Mvc;
using Tricking.Core.Actions;
using Tricking.Mvc.Models;

namespace Tricking.Mvc.Controllers
{
    public class TrickingController : ShellController
    {
        private readonly Console _console = new Console();

        private ConsolePageModel ConsolePageModel
        {
            get { return Get<ConsolePageModel>("ConsolePageModel"); }
            set { Set<ConsolePageModel>("ConsolePageModel", value); }
        }

        public enum Actions
        {
            PerformTrick
        }

        [HttpGet]
        public ActionResult ConsolePage()
        {
            return View(ConsolePageModel);
        }

        [HttpPost]
        public ActionResult ConsolePage(ConsolePageModel model, string action)
        {
            _console.Clear();

            if (model.TrickerId != 0)
            {
                model.SetTrickersTricks();
                _console.WriteLine("You selected: " + model.TrickerName);
            }

            if (model.TrickerId != 0 && model.TrickersTrickId != 0)
            {
                _console.WriteLine("You selected: " + model.TrickName);
            }

            if (action == Actions.PerformTrick.ToString())
            {
                var result = Do.Trick(model.TrickersTrickId);

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