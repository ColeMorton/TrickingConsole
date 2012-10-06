using Tricking.Domain.Data;
using System.Data.Entity.Migrations;

namespace Tricking.Domain.Migrations
{
    internal sealed class Configuration : DbMigrationsConfiguration<TrickingContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = true;
            AutomaticMigrationDataLossAllowed = false;
        }

        protected override void Seed(TrickingContext context)
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
