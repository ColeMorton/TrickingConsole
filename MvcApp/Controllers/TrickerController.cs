using System.Data;
using System.Linq;
using System.Web.Mvc;
using Tricking.Domain.Data;

namespace Tricking.Mvc.Controllers
{
    public class TrickerController : Controller
    {
        private TrickingContext db = new TrickingContext();

        //
        // GET: /Tricker/

        public ActionResult Index()
        {
            return View(db.Trickers.ToList());
        }

        //
        // GET: /Tricker/Details/5

        public ActionResult Details(int id = 0)
        {
            Tricker tricker = db.Trickers.Find(id);
            if (tricker == null)
            {
                return HttpNotFound();
            }
            return View(tricker);
        }

        //
        // GET: /Tricker/Create

        public ActionResult Create()
        {
            return View();
        }

        //
        // POST: /Tricker/Create

        [HttpPost]
        public ActionResult Create(Tricker tricker)
        {
            if (ModelState.IsValid)
            {
                db.Trickers.Add(tricker);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            return View(tricker);
        }

        //
        // GET: /Tricker/Edit/5

        public ActionResult Edit(int id = 0)
        {
            Tricker tricker = db.Trickers.Find(id);
            if (tricker == null)
            {
                return HttpNotFound();
            }
            return View(tricker);
        }

        //
        // POST: /Tricker/Edit/5

        [HttpPost]
        public ActionResult Edit(Tricker tricker)
        {
            if (ModelState.IsValid)
            {
                db.Entry(tricker).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(tricker);
        }

        //
        // GET: /Tricker/Delete/5

        public ActionResult Delete(int id = 0)
        {
            Tricker tricker = db.Trickers.Find(id);
            if (tricker == null)
            {
                return HttpNotFound();
            }
            return View(tricker);
        }

        //
        // POST: /Tricker/Delete/5

        [HttpPost, ActionName("Delete")]
        public ActionResult DeleteConfirmed(int id)
        {
            Tricker tricker = db.Trickers.Find(id);
            db.Trickers.Remove(tricker);
            db.SaveChanges();
            return RedirectToAction("Index");
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}