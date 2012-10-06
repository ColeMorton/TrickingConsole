using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Globalization;
using System.Linq;
using System.Web.Mvc;
using Tricking.Domain.Data;

namespace Tricking.Mvc.Models
{
    public class ConsolePageModel
    {
        public ConsolePageModel()
        {
            Trickers = new List<SelectListItem>();
            TrickersTricks = new List<SelectListItem>();

            SetTrickers();
        }

        public string ConsoleText { get; set; }

        [Display(Name = "Tricker")]
        public int TrickerId { get; set; }

        [Display(Name = "Trick")]
        public int TrickersTrickId { get; set; }

        public List<SelectListItem> Trickers { get; set; }

        public List<SelectListItem> TrickersTricks { get; set; }

        public string TrickerName
        {
            get 
            { 
                return TrickerId != 0 ? 
                    Trickers.First(t => t.Value == TrickerId.ToString()).Text : string.Empty; 
            }
        }

        public string TrickName
        {
            get
            {
                return TrickersTrickId != 0 ?
                    TrickersTricks.First(t => t.Value == TrickersTrickId.ToString()).Text : string.Empty;
            }
        }

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
            //if (TrickerId == 0) return;

            //var context = new TrickingContext();
            //var trickersTricks = context.Proficiencies
            //        .Include("Trick").Where(t => t.TrickerId == TrickerId);

            //foreach (var trickersTrick in trickersTricks)
            //{
            //    TrickersTricks.Add(new SelectListItem
            //    {
            //        Text = trickersTrick.Trick.Name,
            //        Value = trickersTrick.Id.ToString(CultureInfo.InvariantCulture)
            //    });
            //}
        }
    }
}