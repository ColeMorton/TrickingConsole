using System.Data.Entity.Migrations;
using Tricking.Mvc.Infrastructure;

namespace Tricking.Mvc.Migrations
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
            var seeder = new Seed(context);
        }
    }
}
