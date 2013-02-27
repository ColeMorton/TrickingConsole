using System.Data.Entity.Migrations;

namespace Tricking.Database.Migrations
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
