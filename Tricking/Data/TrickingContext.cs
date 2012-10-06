using System.Data.Entity;

namespace Tricking.Domain.Data
{
    public class TrickingContext : DbContext
    {
        public TrickingContext()
            : base(@"
                Data Source=(localdb)\v11.0;
                Initial Catalog=Tricking.Data.TrickingContext;
                Integrated Security=True")
        {
        }

        public DbSet<Tricker> Trickers { get; set; }
        public DbSet<Trick> Tricks { get; set; }
        public DbSet<TrickersTrick> TrickersTricks { get; set; }
    }
}
