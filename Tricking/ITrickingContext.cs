using System.Linq;

namespace Tricking.Domain
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
}