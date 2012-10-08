using System.Data;
using System.Linq;
using System.Web.Mvc;
using Tricking.Domain;
using Tricking.Mvc.Infrastructure;

namespace Tricking.Mvc.Controllers
{
    public class TrickController : Controller
    {
        private TrickingContext db = new TrickingContext();

        //
        // GET: /Trick/

        public ActionResult Index()
        {
            return View(db.Tricks.ToList());
        }

        //
        // GET: /Trick/Details/5

        public ActionResult Details(int id = 0)
        {
            Trick trick = db.Tricks.Find(id);
            if (trick == null)
            {
                return HttpNotFound();
            }
            return View(trick);
        }

        //
        // GET: /Trick/Create

        public ActionResult Create()
        {
            return View();
        }

        //
        // POST: /Trick/Create

        [HttpPost]
        public ActionResult Create(Trick trick)
        {
            if (ModelState.IsValid)
            {
                db.Tricks.Add(trick);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            return View(trick);
        }

        //
        // GET: /Trick/Edit/5

        public ActionResult Edit(int id = 0)
        {
            Trick trick = db.Tricks.Find(id);
            if (trick == null)
            {
                return HttpNotFound();
            }
            return View(trick);
        }

        //
        // POST: /Trick/Edit/5

        [HttpPost]
        public ActionResult Edit(Trick trick)
        {
            if (ModelState.IsValid)
            {
                db.Entry(trick).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(trick);
        }

        //
        // GET: /Trick/Delete/5

        public ActionResult Delete(int id = 0)
        {
            Trick trick = db.Tricks.Find(id);
            if (trick == null)
            {
                return HttpNotFound();
            }
            return View(trick);
        }

        //
        // POST: /Trick/Delete/5

        [HttpPost, ActionName("Delete")]
        public ActionResult DeleteConfirmed(int id)
        {
            Trick trick = db.Tricks.Find(id);
            db.Tricks.Remove(trick);
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