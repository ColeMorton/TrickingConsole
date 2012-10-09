using System.Web.Mvc;
using Tricking.Mvc.Helpers;
using Tricking.Mvc.Models;

namespace Tricking.Mvc.Controllers
{
    public class TrickingController : Controller
    {
        private readonly Console _console = new Console();

        public enum Actions
        {
            PerformTrick,
            LearnTrick
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
            return View(new ConsolePageModel());
        }

        [HttpPost]
        public ActionResult Learn(ConsolePageModel model, string action)
        {
            if (string.IsNullOrEmpty(model.Slider)) return View("Learn", model);

            var power = int.Parse(model.Slider);

            if (model.TrickId != 0 && action == Actions.LearnTrick.ToString())
                model.Success = Do.LearnTrick(model.TrickId, power);

            return View("Learn", model);
        }
    }
}