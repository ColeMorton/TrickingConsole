using System.Data.Entity;
using System.Linq;
using Tricking.Domain;

namespace Tricking.Database
{
    public interface ITrickingContext
    {
        IQueryable<Tricker> Trickers { get; set; }
        IQueryable<Trick> Tricks { get; set; }
        IQueryable<TrickProficiency> TrickProficiencies { get; set; }
        IQueryable<TrickTypeProficiency> TrickTypeProficiencies { get; set; }
        IQueryable<TrickType> TrickTypes { get; set; }

        void Save();
    }

    public class TrickingContext : DbContext, ITrickingContext
    {

#if DEBUG
        public TrickingContext()
            : base(@"
                Data Source=.\SQLEXPRESS;
                Initial Catalog=Tricking.Database.TrickingContext;
                Integrated Security=True")
        {
        }

#else
        public TrickingContext() : base(@"
                Server=tcp:w2fnnncb71.database.windows.net,1433;
                Database=Tricking_db;
                User ID=cole.morton@hotmail.com@w2fnnncb71;Password=Smithwestport01;
                Trusted_Connection=False;Encrypt=True;Connection Timeout=30;")
        {
        }
#endif

        void ITrickingContext.Save()
        {
            SaveChanges();
        }

        public DbSet<Tricker> Trickers { get; set; }
        public DbSet<Trick> Tricks { get; set; }
        public DbSet<TrickProficiency> TrickProficiencies { get; set; }
        public DbSet<TrickTypeProficiency> TrickTypeProficiencies { get; set; }
        public DbSet<TrickType> TrickTypes { get; set; }

        IQueryable<Tricker> ITrickingContext.Trickers { get; set; }
        IQueryable<Trick> ITrickingContext.Tricks { get; set; }
        IQueryable<TrickProficiency> ITrickingContext.TrickProficiencies { get; set; }
        IQueryable<TrickTypeProficiency> ITrickingContext.TrickTypeProficiencies { get; set; }
        IQueryable<TrickType> ITrickingContext.TrickTypes { get; set; }
    }
}
