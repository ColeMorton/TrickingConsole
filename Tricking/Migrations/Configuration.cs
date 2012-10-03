using Tricking.Data;

namespace Tricking.Migrations
{
    using System.Data.Entity.Migrations;

    internal sealed class Configuration : DbMigrationsConfiguration<TrickingContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = true;
            AutomaticMigrationDataLossAllowed = true;
        }

        protected override void Seed(TrickingContext context)
        {
            SeedTrickers(context);

            SeedTricks(context);

            SeedTrickersTricks(context);
        }

        private static void SeedTrickersTricks(TrickingContext context)
        {
            context.TrickersTricks.AddOrUpdate(t => t.Id,
                new TrickersTrick {Id = 1, TrickerId = 1, TrickId = 1, Profiency = 5});
        }

        private static void SeedTricks(TrickingContext context)
        {
            context.Tricks.AddOrUpdate(t => t.Id,
                new Trick {Id = 1, Name = "BackFlip"});
        }

        private static void SeedTrickers(TrickingContext context)
        {
            context.Trickers.AddOrUpdate(t => t.Id,
                new Tricker {Id = 1, Name = "Vellu"});
        }
    }
}
