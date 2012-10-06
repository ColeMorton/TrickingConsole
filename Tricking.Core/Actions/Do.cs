using System.Linq;
using Tricking.Domain.Data;

namespace Tricking.Core.Actions
{
    public static class Do
    {
        public static bool Trick(int trickerId, int trickId)
        {
            var context = new TrickingContext();
            var proficieny = context.TrickProficiencies.SingleOrDefault(t =>
                t.TrickerId == trickerId && t.TrickId == trickId);

            if (proficieny == null) return false;

            var chance = Dice.Roll();

            return chance * proficieny.Control > 50;
        }
    }
}
