using System.Data;
using System.Linq;
using System.Web.Mvc;
using Tricking.Database;
using Tricking.Domain;

namespace Tricking.Mvc.Controllers
{
    public class TrickController : Controller
    {
        private readonly TrickingContext _db = new TrickingContext();

        //
        // GET: /Trick/

        public ActionResult Index()
        {
            return View(_db.Tricks.ToList());
        }

        //
        // GET: /Trick/Details/5

        public ActionResult Details(int id = 0)
        {
            Trick trick = _db.Tricks.Find(id);
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
                _db.Tricks.Add(trick);
                _db.SaveChanges();
                return RedirectToAction("Index");
            }

            return View(trick);
        }

        //
        // GET: /Trick/Edit/5

        public ActionResult Edit(int id = 0)
        {
            Trick trick = _db.Tricks.Find(id);
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
                _db.Entry(trick).State = EntityState.Modified;
                _db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(trick);
        }

        //
        // GET: /Trick/Delete/5

        public ActionResult Delete(int id = 0)
        {
            Trick trick = _db.Tricks.Find(id);
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
            Trick trick = _db.Tricks.Find(id);
            _db.Tricks.Remove(trick);
            _db.SaveChanges();
            return RedirectToAction("Index");
        }

        protected override void Dispose(bool disposing)
        {
            _db.Dispose();
            base.Dispose(disposing);
        }
    }
}