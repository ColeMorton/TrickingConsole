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
                new TrickType { Id = 1, Name = "Flip" });

            context.Tricks.AddOrUpdate(t => t.Id,
                new Trick { Id = 1, TrickTypeId = 1, Name = "BackFlip", Abbrev = "BF" });

            context.Trickers.AddOrUpdate(t => t.Id,
                new Tricker { Id = 1, Name = "Vellu" });
        }   
    }
}
