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
            context.Trickers.AddOrUpdate(t => t.Id,
                new Tricker { Id = 1, Name = "Cole"});

            context.TrickersTricks.AddOrUpdate(t => t.Id,
                new TrickersTrick { Id = 1, TrickerId = 1, Profiency = 5 });
        }
    }
}
