using System.Linq;
using Tricking.Domain.Data;

namespace Tricking.Core.Actions
{
    public static class Do
    {
        public static bool Trick(int trickersTrickId)
        {
            var context = new TrickingContext();
            var trick = context.TrickersTricks.SingleOrDefault(t => t.Id == trickersTrickId);
            if (trick == null) return false;

            var chance = Dice.Roll();

            return chance * trick.Profiency > 50;
        } 
    }
}
