using System.Data.Entity.Migrations;
using Tricking.Domain;
using Tricking.Mvc.Infrastructure;

namespace Tricking.Mvc.Migrations
{
    class Seed
    {
        public Seed(TrickingContext context)
        {
            context.TrickTypes.AddOrUpdate(t => t.Id,
                new TrickType { Id = 1, Name = "Flip" },
                new TrickType { Id = 2, Name = "Twist" },
                new TrickType { Id = 3, Name = "Kick" });

            context.Tricks.AddOrUpdate(t => t.Id,
                new Trick { Id = 1, TrickTypeId = 1, Name = "BackFlip", Abbrev = "BF" }, 
                new Trick { Id = 2, TrickTypeId = 1, Name = "Cork", Abbrev = "CR" },
                new Trick { Id = 3, TrickTypeId = 1, Name = "Aerial", Abbrev = "AR" }, 
                new Trick { Id = 4, TrickTypeId = 2, Name = "BTwist", Abbrev = "BT" },
                new Trick { Id = 5, TrickTypeId = 2, Name = "ATwist", Abbrev = "AT" },
                new Trick { Id = 6, TrickTypeId = 2, Name = "PopFull", Abbrev = "PF" },
                new Trick { Id = 7, TrickTypeId = 3, Name = "Pop360", Abbrev = "P3" },
                new Trick { Id = 8, TrickTypeId = 3, Name = "Chat720", Abbrev = "C7" }, 
                new Trick { Id = 9, TrickTypeId = 3, Name = "Tornado", Abbrev = "TD" });

            context.Trickers.AddOrUpdate(t => t.Id,
                new Tricker { Id = 1, Name = "Vellu" },
                new Tricker { Id = 2, Name = "Guthrie" },
                new Tricker { Id = 3, Name = "Danny" });
        }   
    }
}
