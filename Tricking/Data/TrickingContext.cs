using System.Data.Entity;

namespace Tricking.Data
{
    public class TrickingContext : DbContext
    {
        public DbSet<Tricker> Trickers { get; set; }
        public DbSet<TrickersTrick> TrickersTricks { get; set; }
    }
}
