using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Web.Mvc;
using Tricking.Data;

namespace MvcApp.Models
{
    public class HomeModel
    {
        public HomeModel()
        {
            ConsoleText = Console.Heading();
            Trickers = new List<SelectListItem>();
            TrickersTricks = new List<SelectListItem>();

            SetTrickers();
        }

        public string ConsoleText { get; set; }

        public int TrickerId { get; set; }

        public int TrickersTrickId { get; set; }

        public Tricker SelectedTricker
        {
            get 
            { 
                return new TrickingContext().Trickers.First(t => t.Id == TrickerId);
            }
        }

        public TrickersTrick SelectedTrickersTrick
        {
            get
            {
                return new TrickingContext().TrickersTricks.First(t => t.Id == TrickersTrickId);
            }
        }

        public List<SelectListItem> Trickers { get; set; }

        public List<SelectListItem> TrickersTricks { get; set; }

        private void SetTrickers()
        {
            var context = new TrickingContext();
            var trickers = context.Trickers.ToList();

            foreach (var tricker in trickers)
            {
                Trickers.Add(new SelectListItem
                {
                    Text = tricker.Name,
                    Value = tricker.Id.ToString(CultureInfo.InvariantCulture)
                });
            }
        }

        public void SetTrickersTricks()
        {
            if (TrickerId == 0) return;

            var context = new TrickingContext();
            var trickersTricks = context.TrickersTricks
                    .Include("Trick").Where(t => t.TrickerId == TrickerId);

            foreach (var trickersTrick in trickersTricks)
            {
                TrickersTricks.Add(new SelectListItem
                {
                    Text = trickersTrick.Trick.Name,
                    Value = trickersTrick.Id.ToString(CultureInfo.InvariantCulture)
                });
            }
        }
    }
}