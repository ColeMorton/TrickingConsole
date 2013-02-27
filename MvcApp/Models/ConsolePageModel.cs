using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web.Mvc;
using Tricking.Database;

namespace Tricking.Mvc.Models
{
    public class ConsolePageModel
    {
        public ConsolePageModel()
        {
            var context = new TrickingContext();

            Trickers = new List<SelectListItem>();
            Trickers.AddRange(context.Trickers.ToList().Select(t => 
                new SelectListItem { Value = t.Id.ToString(), Text = t.Name }));

            Tricks = new List<SelectListItem>();
            Tricks.AddRange(context.Tricks.ToList().Select(t => 
                new SelectListItem { Value = t.Id.ToString(), Text = t.Name }));
        }

        public string ConsoleText { get; set; }

        [Display(Name = "Tricker")]
        public int TrickerId { get; set; }

        [Display(Name = "Trick")]
        public int TrickId { get; set; }

        public List<SelectListItem> Trickers { get; set; }

        public List<SelectListItem> Tricks { get; set; }

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
                return TrickId != 0 ?
                    Tricks.First(t => t.Value == TrickId.ToString()).Text : string.Empty;
            }
        }

        public bool? Success { get; set; }

        [Display(Name = "Power")]
        public string Slider { get; set; }
    }
}